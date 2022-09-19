import { Spacetime } from '@spacetimexyz/client/node'
import users from './users'
import messages from './messages'
import followers from './followers'

// PK, need to establish a PK so we can control updates


async function load () {
  const db = new Spacetime({
    baseURL: `${process.env.REACT_APP_API_URL}/v0/data`,
  })

  await Promise.all([
    db.createCollection(users),
    db.createCollection(messages),
    db.createCollection(followers),
  ])

  return 'Schema loaded'
}

load()
  .then(console.log)
  .catch(console.error)
