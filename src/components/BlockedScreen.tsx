import React, { useState, useEffect } from 'react';

const BlockedScreen: React.FC = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev === '...' ? '' : prev + '.'));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="absolute top-0 left-0 w-[100%] h-[100%] flex items-center justify-center z-1"
      style={{ backgroundImage: 'url(/images/blocked-chains.png)', backgroundSize: '120% 100%', backgroundPosition: '45% 0%', opacity: 1 }}>
      <h1 className="text-white text-4xl" style={{ fontFamily: 'Kaotika' }}>
        Please wait for your turn<span style={{ visibility: 'hidden' }}>...</span>
        <span style={{ position: 'absolute', marginLeft: '-0.85rem' }}>{dots}</span>
      </h1>
    </div>
  );
};

export default BlockedScreen;
