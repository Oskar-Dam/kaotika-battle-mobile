import { listenToRemovePlayer } from '../../../../sockets/socketListeners';
import { mockDividedPlayers, ONLINE_USERS_MOCK } from '../../../../__mocks__/mockPlayers';
import { Player } from '../../../../interfaces/Player';
import { SOCKET_EVENTS } from '../../../../sockets/events';
import socket from '../../../../sockets/socket';

jest.mock('../../../../sockets/socket', () => ({
  connect: jest.fn(),
  disconnect: jest.fn(),
  emit: jest.fn(),
  on: jest.fn()
}));

const setKaotikaPlayers = jest.fn();
const setDravokarPlayers = jest.fn();
const setUserDead = jest.fn();

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => { }); // Silence console errors
  jest.spyOn(console, 'warn').mockImplementation(() => { }); // Silence console warnings
  jest.spyOn(console, 'log').mockImplementation(() => { }); // Silence console logs
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('listenToRemovePlayer', () => {
  it('Should remove the user in dravokar array when SOCKET_EVENTS.KILLED_PLAYER is event is received', () => {
    const { kaotika, dravokar }: { kaotika: Player[], dravokar: Player[] } = mockDividedPlayers;
    const expectedResult:Player = mockDividedPlayers.dravokar[1];
    const player: Player = ONLINE_USERS_MOCK[0];
    const playerId: string = player._id;

    listenToRemovePlayer(setKaotikaPlayers, setDravokarPlayers, kaotika, dravokar, setUserDead, player);

    const callback = (socket.on as jest.Mock).mock.calls.find(([event]) => event === SOCKET_EVENTS.KILLED_PLAYER)?.[1];
    callback(playerId);

    //Value of the data used on the first call of the mocked functions
    const newDravokarPlayers = setDravokarPlayers.mock.calls[0][0];

    expect(setKaotikaPlayers).toHaveBeenCalledTimes(0);
    expect(setDravokarPlayers).toHaveBeenCalledTimes(1);

    expect(setDravokarPlayers).toHaveBeenCalledWith(mockDividedPlayers.dravokar);

    expect(newDravokarPlayers).toEqual([expectedResult]);

    expect(newDravokarPlayers.length).toBe(1);
  });

  it('Should remove the user in kaotika array when SOCKET_EVENTS.KILLED_PLAYER is event is received', () => {
    const { kaotika, dravokar }: { kaotika: Player[], dravokar: Player[] } = mockDividedPlayers;
    const expectedResult:Player = mockDividedPlayers.kaotika[1];
    const player: Player = ONLINE_USERS_MOCK[1];
    const playerId: string = player._id;

    listenToRemovePlayer(setKaotikaPlayers, setDravokarPlayers, kaotika, dravokar, setUserDead, player);

    const callback = (socket.on as jest.Mock).mock.calls.find(([event]) => event === SOCKET_EVENTS.KILLED_PLAYER)?.[1];
    callback(playerId);

    //Value of the data used on the first call of the mocked functions

    
    const newKaotikaPlayers = setKaotikaPlayers.mock.calls[0][0];
    console.log(newKaotikaPlayers);

    expect(setKaotikaPlayers).toHaveBeenCalledTimes(1);
    expect(setDravokarPlayers).toHaveBeenCalledTimes(0);

    expect(setKaotikaPlayers).toHaveBeenCalledWith(mockDividedPlayers.kaotika);

    expect(newKaotikaPlayers).toEqual([expectedResult]);

    expect(newKaotikaPlayers.length).toBe(1);
  });

  it('Should remove the user in dravokar array when SOCKET_EVENTS.REMOVE_PLAYER is event is received', () => {
    const { kaotika, dravokar }: { kaotika: Player[], dravokar: Player[] } = mockDividedPlayers;
    const player: Player = ONLINE_USERS_MOCK[2];
    const playerId: string = player._id;


    listenToRemovePlayer(setKaotikaPlayers, setDravokarPlayers, kaotika, dravokar, setUserDead, player);

    const callback = (socket.on as jest.Mock).mock.calls.find(([event]) => event === SOCKET_EVENTS.REMOVE_PLAYER)?.[1];
    callback(playerId);

    // Value of the data used on the first call of the mocked functions
    const newDravokarPlayers = setDravokarPlayers.mock.calls[0][0];
    console.log('showing mock calls: ',setDravokarPlayers.mock.calls);
    
    expect(setKaotikaPlayers).toHaveBeenCalledTimes(0);
    expect(setDravokarPlayers).toHaveBeenCalledTimes(1);

    expect(setDravokarPlayers).toHaveBeenCalledWith(mockDividedPlayers.dravokar);

    expect(newDravokarPlayers).toEqual([]);

    expect(newDravokarPlayers.length).toBe(0);
  });

  it('Should remove the user in kaotika array when SOCKET_EVENTS.REMOVE_PLAYER is event is received', () => {
    const { kaotika, dravokar }: { kaotika: Player[], dravokar: Player[] } = mockDividedPlayers;
    const player: Player = ONLINE_USERS_MOCK[3];
    const playerId: string = player._id;
    const setKaotikaPlayers = jest.fn();
    const setDravokarPlayers = jest.fn();
    const setUserDead = jest.fn();

    listenToRemovePlayer(setKaotikaPlayers, setDravokarPlayers, kaotika, dravokar, setUserDead, player);

    const callback = (socket.on as jest.Mock).mock.calls.find(([event]) => event === SOCKET_EVENTS.REMOVE_PLAYER)?.[1];
    callback(playerId);

    //Value of the data used on the first call of the mocked functions
    const newKaotikaPlayers = setKaotikaPlayers.mock.calls[0][0];

    expect(setKaotikaPlayers).toHaveBeenCalledTimes(1);
    expect(setDravokarPlayers).toHaveBeenCalledTimes(0);

    expect(setKaotikaPlayers).toHaveBeenCalledWith(mockDividedPlayers.kaotika);

    expect(newKaotikaPlayers).toEqual([]);

    expect(newKaotikaPlayers.length).toBe(0);
  });
});