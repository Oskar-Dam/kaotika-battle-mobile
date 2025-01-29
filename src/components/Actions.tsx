import React from 'react';
import AttackButton from "./AttackButton";
import PotionContainer from "./PotionContainer";
import { Potion } from "../interfaces/Potion";

interface ActionsProps {
  potions: Potion[];
  openModal: (potion: Potion) => void
  isMyTurn: boolean
}

const Actions: React.FC<ActionsProps> = ({ potions, openModal, isMyTurn }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[49%] border-0 border-yellow-400">
      <AttackButton
        text={'Attack'}
        onClick={() => console.log("Attack button clicked")}
        isMyTurn={isMyTurn}
      />
      <div className='w-full flex items-center justify-center m-[10%]'>
        <PotionContainer
          potions={potions}
          onClick={openModal}
        />
      </div>
    </div>
  );
};

export default Actions;
