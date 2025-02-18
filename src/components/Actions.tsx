import React from 'react';
import AttackButton from './AttackButton';
import EndGameButton from './EndGameButton';
import PotionContainer from './PotionContainer';
import useStore from '../store/useStore';
import { Potion } from '../interfaces/Potion';

interface ActionsProps {
  openModal: (potion: Potion) => void;
}

const Actions: React.FC<ActionsProps> = ({openModal}) => {
  const {
    player,
  } = useStore();

  const classNameEndGameButton = 'p-16 z-75';

  return (
    <div className="flex flex-col items-center justify-center w-full h-[49%] border-0 border-yellow-400">
      <AttackButton/>
      {(player?.role === 'mortimer') && (
        <div className='w-full flex items-center place-self-center justify-center mt-[10%]'>
          <EndGameButton classNameCss={classNameEndGameButton} />
        </div>
      )}      
      <div className='w-full flex items-center justify-center m-[10%]'>
        <PotionContainer
          onClick={openModal}
        />
      </div>
    </div>
  );
};

export default Actions;
