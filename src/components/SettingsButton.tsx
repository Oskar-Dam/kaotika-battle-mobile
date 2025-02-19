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
      className={'relative px-28 py-8 text-2xl font-bold text-gray-100 z-55'}
      style={{
        backgroundImage: 'url(/images/settings-button.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      onClick={handleOnClick}
      data-testid="setting-button"
    >
    </button>
  );
};

export default SettingButton;
