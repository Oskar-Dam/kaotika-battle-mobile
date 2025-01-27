import { Potion } from "../interfaces/Potion";

interface PotionCardProps {
  potion: Potion;
}

const PotionCard: React.FC<PotionCardProps> = ({
  potion
}) => {
  return (
    <>
      <div
        className="w-auto flex flex-col break-normal items-center justify-center"
      >
        <img
          src={"public/images/" + potion.image}
          alt={potion.name}
          className="w-[90%] h-auto mb-2 object-contain rounded-lg"
        />
        <strong className="text-black text-center text-[80%] font-semibold px-2 max-w-[100%] break-word">
          {potion.name}
        </strong>
      </div>
    </>
  );
};

export default PotionCard;
