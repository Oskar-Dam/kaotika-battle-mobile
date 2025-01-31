import socket from './socket';
import { SOCKET_EVENTS } from './events';
import PlayerInterface from '../interfaces/PlayerInterface';
import { factions } from '../mocks/FactionsMock';

export const listenToServerEventsBattleScreen = (setKaotikaPlayers: (players: PlayerInterface[]) => void, setDravocarPlayers: (players: PlayerInterface[]) => void) => {
  socket.on(SOCKET_EVENTS.RECIVE_USERS, (players: PlayerInterface[]) => {
    
    // setAllPlayers(players.kaotika);
    // setAllPlayers(players.dravocar);

    console.warn("Take into account that the players are Mocked!")
    setKaotikaPlayers(factions.kaotika);
    setDravocarPlayers(factions.dravocar);

  });
};

export const listenToGameStart = (setShowWaitingScreen: React.Dispatch<React.SetStateAction<boolean>>) => {
  socket.on(SOCKET_EVENTS.GAME_STARTED, (showWaitingScreen: boolean) => {
    showWaitingScreen = false;
    setShowWaitingScreen(showWaitingScreen);
  });

};

export const clearListenToServerEventsBattleScreen = (): void => {
  socket.off(SOCKET_EVENTS.RECIVE_USERS);
  socket.off(SOCKET_EVENTS.GAME_STARTED);
}

export const listenToDesconnections = (setdisconnection: (disconnection: boolean) => void) => {
  socket.on(SOCKET_EVENTS.DISCONNECT, () => {
    console.log("desconnection modal on");
    setdisconnection(true);
  });
  socket.on(SOCKET_EVENTS.CONNECT, () => {
    console.log("desconnection modal off");
    setdisconnection(false);
  });
}

