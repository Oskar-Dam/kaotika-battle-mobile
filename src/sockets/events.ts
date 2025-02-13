export const SOCKET_EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  ERROR:'connect_error',
  SEND_SOCKETID:'mobile-sendSocketId',
  RECIVE_USERS:'connectedUsers',
  GAME_START:'mobile-gameStart',
  GAME_STARTED:'gameStart',
  GAME_END: 'gameEnd',
  TURN_CHANGE:'assign-turn',
  INSUFFICIENT_PLAYERS:'mobile-insufficientPlayers',
  UPDATE_PLAYER: 'updatePlayer',
  REMOVE_PLAYER: 'removePlayer',
};

export const SOCKET_EMIT_EVENTS = {
  ATTACK: 'mobile-attack',
  SET_SELECTED_PLAYER: 'mobile-setSelectedPlayer',
  GAME_START: 'mobile-gameStart'
};