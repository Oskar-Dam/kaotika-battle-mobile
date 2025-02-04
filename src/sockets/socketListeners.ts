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