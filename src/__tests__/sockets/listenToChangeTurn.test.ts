import { SOCKET_EVENTS } from '../../sockets/events';
import socket from '../../sockets/socket';
import { listenToInsufficientPlayers } from '../../sockets/socketListeners';

beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {}); // Silence console logs
  jest.spyOn(console, 'error').mockImplementation(() => {}); // Silence console errors
  jest.spyOn(console, 'warn').mockImplementation(() => {}); // Silence console warnings
});

jest.mock('../../sockets/socket', () => ({
  on: jest.fn(),
  emit: jest.fn(),
}));

describe('Socket Listeners', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Cambia de turno correctamente y emite evento de selección de jugador', () => {
    const setInsufficientPlayers = jest.fn();
  
    listenToInsufficientPlayers(setInsufficientPlayers);
  
    const callback = (socket.on as jest.Mock).mock.calls.find(([event]) => event === SOCKET_EVENTS.INSUFFICIENT_PLAYERS)?.[1];
        
    callback();

    console.log('Llamadas a setIsMyTurn:', setInsufficientPlayers.mock.calls);
  
    expect(setInsufficientPlayers).toHaveBeenCalledWith(true);
  });
});
 