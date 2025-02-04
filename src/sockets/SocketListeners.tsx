import socket from './socket';
import { SOCKET_EVENTS } from './events';
import { factions } from '../mocks/FactionsMock';
import { Player } from '../interfaces/Player';
import { Modifier } from '../interfaces/Modifier';

export const listenToServerEventsBattleScreen = (setKaotikaPlayers: (players: Player[]) => void, setDravocarPlayers: (players: Player[]) => void) => {
  socket.on(SOCKET_EVENTS.RECIVE_USERS, (players: Player[]) => {
    
    // setAllPlayers(players.kaotika);
    // setAllPlayers(players.dravocar);
    console.log(players);

    console.warn('Take into account that the players are Mocked!');
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

export const listenToUpdatePlayer = (setKaotikaPlayers: (players: Player[]) => void, setDravocarPlayers: (players: Player[]) => void) => {
  socket.on('update-player', (player: { _id: string, attributes: Modifier }) => {

    if (updatePlayerAttributes(player, factions.kaotika)) {
      setKaotikaPlayers([...factions.kaotika]);
    }

    if (updatePlayerAttributes(player, factions.dravocar)) {
      setDravocarPlayers([...factions.dravocar]);
    }

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

const updatePlayerAttributes = (player: { _id: string, attributes: Modifier }, players: Player[]): boolean => {
  const playerToUpdate = players.find(p => p._id === player._id);
  if (playerToUpdate) {
    playerToUpdate.attributes = player.attributes;
    return true;
  }
  return false;
};
