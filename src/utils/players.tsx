import { Modifier } from '../interfaces/Modifier';
import { Player } from '../interfaces/Player';

export const updateSessionPlayerAttributesIfIdMatches = (updatedPlayer: { _id: string, attributes: Modifier, totalDamage: number, isBetrayer: boolean }, setPlayer: (players: Player) => void, sessionPlayer: Player): void => {
  if (updatedPlayer._id === sessionPlayer._id) {
    setPlayer({ ...sessionPlayer, attributes: updatedPlayer.attributes });
  }
};