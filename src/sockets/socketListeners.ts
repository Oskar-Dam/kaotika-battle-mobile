import { FactionsSetters } from '../interfaces/FactionsSetters';
import { Modifier } from '../interfaces/Modifier';
import { Player } from '../interfaces/Player';
import { removeSelectedPlayerFromTeams, setUserStatusToDeadIfIdMatches, updatePlayerAttributes, updateSessionPlayerAttributesIfIdMatches } from '../utils/players';
import { SOCKET_EMIT_EVENTS, SOCKET_EVENTS } from './events';
import socket from './socket';

export const listenToServerEventsBattleScreen = (setKaotikaPlayers: (players: Player[]) => void, setDravokarPlayers: (players: Player[]) => void) => {
  socket.on(SOCKET_EVENTS.RECIVE_USERS, (players: {kaotika: Player[], dravokar: Player[]}) => {
    console.log(`'${SOCKET_EVENTS.RECIVE_USERS}' socket received.`);    
    
    setKaotikaPlayers(players.kaotika);
    setDravokarPlayers(players.dravokar);
    console.log('Kaotika players received:', players.kaotika);
    console.log('Dravokar players received:', players.dravokar);
    
  });
};

export const listenToChangeTurn = (setIsMyTurn: (turn: boolean) => void,player: Player | null, kaotikaPlayers: Player[], dravokarPlayers: Player[], setSelectedPlayerIndex: (index: number) => void ) => {
  socket.on(SOCKET_EVENTS.TURN_CHANGE, (_id: string) => {
    console.log(`'${SOCKET_EVENTS.TURN_CHANGE}' socket received.`);
    console.log('FIRST DRAVOKAR PLAYER NOW: ', dravokarPlayers);
    console.log('FIRST KAOTIKA PLAYER NOW: ', kaotikaPlayers);
    if (player?._id === _id) {
      setIsMyTurn(true);
      if (player && !player.isBetrayer) {
        setSelectedPlayerIndex(dravokarPlayers.length);
        setSelectedPlayerIndex(1);
      
        socket.emit(SOCKET_EMIT_EVENTS.SET_SELECTED_PLAYER, dravokarPlayers[0]._id);
      }
      else {
        setSelectedPlayerIndex(kaotikaPlayers.length);
        setSelectedPlayerIndex(1);

        socket.emit(SOCKET_EMIT_EVENTS.SET_SELECTED_PLAYER, dravokarPlayers[0]._id);
      }
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

export const listenToUpdatePlayer = (factionsSetters: FactionsSetters, setPlayer: React.Dispatch<React.SetStateAction<Player | null>>, player: Player) => {
  socket.on(SOCKET_EVENTS.UPDATE_PLAYER, (updatedPlayer: {_id: string, attributes: Modifier, totalDamage: number, isBetrayer: boolean}) => {
    console.log(`'${SOCKET_EVENTS.UPDATE_PLAYER}' socket received.`);
    updatePlayerAttributes(updatedPlayer, factionsSetters);
    updateSessionPlayerAttributesIfIdMatches(updatedPlayer, setPlayer, player);
  });
};

export const listenToRemovePlayer = (setKaotikaPlayers:React.Dispatch<React.SetStateAction<Player[]>>, setDravokarPlayers:React.Dispatch<React.SetStateAction<Player[]>>, kaotikaPlayers: Player[], dravokarPlayers: Player[], setUserDead:React.Dispatch<React.SetStateAction<boolean>>, player: Player) => {
  
  socket.on(SOCKET_EVENTS.REMOVE_PLAYER, (playerId: string) => {

    console.log(`'${SOCKET_EVENTS.REMOVE_PLAYER}' socket received.`);
    console.log('Player ID to remove:', playerId);

    removeSelectedPlayerFromTeams(kaotikaPlayers, dravokarPlayers, setKaotikaPlayers, setDravokarPlayers, playerId);
    setUserStatusToDeadIfIdMatches(setUserDead, player._id, playerId);
  });

  socket.on(SOCKET_EVENTS.KILLED_PLAYER, (playerId: string) => {

    console.log(`'${SOCKET_EVENTS.KILLED_PLAYER}' socket received.`);
    console.log('Player ID to remove:', playerId);

    removeSelectedPlayerFromTeams(kaotikaPlayers, dravokarPlayers, setKaotikaPlayers, setDravokarPlayers, playerId);
    setUserStatusToDeadIfIdMatches(setUserDead, player._id, playerId);
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

export const listenToGameEnded = (setGameEnded: (gameEnded: boolean) => void, setWinner: (winner: string) => void) => {
  socket.on(SOCKET_EVENTS.GAME_END, (winner: string) => {
    console.log(`'${SOCKET_EVENTS.GAME_END}' socket received.`);
    setGameEnded(true);
    setWinner(winner);
  });
};

// ---- SOCKET OFFS ---- //

export const clearListenToServerEventsBattleScreen = (): void => {
  socket.off(SOCKET_EVENTS.RECIVE_USERS);
  console.log(`'${SOCKET_EVENTS.RECIVE_USERS}' socket cleared.`);

  socket.off(SOCKET_EVENTS.GAME_END);
  console.log(`'${SOCKET_EVENTS.GAME_END}' socket cleared.`);

  socket.off(SOCKET_EVENTS.UPDATE_PLAYER);
  console.log(`'${SOCKET_EVENTS.UPDATE_PLAYER}' socket cleared.`);

  socket.off(SOCKET_EVENTS.TURN_CHANGE);
  console.log(`'${SOCKET_EVENTS.TURN_CHANGE}' socket cleared.`);
  
};

export const clearWaitingScreenEvents = ():void => {
  socket.off(SOCKET_EVENTS.INSUFFICIENT_PLAYERS);
  console.log(`'${SOCKET_EVENTS.INSUFFICIENT_PLAYERS}' socket cleared.`);
};

