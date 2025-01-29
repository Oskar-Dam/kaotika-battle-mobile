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
    <div className="absolute top-0 left-0 w-[100%] h-[100%] bg-black bg-opacity-20 flex items-center justify-center z-1">
      <h1 className="text-white text-4xl" style={{ fontFamily: 'Kaotika' }}>
        Please wait for your turn<span style={{ visibility: 'hidden' }}>...</span>
        <span style={{ position: 'absolute', marginLeft: '-0.85rem' }}>{dots}</span>
      </h1>
    </div>
  );
};

export default BlockedScreen;
