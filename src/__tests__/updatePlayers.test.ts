import { updatePlayerAttributes } from '../utils/players';
import { mockDividedPlayers } from '../__mocks__/mockPlayers';

describe('updatePlayerAttributes', () => {

  it('should call dravocar function if player is a betrayer', () => {
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

    const setFactionsPlayers = {
      kaotika: jest.fn(),
      dravocar: jest.fn(),
    };

    // Act
    updatePlayerAttributes(playerToUpdate, setFactionsPlayers);

    // Assert
    expect(setFactionsPlayers.dravocar).toHaveBeenCalled();
    expect(setFactionsPlayers.kaotika).not.toHaveBeenCalled();
  });

  it('should call kaotika function if player is not a betrayer', () => {
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
      isBetrayer: false,
      totalDamage: 10,
    };

    const setFactionsPlayers = {
      kaotika: jest.fn(),
      dravocar: jest.fn(),
    };

    // Act
    updatePlayerAttributes(playerToUpdate, setFactionsPlayers);

    // Assert
    expect(setFactionsPlayers.kaotika).toHaveBeenCalled();
    expect(setFactionsPlayers.dravocar).not.toHaveBeenCalled();
  });

  it('should update the player attributes correctly in the KAOTIKA faction', () => {
    // Arrange
    const playerToUpdate = {
      _id: '66dec6ab4c27dff822d80066',
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
      isBetrayer: false,
      totalDamage: 10,
    };

    // Create a copy of the players array
    const initialPlayers = [...mockDividedPlayers.kaotika];

    // Mock the setter functions
    const setFactionsPlayers = {
      kaotika: jest.fn(),
      dravocar: jest.fn(),
    };

    // Act
    updatePlayerAttributes(playerToUpdate, setFactionsPlayers);

    // Assert
    expect(setFactionsPlayers.kaotika).toHaveBeenCalledWith(expect.any(Function));

    // Simulate the setter call and check the changes
    const updateFunction = setFactionsPlayers.kaotika.mock.calls[0][0];
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

  it('should update the player attributes correctly in the DRAVOKAR faction', () => {
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
