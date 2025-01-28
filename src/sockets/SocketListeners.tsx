import socket from './socket';
import { SOCKET_EVENTS } from './events';
import PlayerInterface from '../interfaces/PlayerInterface';

export const listenToServerEventsBattleScreen = (setAllPlayers: (players: PlayerInterface[]) => void) => {
  socket.on(SOCKET_EVENTS.RECIVE_USERS, (players: PlayerInterface[]) => {
    console.log('Players: ' + players);
    setAllPlayers(players);
  });
};

export const clearListenToServerEventsBattleScreen = ():void =>{
  socket.off(SOCKET_EVENTS.RECIVE_USERS);
}