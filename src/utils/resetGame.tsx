import { Player } from '../interfaces/Player';

export const resetAllStates = (setGameEnded: (gameEnded: boolean) => void, 
  setIsMyTurn: (turn: boolean) => void, 
  setIsLoggedIn: (turn: boolean) => void, 
  setEmail: (email: string) => void, 
  setPlayer:(players: Player) => void,
  setKaotikaPlayers: (players: Player[]) => void, 
  setDravokarPlayers: (players: Player[]) => void,
  setIsSettingModalOpen: (isOpen: boolean) => void): void => {
    
  setIsLoggedIn(false);
  setGameEnded(false);
  setIsMyTurn(false);
  setEmail('');
  setKaotikaPlayers([]);
  setDravokarPlayers([]);
  setPlayer(null!);
  setIsSettingModalOpen(false);
};
