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
      className={'relative p-10 text-2xl font-bold text-gray-100 brightness-70'}
      style={{
        backgroundImage: 'url(/images/settings-icon.webp)',
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
