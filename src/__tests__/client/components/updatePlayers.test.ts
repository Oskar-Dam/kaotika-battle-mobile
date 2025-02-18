import useStore from '../../../store/useStore';
import { mockDividedPlayers } from '../../../__mocks__/mockPlayers';
import { dravokarPlayerToUpdate, kaotikaPlayerToUpdate } from '../../../__mocks__/mockPlayersToUpdate';

beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {}); // Silenciar logs
  jest.spyOn(console, 'error').mockImplementation(() => {}); // Silenciar errores
  jest.spyOn(console, 'warn').mockImplementation(() => {}); // Silenciar warnings
});

beforeEach(() => {
  useStore.setState({
    dravokarPlayers: [...mockDividedPlayers.dravokar],
    kaotikaPlayers: [...mockDividedPlayers.kaotika],
  });
});

describe('updatePlayerAttributes with Zustand', () => {
  it('should update the DRAVOKAR faction if player is a betrayer', () => {
    const playerToUpdate = dravokarPlayerToUpdate;

    useStore.getState().updateDravokarPlayerHitPoints(playerToUpdate._id, 150);

    const { dravokarPlayers, kaotikaPlayers } = useStore.getState();
    const updatedPlayer = dravokarPlayers.find(p => p._id === playerToUpdate._id);

    expect(updatedPlayer).toBeDefined();
    expect(updatedPlayer?.attributes.hit_points).toBe(150);
    expect(kaotikaPlayers).toEqual(mockDividedPlayers.kaotika);
  });

  it('should update the KAOTIKA faction if player is not a betrayer', () => {
    const playerToUpdate = kaotikaPlayerToUpdate;

    useStore.getState().updateKaotikaPlayerHitPoints(playerToUpdate._id, 150);

    const { kaotikaPlayers, dravokarPlayers } = useStore.getState();
    const updatedPlayer = kaotikaPlayers.find(p => p._id === playerToUpdate._id);

    expect(updatedPlayer).toBeDefined();
    expect(updatedPlayer?.attributes.hit_points).toBe(150);
    expect(dravokarPlayers).toEqual(mockDividedPlayers.dravokar);
  });

  it('should update the player attributes correctly in the KAOTIKA faction', () => {
    const playerToUpdate = kaotikaPlayerToUpdate;

    // Act
    useStore.getState().updateKaotikaPlayerHitPoints(playerToUpdate._id, 150);

    const { kaotikaPlayers } = useStore.getState();
    const updatedPlayer = kaotikaPlayers.find(p => p._id === playerToUpdate._id);

    expect(updatedPlayer).toBeDefined();
    expect(updatedPlayer?.attributes.hit_points).toBe(150);
    expect(updatedPlayer?.attributes.charisma).toBe(99);
    expect(updatedPlayer?.attributes.constitution).toBe(53);
  });

  it('should update the player attributes correctly in the DRAVOKAR faction', () => {
    const playerToUpdate = dravokarPlayerToUpdate;

    useStore.getState().updateDravokarPlayerHitPoints(playerToUpdate._id, 150);

    const { dravokarPlayers } = useStore.getState();
    const updatedPlayer = dravokarPlayers.find(p => p._id === playerToUpdate._id);

    expect(updatedPlayer).toBeDefined();
    expect(updatedPlayer?.attributes.hit_points).toBe(150);
    expect(updatedPlayer?.attributes.charisma).toBe(130);
    expect(updatedPlayer?.attributes.constitution).toBe(60);
  });

});
