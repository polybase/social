import * as eth from '@polybase/eth'
import Wallet from 'ethereumjs-wallet'
import { usePolybase } from '@polybase/react'
import { Polybase } from '@polybase/client'
import { ethPersonalSign } from '@polybase/eth'
import { useAuth } from './useAuth'
import { User } from 'features/types'

export function useLogin () {
  const { login } = useAuth()
  const db = usePolybase()

  return async () => {
    const accounts = await eth.requestAccounts()
    const account = accounts[0]
    const wallet = await getWallet(account, db)

    // Login
    login(account, wallet)

    // Update the signer
    db.signer(async (data: string) => {
      return {  h: 'eth-personal-sign', sig: ethPersonalSign(wallet.getPrivateKey(), data) }
    })
  }
}

async function getWallet (account: string, db: Polybase) {
  // Lookup account
  const col = db.collection<User>('demo/social/users')
  const doc = col.record(account)
  const user = await doc.get().catch(() => null)
  const ethEncryptPublicKey = await eth.getEncryptionKey(account)
  if (!user) {
    // Generate private key
    const wallet = Wallet.generate()
    // const publicKey = wallet.getPublicKey()
    const privateKeyBuff = wallet.getPrivateKey()
    const privateKey = privateKeyBuff.toString('hex')
    const encryptedPrivateKey = await eth.encrypt(privateKey, account)

    db.signer(async (data: string) => {
      return {  h: 'eth-personal-sign', sig: ethPersonalSign(wallet.getPrivateKey(), data) }
    })

    await col.create([account, encryptedPrivateKey]).catch((e) => {
      console.error(e)
      throw e
    })

    return wallet
  } else {
    const privateKey = await eth.decrypt(user.data.pvkey, account)
    return Wallet.fromPrivateKey(Buffer.from(privateKey, 'hex'))
  }
}