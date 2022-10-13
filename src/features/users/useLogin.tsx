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
  const doc = db.collection<User>('demo/social/users').doc(account)
  const user = await doc.get().catch(() => null)
  console.log(user)
  if (!user) {
    // Generate private key
    const wallet = Wallet.generate()
    const publicKey = wallet.getPublicKey()
    const privateKeyBuff = wallet.getPrivateKey()
    const privateKey = privateKeyBuff.toString('hex')
    const encryptedPrivateKey = await eth.encrypt(privateKey, account)

    await doc.set({
      pvkey: encryptedPrivateKey,
    }, [`0x${publicKey.toString('hex')}`])

    return wallet
  } else {
    console.log(user.data.pvkey)
    const privateKey = await eth.decrypt(user.data.pvkey, account)
    return Wallet.fromPrivateKey(Buffer.from(privateKey, 'hex'))
  }
}