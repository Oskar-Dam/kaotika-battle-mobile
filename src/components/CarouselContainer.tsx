import PlayerCarousel from "./PlayerCarousel";

interface CarouselContainerProps {
  setSelectedPlayer: (player: any) => void;
}

const CarouselContainer: React.FC<CarouselContainerProps> = ({setSelectedPlayer}) => {
  return (
    <div className="" >
      <div className="grid grid-cols-2 text-center">
        <p>L0UAR</p>
        <p>BETREYR</p>
      </div>
      <PlayerCarousel setSelectedPlayer={setSelectedPlayer} />
    </div>
  );
};

export default CarouselContainer;
