import PlayerCarousel from './PlayerCarousel';
import CarouselFilterButton from './CarouselFilterButton';
import { Factions } from '../interfaces/Factions';
import { useEffect, useState } from 'react';
import { Player } from '../interfaces/Player';

interface CarouselContainerProps {
  filteredFaction: Factions | undefined;
  setFilteredFaction: (filteredFaction: Factions | undefined) => void;
  setSelectedPlayer: (player: Player) => void;
  kaotikaPlayers: Player[];
  dravocarPlayers: Player[];
  selectedPlayer: Player;
  player: Player;
}

const CarouselContainer: React.FC<CarouselContainerProps> = ({
  isBetrayer,
  filteredFaction,
  setFilteredFaction,
  setSelectedPlayer,
  kaotikaPlayers,
  dravocarPlayers,
  selectedPlayer,
  player
}) => {

  const [displayedPlayers, setDisplayedPlayers] = useState<Player[]>([]);

  useEffect(() => {

    let newDisplayedPlayers;

    if (filteredFaction === 'KAOTIKA') {
      newDisplayedPlayers = [...kaotikaPlayers];
    } else if (filteredFaction === 'DRAVOCAR') {
      newDisplayedPlayers = [...dravocarPlayers];
    } else {
      newDisplayedPlayers = isBetrayer ? [...dravocarPlayers, ...kaotikaPlayers] : [...kaotikaPlayers, ...dravocarPlayers];
    }

    setDisplayedPlayers(newDisplayedPlayers);

  }, [filteredFaction, kaotikaPlayers, dravocarPlayers]);


  const handleFactionSelection = (pressedFaction: Factions) => {
    const newFilteredFaction = filteredFaction === pressedFaction ? undefined : pressedFaction;
    setFilteredFaction(newFilteredFaction);
  };

  return (
    
    <div className="mt-[8%]">

      {/* FILTER */}
      <div className="justify-items-center grid grid-cols-2 relative">
       
        <CarouselFilterButton 
          faction="KAOTIKA"
          selected={filteredFaction==='KAOTIKA'}
          onClick={() => handleFactionSelection('KAOTIKA')}
        />

        <CarouselFilterButton
          faction="DRAVOCAR"
          selected={filteredFaction==='DRAVOCAR'}
          onClick={() => handleFactionSelection('DRAVOCAR')}
        />

      </div>

      {/* PLAYER SELECTION CAROUSEL */}
      <PlayerCarousel 
        setSelectedPlayer={setSelectedPlayer}
        displayedPlayers={displayedPlayers}
        selectedPlayer={selectedPlayer}
      />

    </div>
  );
};

export default CarouselContainer;
