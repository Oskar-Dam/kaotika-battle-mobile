import { Player } from './Player';

export interface FactionsSetters {
  'kaotika': (players:Player[]) => void;
  'dravokar': (players:Player[]) => void;
}