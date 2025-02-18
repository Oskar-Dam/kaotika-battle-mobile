import React from 'react';
import PlayerCarousel from './PlayerCarousel';
import CarouselFilterButton from './CarouselFilterButton';
import { Factions } from '../interfaces/Factions';
import { useEffect, useState } from 'react';
import { Player } from '../interfaces/Player';
import useStore from '../store/useStore';

interface CarouselContainerProps {
  filteredFaction: Factions | undefined;
  setFilteredFaction: (filteredFaction: Factions | undefined) => void;
  setSelectedPlayer: (player: Player) => void;
  selectedPlayerIndex: number;
  setSelectedPlayerIndex: (index: number) => void;
  isMyTurn: boolean;
}

const CarouselContainer: React.FC<CarouselContainerProps> = ({
  filteredFaction,
  setFilteredFaction,
  setSelectedPlayer,
  selectedPlayerIndex,
  setSelectedPlayerIndex,
  isMyTurn
}) => {

  const [displayedPlayers, setDisplayedPlayers] = useState<Player[]>([]);
  const {kaotikaPlayers, dravokarPlayers, player} = useStore()
  useEffect(() => {

    let newDisplayedPlayers;

    if (filteredFaction === 'KAOTIKA') {
      newDisplayedPlayers = [...kaotikaPlayers];
    } else if (filteredFaction === 'DRAVOKAR') {
      newDisplayedPlayers = [...dravokarPlayers];
    } else {
      newDisplayedPlayers = !player.isBetrayer ? [...dravokarPlayers, ...kaotikaPlayers] : [...kaotikaPlayers, ...dravokarPlayers];
    }

    newDisplayedPlayers = newDisplayedPlayers.filter(p => p._id !== player._id);
    newDisplayedPlayers = newDisplayedPlayers.filter((player) => player.isAlive);
    setDisplayedPlayers(newDisplayedPlayers);

  }, [filteredFaction, kaotikaPlayers, dravokarPlayers]);

  useEffect(() => {
    if (isMyTurn && displayedPlayers.length > 0) {
      console.log('Setting selected player: ', displayedPlayers[0].nickname);
      setSelectedPlayer(displayedPlayers[0]);
    }
  },[displayedPlayers]);

  useEffect(() => {
    if (player && isMyTurn) {
      const faction = player.isBetrayer ? 'KAOTIKA' : 'DRAVOKAR';
      console.log('Changing faction to: ', faction);
      handleFactionSelection(faction);
    }
  }, [isMyTurn]);

  const handleFactionSelection = (pressedFaction: Factions) => {
    const newFilteredFaction = filteredFaction === pressedFaction ? undefined : pressedFaction;
    setFilteredFaction(newFilteredFaction);
  };

  return (
    
    <div
      className="mt-[8%]"
      data-testid="carousel-container">

      {/* FILTER */}
      <div className="justify-items-center grid grid-cols-2 relative">
       
        <CarouselFilterButton 
          faction="KAOTIKA"
          selected={filteredFaction==='KAOTIKA'}
          onClick={() => handleFactionSelection('KAOTIKA')}
        />

        <CarouselFilterButton
          faction="DRAVOKAR"
          selected={filteredFaction==='DRAVOKAR'}
          onClick={() => handleFactionSelection('DRAVOKAR')}
        />

      </div>

      {/* PLAYER SELECTION CAROUSEL */}
      <PlayerCarousel 
        setSelectedPlayer={setSelectedPlayer}
        displayedPlayers={displayedPlayers}
        selectedPlayerIndex={selectedPlayerIndex}
        setSelectedPlayerIndex={setSelectedPlayerIndex}
      />

    </div>
  );
};

export default CarouselContainer;
