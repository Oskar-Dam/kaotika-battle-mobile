import { ONLINE_USERS_MOCK } from '../../__mocks__/mockPlayers';
import { getPlayerByEmail } from './../../api/player';


jest.mock('./../../api/player', () => ({
  getPlayerByEmail: jest.fn(),
}));

beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => { }); // Silence console logs
  jest.spyOn(console, 'error').mockImplementation(() => { }); // Silence console errors
  jest.spyOn(console, 'warn').mockImplementation(() => { }); // Silence console warnings
});

beforeEach(() => {
  global.fetch = jest.fn();
 
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('getPlayerByEmail', () => {

  it('it should return player data of -aitor.mendiburu@ikasle.aeg.eus- when is successfully', async () => {
    const mockData = { data: ONLINE_USERS_MOCK[0] };
    (getPlayerByEmail as jest.Mock).mockResolvedValue(mockData.data);
    const email = 'aitor.mendiburu@ikasle.aeg.eus';
    const resultPlayer = await getPlayerByEmail(email);
    expect(resultPlayer.email).toBe(email);
  });

  it('it should throw an error when the email -mikel161211231@ikasle.aeg.eus- is not found [status error 500', async () => {
    (getPlayerByEmail as jest.Mock).mockRejectedValue(new Error('Email not found'));
    const email = 'mikel161211231@ikasle.aeg.eus';
    await expect(getPlayerByEmail(email)).rejects.toThrow('Email not found');
  });

  it('it should throw an error when the game already started [status error 403]', async () => {
    (getPlayerByEmail as jest.Mock).mockRejectedValue(new Error('Game already started'));
    const email = 'aitor.mendiburu@ikasle.aeg.eus';
    await expect(getPlayerByEmail(email)).rejects.toThrow('Game already started');
  });

  it('it should throw an error when the server failed to fetch the player data of the email -aitor.mendiburu@ikasle.aeg.eus-', async () => {
    (getPlayerByEmail as jest.Mock).mockRejectedValue(new Error('Failed to fetch player data'));
    const email = 'aitor.mendiburu@ikasle.aeg.eus';
    await expect(getPlayerByEmail(email)).rejects.toThrow('Failed to fetch player data');
  });

});