import PlayerCarousel from "./PlayerCarousel";
import CarouselFilterButton from "./CarouselFilterButton";
import { Factions } from "../interfaces/Factions";

interface CarouselContainerProps {
  filteredFaction: Factions | undefined;
  setFilteredFaction: (filteredFaction: Factions | undefined) => void;
  setSelectedPlayer: (player: any) => void;
}

const CarouselContainer: React.FC<CarouselContainerProps> = ({
  filteredFaction,
  setFilteredFaction,
  setSelectedPlayer
}) => {

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
      <PlayerCarousel setSelectedPlayer={setSelectedPlayer} />

    </div>
  );
};

export default CarouselContainer;
