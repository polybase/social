import { CollectionMeta } from '@spacetimexyz/client'

const messages: CollectionMeta = {
  id: 'demo/social/messages',
  code: `
    collection Messages {
      id: string!;
      message: string;
      timestamp: string;
      account: string;
      $pk: string;

      @index(account, [timestamp, desc]);
    }
  `,
}

export default messages
