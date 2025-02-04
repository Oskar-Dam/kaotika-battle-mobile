import { Player } from './Player';

export interface LoginScreenInterface {
  email: string;
  setEmail: (email: string) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setPlayer: (player: Player | null) => void;
}