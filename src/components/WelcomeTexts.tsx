import React from 'react';
import useStore from '../store/useStore';

const WelcomeTexts: React.FC = () => {

  const {player} = useStore();

  return (
    <div className='flex flex-col '>
      <div className='flex justify-center mb-5'>
        <h1 className='text-center text-5xl text-white capitalize'>Welcome, {player.role}</h1>
      </div>
      <div className='flex justify-center'>
        <h2 className='text-center text-3xl text-white'>What battle looms ahead?</h2>
      </div>
    </div>
  );
};

export default WelcomeTexts;
