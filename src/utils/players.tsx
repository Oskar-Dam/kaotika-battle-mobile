import { Modifier } from '../interfaces/Modifier';
import { Player } from '../interfaces/Player';
import { FactionsSetters } from '../interfaces/FactionsSetters';

export const updatePlayerAttributes = (updatedPlayer: {_id: string, attributes: Modifier, totalDamage: number, isBetrayer: boolean}, factionsSetters: FactionsSetters): void => {

  console.log('Executing updatePlayerAttributes()');
  console.log('Updating player with id: ', updatedPlayer._id);

  const factionSetter = updatedPlayer.isBetrayer ? factionsSetters['dravocar'] : factionsSetters['kaotika'];

  factionSetter((prevPlayers: Player[]) => 
    prevPlayers.map(player => 
      player._id === updatedPlayer._id 
        ? { ...player, attributes: updatedPlayer.attributes } 
        : player));

};
