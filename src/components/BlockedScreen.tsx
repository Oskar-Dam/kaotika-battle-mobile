import React from 'react';

const BlockedScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <h1 className="text-white text-3xl">Please wait for your turn...</h1>
    </div>
  );
};

export default BlockedScreen;
