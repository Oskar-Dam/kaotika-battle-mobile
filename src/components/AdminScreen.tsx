import React from 'react';
import BattleList from './BattleList';
import WelcomeTexts from './WelcomeTexts';
import JoinButton from './JoinButton';

const AdminScreen: React.FC = () => {

  return (
    <div
      className='flex h-screen w-screen'
      style={{backgroundImage: 'url(/images/background/adminScreenBG.webp)', backgroundSize: '100% 100%'}}>

      <div className='flex flex-col justify-start items-center h-full w-full'>
        <div className='flex h-[20%] bg-yellow-400 mb-5'>
          <WelcomeTexts/>
        </div>
        <div className='flex h-[60%] w-[95%] mb-5'>
          <BattleList/>
        </div>
        <div className='flex h-[10%] w-[80%]'>
          <JoinButton/>
        </div>
      </div>
    </div>
  );
};

export default AdminScreen;
