import React from 'react';

const SelectAdventureMode: React.FC = () => {

  return (
    <button
      onClick={() => { 
        console.log('Adventure mode Coming Soon');
      }}
      className="w-full h-full bg-black/50 text-white text-4xl rounded-4xl shadow-black shadow-xl border-2 border-white"
    >
      Adventure
    </button>
  );
};

export default SelectAdventureMode;