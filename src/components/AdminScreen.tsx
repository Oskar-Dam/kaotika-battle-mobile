import React from 'react';
import BattleCard from './BattleCard';

const AdminScreen: React.FC = () => {

  return (
    <div className='flex flex-col h-screen w-screen bg-blue-500'>
      <div className='flex flex-col justify-center items-center h-full w-[100%] bg-orange-500'>
        <BattleCard />
        <BattleCard />
        <BattleCard />
        <BattleCard />
        <BattleCard />
      </div>

      {/* <div className='flex flex-col justify-center h-1/4 '>
        <WelcomeTexts />
      </div>
      <div className='flex flex-col justify-center h-1/2 '>
        <div className='flex justify-center h-1/2 items-center'>
          <BattleTypeDropdown
            selection={selection}
            setSelection={setSelection} />
        </div>
        <div className='flex justify-center h-1/2 items-center'>
          {selection === 'ENCOUNTER' && (
            <EncounterDropdown />
          )}
        </div>
      </div>
      <div className='flex justify-center h-1/4 items-center'>
        <GameStartButton
          selection={selection}
          onClick={handleStartGame}/> 
      </div> */}
    </div>
  );
};

export default AdminScreen;
