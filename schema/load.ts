import { Polybase } from '@polybase/client'
import Wallet from 'ethereumjs-wallet'
import { ethPersonalSign } from '@polybase/eth'

// PK, need to establish a PK so we can control updates

const schema = `
@public
collection users {
  id: string; 
  name?: string;
  desc?: string;
  icon?: string;
  pvkey: string;
  $pk: string;

  constructor (id: string, pvkey: string) {
    this.id = id;
    this.$pk = ctx.publicKey;
    this.pvkey = pvkey;
  }

  setProfile(name?: string, desc?: string) {
    if (this.$pk != ctx.publicKey) {
      throw error ('invalid owner');
    }
    if (this.name) {
      this.name = name;
    }
    if (this.desc) {
      this.desc = desc;
    }
  }
}

@public
collection followers {
  id: string;
  follower: string;
  followee: string;
  email?: string;
  $pk: string;

  constructor (follower: string, followee: string) {
    this.id = follower + '/' + followee;
    this.follower = follower;
    this.followee = followee;
    this.$pk = ctx.publicKey;
  }
}

@public
collection messages {
  id: string;
  message: string;
  timestamp: string;
  account: string;
  $pk: string;

  @index(account, [timestamp, desc]);

  constructor (id: string, account: string, message: string, timestamp: string) {
    this.id = id;
    this.$pk = ctx.publicKey;
    this.account = account;
    this.message = message;
    this.timestamp = timestamp;
  }
}
`

const PRIVATE_KEY = process.env.PRIVATE_KEY ?? ''

async function load() {
  const db = new Polybase({
    baseURL: `${process.env.REACT_APP_API_URL}/v0`,
    signer: async (data) => {
      const wallet = Wallet.fromPrivateKey(Buffer.from(PRIVATE_KEY, 'hex'))
      return { h: 'eth-personal-sign', sig: ethPersonalSign(wallet.getPrivateKey(), data) }
    },
  })

  if (!PRIVATE_KEY) {
    throw new Error('No private key provided')
  }

  await db.applySchema(schema, 'demo/social')

  return 'Schema loaded'
}

load()
  .then(console.log)
  .catch(console.error)
