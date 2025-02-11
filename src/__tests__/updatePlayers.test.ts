import { updatePlayerAttributes } from '../utils/players';
import { mockDividedPlayers } from '../__mocks__/mockPlayers';

describe('updatePlayerAttributes', () => {
  it('should update the player attributes correctly in the correct faction', () => {
    // Arrange
    const playerToUpdate = {
      _id: '66decc4ff42d4a193db77e71',
      attributes: {
        charisma: 150,
        constitution: 70,
        dexterity: 25,
        insanity: 100,
        intelligence: 35,
        strength: 20,
        resistance: 110,
        attack: -25,
        hit_points: 40,
        defense: 100,
        magic_resistance: 170,
        CFP: 100,
        BCFA: 120,
      },
      isBetrayer: true,
      totalDamage: 10,
    };

    // Create a copy of the players array
    const initialPlayers = [...mockDividedPlayers.dravocar];

    // Mock the setter functions
    const setFactionsPlayers = {
      kaotika: jest.fn(),
      dravocar: jest.fn(),
    };

    // Act
    updatePlayerAttributes(playerToUpdate, setFactionsPlayers);


    // Assert
    expect(setFactionsPlayers.dravocar).toHaveBeenCalledWith(expect.any(Function));

    // Simulate the setter call and check the changes
    const updateFunction = setFactionsPlayers.dravocar.mock.calls[0][0];
    const updatedPlayers = updateFunction(initialPlayers);

    // Assert
    expect(updatedPlayers).toEqual(expect.arrayContaining([
      expect.objectContaining({
        _id: playerToUpdate._id,
        attributes: expect.objectContaining({
          charisma: 150,
          constitution: 70,
        }),
      }),
    ]));
  });
});
