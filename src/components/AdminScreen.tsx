import React from 'react';
import BattleList from './BattleList';
import WelcomeTexts from './WelcomeTexts';

const AdminScreen: React.FC = () => {

  return (
    <div className='flex h-screen w-screen'>

      <div className='flex flex-col justify-start items-center h-full w-full '>
        <div className='text-black'>HELLO</div>
        <WelcomeTexts/>
        <BattleList />
      </div>
    </div>
  );
};

export default AdminScreen;
