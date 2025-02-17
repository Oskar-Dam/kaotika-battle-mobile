import React, { useEffect, useState } from 'react';
import EndGameButton from './EndGameButton';

interface BlockedScreenInterface {
  role: string;
}


const BlockedScreen: React.FC<BlockedScreenInterface> = ({role}) => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev === '...' ? '' : prev + '.'));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const classNameEndGameButton = 'p-16 z-75';

  return (
    <div
      className="absolute top-0 left-0 w-[100%] h-[100%] z-1"
      data-testid="blocked-modal">
      <div
        className="absolute top-0 left-0 w-[100%] h-[100%]"
        style={{
          backgroundColor: 'black',
          opacity: 0.8
        }}>
      </div>
      <div
        className="absolute top-0 left-0 w-[100%] h-[100%]"
        style={{
          backgroundImage: 'url(/images/blocked-chains-no-bg.webp)',
          backgroundSize: '120% 100%', backgroundPosition: '45% 0%',
          opacity: 1,
          filter: 'brightness(80%)'
        }}></div>
      <div className="absolute top-[0%] left-0 w-[100%] h-[100%] flex items-start justify-center pt-10">
        <h1
          className="text-white text-4xl top-[7%] absolute"
          style={{ fontFamily: 'Kaotika' }}>
          Waiting for your turn<span style={{ visibility: 'hidden' }}>...</span>
          <span style={{ position: 'absolute', marginLeft: '-0.85rem' }}>{dots}</span>
        </h1>
      </div>
      { role === 'mortimer' && (
        <div className='absolute top-[75%] w-full flex items-start justify-center z-151'>
          <EndGameButton classNameCss={classNameEndGameButton}/>
        </div>
      )}      
    </div>
  );
};

export default BlockedScreen;
