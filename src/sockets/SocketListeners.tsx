import socket from './socket';
import { SOCKET_EVENTS } from './events';
import PlayerInterface from '../interfaces/PlayerInterface';
// import { factions } from '../mocks/FactionsMock';
import { updatePlayerAttributes } from '../utils/players';

export const listenToServerEventsBattleScreen = (setKaotikaPlayers: (players: PlayerInterface[]) => void, setDravocarPlayers: (players: PlayerInterface[]) => void) => {
  socket.on(SOCKET_EVENTS.RECIVE_USERS, (players: PlayerInterface[]) => {
    
    setKaotikaPlayers(players.kaotika);
    setDravocarPlayers(players.dravocar);
    // console.warn("Take into account that the players are Mocked!")
    // setKaotikaPlayers(factions.kaotika);
    // setDravocarPlayers(factions.dravocar);

  });
};

export const listenToGameStart = (setShowWaitingScreen: React.Dispatch<React.SetStateAction<boolean>>) => {
  socket.on(SOCKET_EVENTS.GAME_STARTED, (showWaitingScreen: boolean) => {
    showWaitingScreen = false;
    setShowWaitingScreen(showWaitingScreen);
  });

};

export const listenToUpdatePlayer = (setKaotikaPlayers: (players: PlayerInterface[]) => void, setDravocarPlayers: (players: PlayerInterface[]) => void, kaotikaPlayers: PlayerInterface[], dravocarPlayers: PlayerInterface[]) => {
  
  socket.on("updatePlayer", ({_id, attributes, totalDamage}) => {

    console.log("Update Player not implemented yet.");
    console.log(_id, attributes, totalDamage);

    // const factionsSetters = {
    //   "kaotika": setKaotikaPlayers,
    //   "dravocar": setDravocarPlayers
    // }

    const factionsData = {
      "kaotika": kaotikaPlayers,
      "dravocar": dravocarPlayers
    }

    updatePlayerAttributes(_id, factionsData, factionsSetters);

  });
}

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