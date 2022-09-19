import { CollectionMeta } from '@spacetimexyz/client'

const followers: CollectionMeta = {
  id: 'demo/social/followers',
  code: `
    collection Followers {
      id: string!;
      follower: string;
      followee: string;
      email: string;
      $pk: string;
    }
  `,
}

export default followers
