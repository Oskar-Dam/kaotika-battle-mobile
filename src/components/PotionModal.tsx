import React from 'react';
import { Potion } from '../interfaces/Potion';

interface PotionModalProps {
  potion: Potion
  closeModal: () => void;
}

const PotionModal: React.FC<PotionModalProps> = ({
  potion,
  closeModal
}) => {
  return (
    <div className="w-full rounded-3xl fixed inset-0 z-50 flex items-end justify-center pb-[15%]">
      <div className="w-[75%] h-[35%] rounded-3xl z-50 flex flex-col items-center justify-center bg-black/90 relative border-2 border-white">
        <div className="absolute top-2 right-2">
          <button
            onClick={closeModal}
            className="text-black rounded-full text-xl font-bold bg-white/70 px-3 py-1 hover:text-zinc-800/80"
            aria-label="Close modal"
          >
            X
          </button>
        </div>
        <h1 className="text-white text-2xl font-bold my-[2%]">{potion.name}</h1>
        <h2 className="text-white text-xl capitalize my-[1%]">Type: {potion.type}</h2>
        <h2 className="text-white text-xl capitalize my-[2%]">Effect: {potion.effects.primary.attribute}</h2>

        <button className="mt-4 w-[60%] animate-saturation-blue">
          <img src="/images/ATTACK_BUTTON.png" alt="Attack Button" />
        </button>
      </div>
    </div>
  );
};

export default PotionModal;