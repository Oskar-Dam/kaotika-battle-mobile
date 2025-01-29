import { Potion } from "../interfaces/Potion";

interface PotionCardProps {
  potion: Potion;
}

const PotionCard: React.FC<PotionCardProps> = ({
  potion
}) => {
  return (
    <>
      <div className="flex items-center justify-center w-full h-full">
        <img
          src={`/images/${potion.image}`}
          alt={potion.name}
          className="w-[70%] mb-1 h-auto object-contain"
        />
      </div>
    </>
  );
};

export default PotionCard;
