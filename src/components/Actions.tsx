import React from 'react';
import { Potion } from '../interfaces/Potion';
import useStore from '../store/useStore';
import AttackButton from './AttackButton';
import PotionContainer from './PotionContainer';
import SettingButton from './SettingsButton';

interface ActionsProps {
  openPotionModal: (potion: Potion) => void;
  showSettingsButton: boolean;
}

const Actions: React.FC<ActionsProps> = ({openPotionModal, showSettingsButton}) => {
  const {
    isSettingModalOpen,
    player,
  } = useStore();

  return (
    <div className="flex flex-col items-center justify-center w-full h-[49%] border-0 border-yellow-400">


      <AttackButton/>

      
      {(player.role === 'mortimer' || player.role === 'villain') && showSettingsButton && !isSettingModalOpen && (
        <SettingButton />
      )}
        
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
