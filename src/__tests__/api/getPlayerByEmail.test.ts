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
});