import React from 'react';
import useStore from '../../store/useStore';

const ReturnToModeSelectionScreenButton: React.FC = () => {

  const { setIsBattleSelected, setIsAdventureSelected } = useStore();

  const selectBattleMode = () => {
    setIsBattleSelected(false);
    setIsAdventureSelected(false);
    console.log('Return to the mode selection screen');
  };

  return (
    <button
      onClick={() => { 
        selectBattleMode(); 
      }}
      className="w-full h-full bg-black/50 text-white text-4xl rounded-4xl shadow-black shadow-xl border-2 border-white"
    >
      Back To Mode Selection
    </button>
  );
};

export default ReturnToModeSelectionScreenButton;