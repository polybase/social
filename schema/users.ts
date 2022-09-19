import { CollectionMeta } from '@spacetimexyz/client'

const users: CollectionMeta = {
  id: 'demo/social/users',
  code: `
    collection Users {
      id: string!;
      name: string;
      description: string;
      icon: string;
      pvkey: string;
      $pk: string;
    }
  `,
}

export default users
