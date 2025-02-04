import socket from './socket';
import { SOCKET_EVENTS } from './events';
import { Player } from '../interfaces/Player';
import { Modifier } from '../interfaces/Modifier';
// import { updatePlayerAttributes } from '../utils/players';

export const listenToServerEventsBattleScreen = (setKaotikaPlayers: (players: Player[]) => void, setDravocarPlayers: (players: Player[]) => void) => {
  socket.on(SOCKET_EVENTS.RECIVE_USERS, (players: {kaotika: Player[], dravocar: Player[]}) => {
    
    setKaotikaPlayers(players.kaotika);
    setDravocarPlayers(players.dravocar);
    // console.warn("Take into account that the players are Mocked!")
    // setKaotikaPlayers(factions.kaotika);
    // setDravocarPlayers(factions.dravocar);

  });
};

export const listenToGameStart = (setShowWaitingScreen: React.Dispatch<React.SetStateAction<boolean>>) => {
  socket.on(SOCKET_EVENTS.GAME_STARTED, () => {
    setShowWaitingScreen(false);
  });

};

export const listenToUpdatePlayer = (setKaotikaPlayers: (players: Player[]) => void, setDravocarPlayers: (players: Player[]) => void, kaotikaPlayers: Player[], dravocarPlayers: Player[]) => {
  
  socket.on('updatePlayer', (player: {_id: string, attributes: Modifier, totalDamage: number}) => {

    console.log('Update Player not implemented yet.');
    console.log(player);

    const factionsSetters = {
      'kaotika': setKaotikaPlayers,
      'dravocar': setDravocarPlayers
    };

    const factionsData = {
      'kaotika': kaotikaPlayers,
      'dravocar': dravocarPlayers
    };

    console.log(factionsData);
    console.log(factionsSetters);

    // updatePlayerAttributes(player._id, factionsData, factionsSetters);

  });
};

export const clearListenToServerEventsBattleScreen = (): void => {
  socket.off(SOCKET_EVENTS.RECIVE_USERS);
  socket.off(SOCKET_EVENTS.GAME_STARTED);
};

export const listenToDesconnections = (setdisconnection: (disconnection: boolean) => void) => {
  socket.on(SOCKET_EVENTS.DISCONNECT, () => {
    console.log('desconnection modal on');
    setdisconnection(true);
  });
  socket.on(SOCKET_EVENTS.CONNECT, () => {
    console.log('desconnection modal off');
    setdisconnection(false);
  });
};