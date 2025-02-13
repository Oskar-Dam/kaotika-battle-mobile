import { Player } from './Player';

export interface FactionsSetters {
  'kaotika': React.Dispatch<React.SetStateAction<Player[]>>;
  'dravokar': React.Dispatch<React.SetStateAction<Player[]>>;
}