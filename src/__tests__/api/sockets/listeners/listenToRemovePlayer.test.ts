import { listenToRemovePlayer } from '../../../../sockets/socketListeners';
import { mockDividedPlayers } from '../../../../__mocks__/mockPlayers';
import { Player } from '../../../../interfaces/Player';
import { SOCKET_EVENTS } from '../../../../sockets/events';
import socket from '../../../../sockets/socket';
import useStore from '../../../../store/useStore';

jest.mock('../../../../sockets/socket', () => ({
  connect: jest.fn(),
  disconnect: jest.fn(),
  emit: jest.fn(),
  on: jest.fn()
}));

jest.mock('./../../../../store/useStore');

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => { }); // Silence console errors
  jest.spyOn(console, 'warn').mockImplementation(() => { }); // Silence console warnings
  jest.spyOn(console, 'log').mockImplementation(() => { }); // Silence console logs
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('listenToRemovePlayer', () => {

  const { kaotika, dravokar }: { kaotika: Player[], dravokar: Player[] } = mockDividedPlayers;

  const mockStore = {
    player: mockDividedPlayers.kaotika[0],
    kaotikaPlayers: kaotika,
    dravokarPlayers: dravokar,
    updateDravokarPlayerStatus: jest.fn(),
    updateKaotikaPlayerStatus: jest.fn(),
    updatePlayerStatus: jest.fn(),
  };
  (useStore as unknown as jest.Mock).mockReturnValue(mockStore);

  it('Should update the SESSION PLAYER isAlive status if it got killed', () => {
    
    listenToRemovePlayer(mockStore.updateDravokarPlayerStatus, mockStore.updateKaotikaPlayerStatus, mockStore.updatePlayerStatus, mockStore.player);

    const callback = (socket.on as jest.Mock).mock.calls.find(([event]) => event === SOCKET_EVENTS.KILLED_PLAYER)?.[1];
    callback(mockStore.player._id);

    expect(mockStore.updateKaotikaPlayerStatus).toHaveBeenCalledTimes(1);
    expect(mockStore.updateDravokarPlayerStatus).toHaveBeenCalledTimes(1);
    expect(mockStore.updatePlayerStatus).toHaveBeenCalledTimes(1);

    const playerStatus = mockStore.updatePlayerStatus.mock.calls[0][0];

    expect(playerStatus).toBe(false);
   
  });

  it('Should update the KAOTIKA PLAYER isAlive status if it got killed', () => {

    listenToRemovePlayer(mockStore.updateDravokarPlayerStatus, mockStore.updateKaotikaPlayerStatus, mockStore.updatePlayerStatus, mockStore.player);

    const callback = (socket.on as jest.Mock).mock.calls.find(([event]) => event === SOCKET_EVENTS.KILLED_PLAYER)?.[1];
    callback(mockDividedPlayers.kaotika[1]._id);

    expect(mockStore.updateKaotikaPlayerStatus).toHaveBeenCalledTimes(1);
    expect(mockStore.updateDravokarPlayerStatus).toHaveBeenCalledTimes(1);
    expect(mockStore.updatePlayerStatus).toHaveBeenCalledTimes(0);

    const playerStatus = mockStore.updateKaotikaPlayerStatus.mock.calls[0][1];

    expect(playerStatus).toBe(false);

  });

  it('Should update the DRAVOKAR PLAYER isAlive status if it got killed', () => {

    listenToRemovePlayer(mockStore.updateDravokarPlayerStatus, mockStore.updateKaotikaPlayerStatus, mockStore.updatePlayerStatus, mockStore.player);

    const callback = (socket.on as jest.Mock).mock.calls.find(([event]) => event === SOCKET_EVENTS.KILLED_PLAYER)?.[1];
    callback(mockDividedPlayers.dravokar[1]._id);

    expect(mockStore.updateKaotikaPlayerStatus).toHaveBeenCalledTimes(1);
    expect(mockStore.updateDravokarPlayerStatus).toHaveBeenCalledTimes(1);
    expect(mockStore.updatePlayerStatus).toHaveBeenCalledTimes(0);

    const playerStatus = mockStore.updateDravokarPlayerStatus.mock.calls[0][1];

    expect(playerStatus).toBe(false);
  });
});