import { Modifier } from '../interfaces/Modifier';
import { Player } from '../interfaces/Player';
import { FactionsSetters } from '../interfaces/FactionsSetters';

export const updatePlayerAttributes = (updatedPlayer: { _id: string, attributes: Modifier, totalDamage: number, isBetrayer: boolean }, factionsSetters: FactionsSetters): void => {

  console.log('Executing updatePlayerAttributes()');
  console.log('Updating player with id: ', updatedPlayer._id);

  const factionSetter = updatedPlayer.isBetrayer ? factionsSetters['dravokar'] : factionsSetters['kaotika'];

  factionSetter((prevPlayers: Player[]) =>
    prevPlayers.map(player =>
      player._id === updatedPlayer._id
        ? { ...player, attributes: updatedPlayer.attributes }
        : player));
};

export const updateSessionPlayerAttributesIfIdMatches = (updatedPlayer: { _id: string, attributes: Modifier, totalDamage: number, isBetrayer: boolean }, setPlayer: React.Dispatch<React.SetStateAction<Player | null>>, sessionPlayer: Player): void => {
  if (updatedPlayer._id === sessionPlayer._id) {
    setPlayer({ ...sessionPlayer, attributes: updatedPlayer.attributes });
  }
};

export const removePlayerFromArrayIfIdMatches = (playersArray: Player[], playerId: string): Player[] | null => {
  const playerIndex: number = playersArray.findIndex(player => player._id === playerId);
  if (playerIndex !== -1) {
    console.log('Player removed: ', playersArray[playerIndex].nickname);
    return [...playersArray.slice(0, playerIndex), ...playersArray.slice(playerIndex + 1)];
  }
  return null;
};

export const removeSelectedPlayerFromTeams = (kaotikaPlayers: Player[], dravokarPlayers: Player[], setKaotikaPlayers: React.Dispatch<React.SetStateAction<Player[]>>, setDravokarPlayers: React.Dispatch<React.SetStateAction<Player[]>>, playerId: string) => {
  //Removes player given either from Kaotika array or Dravokar
  console.log('Removing player with id: ', playerId);
  const newKaotikaPlayers: Player[] | null = removePlayerFromArrayIfIdMatches(kaotikaPlayers, playerId);
  if (newKaotikaPlayers) {
    setKaotikaPlayers(newKaotikaPlayers);
  } else {
    const newDravokarPlayers: Player[] | null = removePlayerFromArrayIfIdMatches(dravokarPlayers, playerId);
    newDravokarPlayers ? setDravokarPlayers(newDravokarPlayers) : null;
  }
};

export const setUserStatusToDeadIfIdMatches = (setUserDead: React.Dispatch<React.SetStateAction<boolean>>, sessionPlayerId: string, targetId: string) => {
  sessionPlayerId === targetId ? setUserDead(true) : null;
};