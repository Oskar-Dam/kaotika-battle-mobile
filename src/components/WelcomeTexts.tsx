import React from 'react';

const WelcomeTexts: React.FC = () => {
  return (
    <div className='flex flex-col justify-start mt-48'>
      <div className='flex justify-center'>
        <h1 className='text-center text-5xl text-white mb-10'>Welcome, Mortimer</h1>
      </div>
      <div className='flex justify-center'>
        <h2 className='text-center text-3xl text-white'>What battle looms ahead?</h2>
      </div>
    </div>
  );
};

export default WelcomeTexts;
