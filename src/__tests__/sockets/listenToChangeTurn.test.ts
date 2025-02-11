import { listenToChangeTurn } from '../../sockets/socketListeners';
import { SOCKET_EVENTS } from '../../sockets/events';
import socket from '../../sockets/socket';
import { mockDividedPlayers } from '../../__mocks__/mockPlayers';

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

  it('should change the turn correctly and emits the selected player', () => {
    const setIsMyTurn = jest.fn();
    const setSelectedPlayerIndex = jest.fn();
  
    const dravocarPlayers = mockDividedPlayers.dravocar;
    const kaotikaPlayers = mockDividedPlayers.kaotika;
    const mockPlayer = mockDividedPlayers.kaotika[1];
  
    listenToChangeTurn(setIsMyTurn, mockPlayer, kaotikaPlayers, dravocarPlayers, setSelectedPlayerIndex);
  
    const callback = (socket.on as jest.Mock).mock.calls.find(([event]) => event === SOCKET_EVENTS.TURN_CHANGE)?.[1];
        
    callback();

    console.log('Llamadas a setIsMyTurn:', setIsMyTurn.mock.calls);
  
    expect(setIsMyTurn).toHaveBeenCalledWith(true);
    expect(setSelectedPlayerIndex).toHaveBeenCalledWith(dravocarPlayers.length);
    expect(setSelectedPlayerIndex).toHaveBeenCalledWith(1);
    expect(socket.emit).toHaveBeenCalledWith('mobile-setSelectedPlayer', dravocarPlayers[0]._id);
  });
});
 