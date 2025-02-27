import { Player } from '../interfaces/Player';

export const resetAllStates = (setGameEnded: (gameEnded: boolean) => void, 
  setIsMyTurn: (turn: boolean) => void, 
  setKaotikaPlayers: (players: Player[]) => void, 
  setDravokarPlayers: (players: Player[]) => void, 
  setIsSettingModalOpen: (isOpen: boolean) => void, 
  setGameJoined: (gameJoined: boolean) => void, 
  setGameCreated: (gameCreated: boolean) => void, 
  setGameSelected: (loggedIn: boolean) => void, 
  setIsBattleSelected: (battleSelected: boolean) => void, 
  setIsAdventureSelected: (adventureSelected: boolean) => void,
  setGameStarted: (isGameStarted: boolean) => void) : void => {
    
  setGameEnded(false);
  setIsMyTurn(false);
  setKaotikaPlayers([]);
  setDravokarPlayers([]);
  setIsSettingModalOpen(false);
  setGameCreated(false);
  setGameJoined(false);
  setGameSelected(false);
  setIsBattleSelected(false);
  setIsAdventureSelected(false);
  setGameStarted(false);
};
