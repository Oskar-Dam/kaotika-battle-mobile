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
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <h1 className="text-white text-4xl" style={{ fontFamily: 'Kaotika' }}>
        Please wait for your turn<span style={{ visibility: 'hidden' }}>...</span>
        <span style={{ position: 'absolute', marginLeft: '-0.8rem' }}>{dots}</span>
      </h1>
    </div>
  );
};

export default BlockedScreen;
