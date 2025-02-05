import socket from './socket';
import { SOCKET_EVENTS } from './events';
import { Player } from '../interfaces/Player';
import { Modifier } from '../interfaces/Modifier';
import { updatePlayerAttributes } from '../utils/players';
import { FactionsSetters } from '../interfaces/FactionsSetters';

export const listenToServerEventsBattleScreen = (setKaotikaPlayers: (players: Player[]) => void, setDravocarPlayers: (players: Player[]) => void) => {
  socket.on(SOCKET_EVENTS.RECIVE_USERS, (players: {kaotika: Player[], dravocar: Player[]}) => {
    setKaotikaPlayers(players.kaotika);
    setDravocarPlayers(players.dravocar);
  });
};

export const listenToChangeTurn = (setIsMyTurn: (turn: boolean) => void,player: Player | null) => {
  socket.on(SOCKET_EVENTS.TURN_CHANGE, (_id: string) => {
    console.log('TURN CHANGED');
    if (player?._id === _id) {
      setIsMyTurn(true);
    } else {
      setIsMyTurn(false);
    }
  });
};

export const listenToGameStart = (setShowWaitingScreen: React.Dispatch<React.SetStateAction<boolean>>) => {
  socket.on(SOCKET_EVENTS.GAME_STARTED, () => {
    setShowWaitingScreen(false);
  });
};

export const listenToUpdatePlayer = (factionsSetters: FactionsSetters) => {
  socket.on('updatePlayer', (updatedPlayer: {_id: string, attributes: Modifier, totalDamage: number, isBetrayer: boolean}) => {
    console.log('updatePlayer socket received.');
    updatePlayerAttributes(updatedPlayer, factionsSetters);
  });
};

export const listenToRemovePlayer = (setKaotikaPlayers: (players: Player[]) => void, setDravocarPlayers: (players: Player[]) => void, kaotikaPlayers: Player[], dravocarPlayers: Player[]) => {
  
  socket.on('removePlayer', (playerId: string) => {

    console.log('Player ID to remove:', playerId);
    
    const kaotikaPlayerIndex = kaotikaPlayers.findIndex(player => player._id === playerId);
    if (kaotikaPlayerIndex !== -1) {
      console.log('Player is from kaotika faction');
      kaotikaPlayers.splice(kaotikaPlayerIndex, 1);
      setKaotikaPlayers([...kaotikaPlayers]);
    }

    // Search and remove player from dravocarPlayers
    const dravocarPlayerIndex = dravocarPlayers.findIndex(player => player._id === playerId);
    if (dravocarPlayerIndex !== -1) {
      console.log('Player is from dravocar faction');
      dravocarPlayers.splice(dravocarPlayerIndex, 1);
      setDravocarPlayers([...dravocarPlayers]);
    }
  });
};

export const clearListenToServerEventsBattleScreen = (): void => {
  socket.off(SOCKET_EVENTS.RECIVE_USERS);
  socket.off(SOCKET_EVENTS.GAME_STARTED);
  socket.off(SOCKET_EVENTS.TURN_CHANGE);
};

export const listenToDisconnections = (setdisconnection: (disconnection: boolean) => void) => {
  socket.on(SOCKET_EVENTS.DISCONNECT, () => {
    console.log('Disconnection modal on');
    setdisconnection(true);
  });
  socket.on(SOCKET_EVENTS.CONNECT, () => {
    console.log('Disconnection modal off');
    setdisconnection(false);
  });
};