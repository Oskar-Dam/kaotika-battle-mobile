import socket from './socket';
import { SOCKET_EVENTS } from './events';
import { Player } from '../interfaces/Player';
import { Modifier } from '../interfaces/Modifier';
import { updatePlayerAttributes } from '../utils/players';
import { FactionsSetters } from '../interfaces/FactionsSetters';

export const listenToServerEventsBattleScreen = (setKaotikaPlayers: (players: Player[]) => void, setDravocarPlayers: (players: Player[]) => void) => {
  socket.on(SOCKET_EVENTS.RECIVE_USERS, (players: {kaotika: Player[], dravocar: Player[]}) => {
    console.log(`'${SOCKET_EVENTS.RECIVE_USERS}' socket received.`);
    setKaotikaPlayers(players.kaotika);
    setDravocarPlayers(players.dravocar);
  });
};

export const listenToChangeTurn = (setIsMyTurn: (turn: boolean) => void,player: Player | null) => {
  socket.on(SOCKET_EVENTS.TURN_CHANGE, (_id: string) => {
    console.log(`'${SOCKET_EVENTS.TURN_CHANGE}' socket received.`);
    if (player?._id === _id) {
      setIsMyTurn(true);
    } else {
      setIsMyTurn(false);
    }
  });
};
export const listenToInsufficientPlayers = (setInsufficientPlayers: (turn: boolean) => void) =>{
  socket.on(SOCKET_EVENTS.INSUFFICIENT_PLAYERS, () => {
    console.log(`'${SOCKET_EVENTS.INSUFFICIENT_PLAYERS}' socket received.`);
    setInsufficientPlayers(true);
  });
};  

export const listenToGameStart = (setShowWaitingScreen: React.Dispatch<React.SetStateAction<boolean>>) => {
  socket.on(SOCKET_EVENTS.GAME_STARTED, () => {
    console.log(`'${SOCKET_EVENTS.GAME_STARTED}' socket received.`);
    setShowWaitingScreen(false);
  });
};

export const listenToUpdatePlayer = (factionsSetters: FactionsSetters) => {
  socket.on(SOCKET_EVENTS.UPDATE_PLAYER, (updatedPlayer: {_id: string, attributes: Modifier, totalDamage: number, isBetrayer: boolean}) => {
    console.log(`'${SOCKET_EVENTS.UPDATE_PLAYER}' socket received.`);
    updatePlayerAttributes(updatedPlayer, factionsSetters);
  });
};

export const listenToRemovePlayer = (setKaotikaPlayers: (players: Player[]) => void, setDravocarPlayers: (players: Player[]) => void, kaotikaPlayers: Player[], dravocarPlayers: Player[]) => {
  
  socket.on(SOCKET_EVENTS.REMOVE_PLAYER, (playerId: string) => {

    console.log(`'${SOCKET_EVENTS.REMOVE_PLAYER}' socket received.`);
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

export const listenToDisconnections = (setdisconnection: (disconnection: boolean) => void) => {
  socket.on(SOCKET_EVENTS.DISCONNECT, () => {
    console.log(`'${SOCKET_EVENTS.DISCONNECT}' socket received.`);
    setdisconnection(true);
  });
  socket.on(SOCKET_EVENTS.CONNECT, () => {
    console.log(`'${SOCKET_EVENTS.CONNECT}' socket received.`);
    setdisconnection(false);
  });
};

// ---- SOCKET OFFS ---- //

export const clearListenToServerEventsBattleScreen = (): void => {
  socket.off(SOCKET_EVENTS.RECIVE_USERS);
  console.log(`'${SOCKET_EVENTS.RECIVE_USERS}' socket cleared.`);

  socket.off(SOCKET_EVENTS.GAME_STARTED);
  console.log(`'${SOCKET_EVENTS.GAME_STARTED}' socket cleared.`);

  socket.off(SOCKET_EVENTS.TURN_CHANGE);
  console.log(`'${SOCKET_EVENTS.TURN_CHANGE}' socket cleared.`);
};

export const clearWaitingScreenEvents = ():void => {
  socket.off(SOCKET_EVENTS.INSUFFICIENT_PLAYERS);
  console.log(`'${SOCKET_EVENTS.INSUFFICIENT_PLAYERS}' socket cleared.`);
};

