import { Modifier } from '../interfaces/Modifier';
import { Player } from '../interfaces/Player';

interface FactionsPlayers {
  'kaotika': Player[],
  'dravocar': Player[]
}

interface FactionsSetters {
  'kaotika': (players: Player[]) => void;
  'dravocar': (players: Player[]) => void;
}


export const updatePlayerAttributes = (player: { _id: string, attributes: Modifier }, factionsData: FactionsPlayers, setFactionsPlayers: FactionsSetters): void => {

  const factions = Object.keys(factionsData) as (keyof FactionsPlayers)[];  

  factions.forEach(faction => {
    const factionPlayers = factionsData[faction];
    const playerToUpdate = factionPlayers.find(p => p._id === player._id);

    if (playerToUpdate) {
      playerToUpdate.attributes = player.attributes;
      const newFactionPlayers = factionPlayers.map(player => player._id === playerToUpdate._id ? playerToUpdate : player);
      const factionSetter = setFactionsPlayers[faction];
      factionSetter(newFactionPlayers);
    }

  });

};
