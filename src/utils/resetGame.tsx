import { Player } from '../interfaces/Player';

export const resetAllStates = (setGameEnded: (gameEnded: boolean) => void, 
  setIsMyTurn: (turn: boolean) => void, 
  setIsLoggedIn: (turn: boolean) => void, 
  setEmail: (email: string) => void, 
  setPlayer: React.Dispatch<React.SetStateAction<Player | null>>,
  setKaotikaPlayers: (players: Player[]) => void, 
  setDravokarPlayers: (players: Player[]) => void): void => {
    
  setIsLoggedIn(false);
  setGameEnded(false);
  setIsMyTurn(false);
  setEmail('');
  setKaotikaPlayers([]);
  setDravokarPlayers([]);
  setPlayer(null);
};
