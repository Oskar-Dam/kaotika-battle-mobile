import { listenToServerEventsBattleScreen } from '../../../../sockets/socketListeners';
import { mockDividedPlayers } from '../../../../__mocks__/mockPlayers';
import { Player } from '../../../../interfaces/Player';
import { SOCKET_EVENTS } from '../../../../sockets/events';
import socket from '../../../../sockets/socket';

jest.mock('../../../../sockets/socket', () => ({
  connect: jest.fn(),
  disconnect: jest.fn(),
  emit: jest.fn(),
  on: jest.fn()
}));

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {}); // Silence console errors
  jest.spyOn(console, 'warn').mockImplementation(() => {}); // Silence console warnings
  jest.spyOn(console, 'log').mockImplementation(() => {}); // Silence console logs
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('listenToServerEventsBattleScreen', () => {
  it('Should Set new array to each state', () => {
    const players: {kaotika: Player[], dravocar: Player[]} = mockDividedPlayers;
    const setKaotikaPlayers = jest.fn();
    const setDravocarPlayers = jest.fn();

    listenToServerEventsBattleScreen(setKaotikaPlayers, setDravocarPlayers);

    //Mocks the emit of SOCKET_EVENTS.RECIVE_USERS with players as the data received in the event
    const callback = (socket.on as jest.Mock).mock.calls.find(([event]) => event === SOCKET_EVENTS.RECIVE_USERS)?.[1];
    callback(players);

    //Value of the data used on the first call of the mocked functions
    const newKaotikaPlayers = setKaotikaPlayers.mock.calls[0][0]; 
    const newDravocarPlayers = setDravocarPlayers.mock.calls[0][0]; 

    expect(setKaotikaPlayers).toHaveBeenCalledTimes(1);
    expect(setDravocarPlayers).toHaveBeenCalledTimes(1);

    expect(setKaotikaPlayers).toHaveBeenCalledWith(mockDividedPlayers.kaotika);
    expect(setDravocarPlayers).toHaveBeenCalledWith(mockDividedPlayers.dravocar);

    expect(newKaotikaPlayers).toEqual(mockDividedPlayers.kaotika);
    expect(newDravocarPlayers).toEqual(mockDividedPlayers.dravocar);
  });
});