import { ONLINE_USERS_MOCK } from '../../__mocks__/mockPlayers';
import { getPlayerByEmail } from './../../api/player';


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
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    });
    const email = 'aitor.mendiburu@ikasle.aeg.eus';
    const resultPlayer = await getPlayerByEmail(email);
    expect(resultPlayer.email).toBe(email);
  });

  it('it should throw an error when the email -mikel161211231@ikasle.aeg.eus- is not found [status error 500', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
    });
    const email = 'mikel161211231@ikasle.aeg.eus';
    await expect(getPlayerByEmail(email)).rejects.toThrow('Email not found');
  });

  it('it should throw an error when the game already started [status error 403]', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 403,
    });
    const email = 'aitor.mendiburu@ikasle.aeg.eus';
    await expect(getPlayerByEmail(email)).rejects.toThrow('Game already started');
  });
  
  it('it should throw an error when the server failed to fetch the player data of the email -aitor.mendiburu@ikasle.aeg.eus-', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 400,
    });
    const email = 'aitor.mendiburu@ikasle.aeg.eus';
    await expect(getPlayerByEmail(email)).rejects.toThrow('Failed to fetch player data');
  });

});