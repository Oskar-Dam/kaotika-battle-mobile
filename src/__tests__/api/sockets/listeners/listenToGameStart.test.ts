import { SOCKET_EVENTS } from '../../../../sockets/events';
import { listenToGameStart } from '../../../../sockets/socketListeners';
import socket from '../../../../sockets/socket';

// Arrange
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  jest.spyOn(console, 'log').mockImplementation(() => {});
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

  it('should call setShowWaitingScreen with false when GAME_START is received', () => {
    // Arrange
    const setShowWaitingScreen = jest.fn();

    // Act
    listenToGameStart(setShowWaitingScreen);

    // Simulate the socket event
    const callback = (socket.on as jest.Mock).mock.calls.find(([event]) => event === SOCKET_EVENTS.GAME_START)?.[1];
    callback();

    // Assert
    expect(setShowWaitingScreen).toHaveBeenCalledWith(false);
  });

});
