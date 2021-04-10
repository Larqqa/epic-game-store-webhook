import { GameSchema } from './gameSchema';

export interface StoreSchema {
  data: {
    Catalog: {
      searchStore: {
        elements: [
          GameSchema
        ]
      }
    }
  }
};
