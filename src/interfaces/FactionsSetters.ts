import { Player } from './Player';

export interface FactionsSetters {
  'kaotika': React.Dispatch<React.SetStateAction<Player[]>>;
  'dravocar': React.Dispatch<React.SetStateAction<Player[]>>;
}