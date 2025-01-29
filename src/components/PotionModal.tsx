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
    <div className="w-full rounded-3xl fixed inset-0 z-50 flex items-center justify-center">
      <div className="w-[90%] h-[40%] rounded-3xl inset-0 z-50 flex flex-col items-center justify-center bg-black/90 ">
        <div className="w-full flex justify-end p-4">
          <button
            onClick={closeModal}
            className="text-black rounded-full text-xl font-bold bg-white/70 px-3 py-1 hover:text-zinc-800/80"
          >
            X
          </button>
        </div>
        <h1 className="text-white text-2xl font-bold">{potion.name}</h1>
      </div>
    </div>
  );
};

export default PotionModal;