import { Spacetime } from '@spacetimexyz/client/node'

// PK, need to establish a PK so we can control updates

const schema = `
collection users {
  id: string!;
  name: string;
  desc: string;
  icon: string;
  pvkey: string;
  $pk: string;
}

collection followers {
  id: string!;
  follower: string;
  followee: string;
  email: string;
  $pk: string;
}

collection messages {
  id: string!;
  message: string;
  timestamp: string;
  account: string;
  $pk: string;

  @index(account, [timestamp, desc]);
}
`

async function load () {
  const db = new Spacetime({
    baseURL: `${process.env.REACT_APP_API_URL}/v0`,
  })

  await db.applySchema(schema, 'demo/social')

  return 'Schema loaded'
}

load()
  .then(console.log)
  .catch(console.error)
