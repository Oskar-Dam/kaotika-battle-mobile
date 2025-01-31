import PlayerCarousel from "./PlayerCarousel";
import CarouselFilterButton from "./CarouselFilterButton";
import { Factions } from "../interfaces/Factions";
import PlayerInterface from "../interfaces/PlayerInterface";
import { useEffect, useState } from "react";

interface CarouselContainerProps {
  filteredFaction: Factions | undefined;
  setFilteredFaction: (filteredFaction: Factions | undefined) => void;
  setSelectedPlayer: (player: any) => void;
  kaotikaPlayers: PlayerInterface[];
  dravocarPlayers: PlayerInterface[];
}

const CarouselContainer: React.FC<CarouselContainerProps> = ({
  filteredFaction,
  setFilteredFaction,
  setSelectedPlayer,
  kaotikaPlayers,
  dravocarPlayers,
}) => {

  const [displayedPlayers, setDisplayedPlayers] = useState<PlayerInterface[]>([]);

  useEffect(() => {

    let newDisplayedPlayers;

    if (filteredFaction === "KAOTIKA") {
      newDisplayedPlayers = [...kaotikaPlayers];
    } else if (filteredFaction === "DRAVOCAR") {
      newDisplayedPlayers = [...dravocarPlayers];
    } else {
      newDisplayedPlayers = [...kaotikaPlayers, ...dravocarPlayers];
    }

    setDisplayedPlayers(newDisplayedPlayers);

  }, [filteredFaction, kaotikaPlayers, dravocarPlayers]);


  const handleFactionSelection = (pressedFaction: Factions) => {
    const newFilteredFaction = filteredFaction === pressedFaction ? undefined : pressedFaction;
    setFilteredFaction(newFilteredFaction);
  }

  return (
    
    <div className="mt-[8%]">

      {/* FILTER */}
      <div className="justify-items-center grid grid-cols-2 relative">
       
        <CarouselFilterButton 
          faction="KAOTIKA"
          selected={filteredFaction==="KAOTIKA"}
          onClick={() => handleFactionSelection("KAOTIKA")}
        />

        <CarouselFilterButton
          faction="DRAVOCAR"
          selected={filteredFaction==="DRAVOCAR"}
          onClick={() => handleFactionSelection("DRAVOCAR")}
        />

      </div>

      {/* PLAYER SELECTION CAROUSEL */}
      <PlayerCarousel 
        setSelectedPlayer={setSelectedPlayer}
        displayedPlayers={displayedPlayers}
      />

    </div>
  );
};

export default CarouselContainer;
