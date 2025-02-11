import { Player } from '../interfaces/Player';
import { ONLINE_USERS_MOCK } from '../__mocks__/mockPlayers';
import { updateSessionPlayerAttributesIfIdMatches } from '../utils/players';

describe('updateSessionPlayerAttributesIfIdMatches', () => {
  it('should update the player attributes correctly', () => {
    const attributesModified = {
      _id: '66decc4ff42d4a193db77e71', // Matching ID
      attributes: {
        charisma: 0,
        constitution: 0,
        dexterity: 0,
        insanity: 0,
        intelligence: 0,
        strength: 0,
        resistance: 0,
        attack: 0,
        hit_points: 5,
        defense: 0,
        magic_resistance: 0,
        CFP: 0,
        BCFA: 0,
      },
      totalDamage: 30,
      isBetrayer: false
    };

    const player: Player = { ...ONLINE_USERS_MOCK[0], _id: '66decc4ff42d4a193db77e71' }; 
    const setPlayer = jest.fn();

    updateSessionPlayerAttributesIfIdMatches(attributesModified, setPlayer, player);

    //setPlayer.moc.calls stores all calls made to that mock in an array of arguments which return another array of arguments of that call
    // In order to obtain the desired value you should call it: 
    // first call:  setPlayer.mock.calls[0][0]
    // second call: setPlayer.mock.calls[1][0]
    // etc...
    const newPlayerState = setPlayer.mock.calls[0][0]; 
    
    expect(setPlayer).toHaveBeenCalledWith({
      ...player,
      attributes: attributesModified.attributes
    });

    expect(newPlayerState.attributes).toEqual(attributesModified.attributes); 

    expect(setPlayer).toHaveBeenCalledTimes(1); 
  });


  it('should not update the player since ID does not match', () => {
    const attributesModified = {
      _id: '66decc4ff42d4a193db77e72', attributes: {
        charisma: 0,
        constitution: 0,
        dexterity: 0,
        insanity: 0,
        intelligence: 0,
        strength: 0,
        resistance: 0,
        attack: 0,
        hit_points: 5,
        defense: 0,
        magic_resistance: 0,
        CFP: 0,
        BCFA: 0,
      }, totalDamage: 30, isBetrayer: false
    };
    const player: Player = ONLINE_USERS_MOCK[0];
    const setPlayer = jest.fn();

    updateSessionPlayerAttributesIfIdMatches(attributesModified, setPlayer, player);
    expect(setPlayer).not.toHaveBeenCalledWith({
      ...player,
      attributes: attributesModified.attributes
    });
  });
});
