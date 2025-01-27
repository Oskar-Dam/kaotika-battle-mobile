import React from 'react';
import AttackButton from "./AttackButton";
import PotionContainer from "./PotionContainer";
import { Potion } from "../interfaces/Potion";

interface ActionsProps {
  potions: Potion[];
  openModal: () => void;
}

const Actions: React.FC<ActionsProps> = ({ potions, openModal }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[49%] border-4 border-black">
      <AttackButton
        text={'Attack'}
        onClick={openModal}
      />
      <div className='w-full flex items-center justify-center m-[10%]'>
        <PotionContainer
          potions={potions}
        />
      </div>
    </div>
  );
};

export default Actions;
