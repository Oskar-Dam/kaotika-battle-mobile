import React from 'react';
import useStore from '../store/useStore';

const SettingButton: React.FC = () => {

  const {
    setIsSettingModalOpen,
  } = useStore();

  const handleOnClick = () => {    
    setIsSettingModalOpen(true);
  };

  return (
    <button
      className={'relative font-bold min-w-[90%] max-w-[90%] min-h-[20%] max-h-[20%] bg-black/50 text-white text-4xl rounded-4xl shadow-black shadow-xl border-2 border-white'}
      onClick={handleOnClick}
      data-testid="setting-button"
    >
      SETTINGS
    </button>
  );
};

export default SettingButton;
