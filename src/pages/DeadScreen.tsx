import React from 'react';
import SettingButton from '../components/SettingsButton';
import useStore from '../store/useStore';

interface DeadScreenInterface {}

const DeadScreen: React.FC<DeadScreenInterface> = () => {
  const {
    player,
  } = useStore();
  return (
    <div
      className="flex-row bg-black p-4 items-center justify-center h-screen w-screen overflow-y-hidden absolute z-4"
      style={{ backgroundColor: 'black', backgroundRepeat:'no-repeat',backgroundPositionX:'50%',backgroundPositionY:'35%' ,backgroundImage: 'url(/images/skull.webp)', backgroundSize: '85% 50%' }}
      data-testid="dead-screen"
    >
      <div
        className="w-full text-center"
        style={{ fontFamily: 'Kaotika' }}>
        <h1 className="text-5xl text-white">Kaotika</h1>
        <h1 className="text-5xl text-white">The Final Battle</h1>
      </div>
      <div className="h-[58%] w-full text-center">

      </div>
      <div className="w-full text-4xl text-white text-center">
        <h1>You've been killed.</h1>
        <h1>Wait untill the battle is over.</h1>
      </div> 
      <div className="w-full flex items-center justify-center mt-4">
        {(player.role === 'mortimer' || player.role === 'villain') && (
          <SettingButton />
        )}
      </div>
    </div>
  );

};

export default DeadScreen;
