import { Player } from '../interfaces/Player';
import { ONLINE_USERS_MOCK } from '../__mocks__/mockPlayers';
import { updateSessionPlayerAttributesIfIdMatches } from '../utils/players';

describe('updateSessionPlayerAttributesIfIdMatches', () => {
  it('should update the player attributes correctly', () => {
    const attributesModified = {
      _id: '66decc4ff42d4a193db77e71', attributes: {
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

    expect(setPlayer).toHaveBeenCalledWith({
      ...player,
      attributes: attributesModified.attributes
    });
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
