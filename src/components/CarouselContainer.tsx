import PlayerCarousel from "./PlayerCarousel";

interface CarouselContainerProps {

}

const CarouselContainer: React.FC<CarouselContainerProps> = () => {
  return (
    // <div className="relative flex justify-center h-[60%] opacity-50 border-0 border-blue-500 bg-amber-200 w-[80vw]" >
      
      <PlayerCarousel />
    // </div>
  );
};

export default CarouselContainer;
