import { SOCKET_EVENTS } from '../../../../sockets/events';
import socket from '../../../../sockets/socket';
import { listenToDisconnections } from '../../../../sockets/socketListeners';

beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {}); // Silence console logs
  jest.spyOn(console, 'error').mockImplementation(() => {}); // Silence console errors
  jest.spyOn(console, 'warn').mockImplementation(() => {}); // Silence console warnings
});

jest.mock('../../../../sockets/socket', () => ({
  on: jest.fn(),
  emit: jest.fn(),
}));

describe('Socket Listeners', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call setdisconnection with true when a disconnect event occurs', () => {

    const setDisconnection = jest.fn();
  
    listenToDisconnections(setDisconnection);
  
    const callback = (socket.on as jest.Mock).mock.calls.find(([event]) => event === SOCKET_EVENTS.DISCONNECT)?.[1];
    
    callback();

    console.log('Llamadas a setIsMyTurn:', setDisconnection.mock.calls);
  
    expect(setDisconnection).toHaveBeenCalledWith(true);
  });
  it('should call setdisconnection with false when a connect event occurs', () => {

    const setDisconnection = jest.fn();
  
    listenToDisconnections(setDisconnection);
  
    const callback = (socket.on as jest.Mock).mock.calls.find(([event]) => event === SOCKET_EVENTS.CONNECT)?.[1];
    
    callback();

    console.log('Llamadas a setIsMyTurn:', setDisconnection.mock.calls);
  
    expect(setDisconnection).toHaveBeenCalledWith(false);
  });
});

