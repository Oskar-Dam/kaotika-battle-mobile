import PlayerInterface from './PlayerInterface';

export interface LoginScreenInterface {
  email: string;
  setEmail: (email: string) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setPlayer: (player: PlayerInterface | null) => void;
}