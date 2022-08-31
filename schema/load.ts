import { CollectionMeta, Spacetime } from '@spacetimexyz/client'
import users from './users.json'
import tweets from './tweets.json'
import followers from './followers.json'

// PK, need to establish a PK so we can control updates


async function load () {
  const db = new Spacetime({
    baseURL: `${process.env.REACT_APP_API_URL}/v0/data`,
  })

  await Promise.all([
    db.createCollection(users as CollectionMeta),
    db.createCollection(tweets as CollectionMeta),
    db.createCollection(followers as CollectionMeta),
  ])

  return 'Schema loaded'
}

load()
  .then(console.log)
  .catch(console.error)