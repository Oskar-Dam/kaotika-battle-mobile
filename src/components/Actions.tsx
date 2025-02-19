import React from 'react';
import { Potion } from '../interfaces/Potion';
import useStore from '../store/useStore';
import AttackButton from './AttackButton';
import PotionContainer from './PotionContainer';
import SettingButton from './SettingsButton';

interface ActionsProps {
  openPotionModal: (potion: Potion) => void;
}

const Actions: React.FC<ActionsProps> = ({openPotionModal}) => {
  const {
    isSettingModalOpen,
  } = useStore();

  return (
    <div className="flex flex-col items-center justify-center w-full h-[49%] border-0 border-yellow-400">
      <AttackButton/>
      { !isSettingModalOpen && (
        <div className='w-full flex items-center place-self-center justify-center mt-[5%]'>
          <SettingButton />
        </div>
      )};
      
      {/* )}       */}
      <div className='w-full flex items-center justify-center m-[10%]'>
        <PotionContainer
          onClick={openPotionModal}
        />
      </div>
    </div>
  );
};

export default Actions;
