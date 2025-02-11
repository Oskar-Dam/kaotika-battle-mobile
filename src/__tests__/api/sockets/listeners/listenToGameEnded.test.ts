import { listenToGameEnded } from '../../../../sockets/socketListeners';
import { SOCKET_EVENTS } from '../../../../sockets/events';
import socket from '../../../../sockets/socket';

// Arrange
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {}); // Silence console errors
  jest.spyOn(console, 'warn').mockImplementation(() => {}); // Silence console warnings
  jest.spyOn(console, 'log').mockImplementation(() => {}); // Silence console logs
});

// Arrange
jest.mock('../../../../sockets/socket', () => ({
  on: jest.fn(),
  emit: jest.fn(),
}));

// Arrange
beforeEach(() => {
  jest.clearAllMocks();
});

describe('Socket Listeners', () => {

  it('should call setGameEnded with true and setWinner with the winner when GAME_END is received', () => {
    // Arrange
    const setGameEnded = jest.fn();
    const setWinner = jest.fn();
    const winner = 'Kaotika';

    // Act
    listenToGameEnded(setGameEnded, setWinner);

    const callback = (socket.on as jest.Mock).mock.calls.find(([event]) => event === SOCKET_EVENTS.GAME_END)?.[1];
    callback(winner);

    // Assert
    expect(setGameEnded).toHaveBeenCalledWith(true);
    expect(setWinner).toHaveBeenCalledWith(winner);
  });
});
