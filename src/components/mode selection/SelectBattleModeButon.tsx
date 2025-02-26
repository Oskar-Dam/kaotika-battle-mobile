import React from 'react';
import useStore from '../../store/useStore';

const SelecteBattleModeButton: React.FC = () => {

  const { setIsBattleSelected } = useStore();

  const selectBattleMode = () => {
    setIsBattleSelected(true);
    console.log('Battle mode selected');
    
  };

  return (
    <button
      onClick={() => { 
        selectBattleMode(); 
      }}
      className="z-1 w-full h-[50%] bg-black/50 text-white text-5xl rounded-4xl shadow-black shadow-xl border-2 border-white"
    >
      Battle
    </button>
  );
};

export default SelecteBattleModeButton;