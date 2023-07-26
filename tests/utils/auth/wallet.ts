import { BrowserContext } from '@playwright/test'
import { secp256k1, encodeToString, decodeFromString } from '@polybase/util'
import { ethPersonalSign } from '@polybase/eth'
import { AuthState } from '@polybase/auth/src/Auth'
import { Polybase, Signer } from '@polybase/client'

export interface Auth {
    authState: AuthState
    signer: Signer
    client: Polybase
    privateKey: Uint8Array
  }

export interface WindowEthereumRequest {
  method: 'personal_sign',
  params: string[],
}

export interface WalletLogin {
  context: BrowserContext
}

export async function walletLogin(context: BrowserContext): Promise<Auth> {
  const privateKey = secp256k1.generatePrivateKey()
  const publicKey = encodeToString(secp256k1.getPublicKey(privateKey).slice(1), 'hex')
  const id = encodeToString(secp256k1.getPublicCompressed(privateKey), 'hex')
  console.log(privateKey, id)

  await context.addInitScript(() => {
    (window as any).ethereum = {
      enable: () => Promise.resolve(),
      request: async ({ params }: WindowEthereumRequest) => {
        return ethPersonalSign(privateKey, decodeFromString(params[0], 'utf8'))
      },
      selectedAddress: id,
    }
  })

  const authState: AuthState = {
    type: 'metamask',
    userId: id,
    publicKey,
  }

  const signer: Signer = async (data: string) => {
    return {
      h: 'eth-personal-sign',
      sig: ethPersonalSign(privateKey, decodeFromString(data, 'utf8')),
    }
  }

  // const db = new Polybase({
  //   baseURL: 'http://127.0.0.1:8080/v0',
  //   signer,
  // })
  // const col = db.collection<User>('demo/social/users')
  // await col.create([id, privateKey]).catch((e) => {
  //   console.error(e)
  //   throw e
  // })

  return {
    authState,
    signer,
    client: new Polybase({
      baseURL: 'http://127.0.0.1:8080/v0',
      signer,
    }),
    privateKey,
  }
}

export async function createUser(auth: Auth) {
  return auth.client.collection('demo/social/users').create([auth.authState.userId!, auth.privateKey])
}