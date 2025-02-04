import { Effect } from './Effect';

export interface Potion {
  id: string;
  name: string;
  type: string;
  rarity: string;
  effects: {
    primary: Effect;
  };
  image: string;
}
