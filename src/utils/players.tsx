import { Modifier } from '../interfaces/Modifier';
import { Player } from '../interfaces/Player';
import { FactionsSetters } from '../interfaces/FactionsSetters';

export const updatePlayerAttributes = (updatedPlayer: { _id: string, attributes: Modifier, totalDamage: number, isBetrayer: boolean }, factionsSetters: FactionsSetters): void => {

  console.log('Executing updatePlayerAttributes()');
  console.log('Updating player with id: ', updatedPlayer._id);

  const factionSetter = updatedPlayer.isBetrayer ? factionsSetters['dravocar'] : factionsSetters['kaotika'];

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
    playersArray.splice(playerIndex, 1);
    return playersArray;
  }
  return null;
};

export const removeSelectedPlayerFromTeams = (kaotikaPlayers: Player[], dravocarPlayers: Player[], setKaotikaPlayers: React.Dispatch<React.SetStateAction<Player[]>>, setDravocarPlayers: React.Dispatch<React.SetStateAction<Player[]>>, playerId: string) => {
  //Removes player given either from Kaotika array or Dravocar
  const newKaotikaPlayers: Player[] | null = removePlayerFromArrayIfIdMatches(kaotikaPlayers, playerId);
  if (newKaotikaPlayers) {
    setKaotikaPlayers(newKaotikaPlayers);
  } else {
    const newDravocarPlayers: Player[] | null = removePlayerFromArrayIfIdMatches(dravocarPlayers, playerId);
    newDravocarPlayers ? setDravocarPlayers(newDravocarPlayers) : null;
  }
};

export const setUserStatusToDeadIfIdMatches = (setUserDead: React.Dispatch<React.SetStateAction<boolean>>, sessionPlayerId: string, targetId: string) => {
  sessionPlayerId === targetId ? setUserDead(true) : null;
};