import React from 'react';

interface DeadScreenInterface {
}

const DeadScreen: React.FC<DeadScreenInterface> = () => {
  return (
    <div
      className="flex-row bg-black p-4 items-center justify-center h-screen w-screen overflow-y-hidden"
      style={{ backgroundColor: 'black', backgroundRepeat:'no-repeat',backgroundPositionX:'50%',backgroundPositionY:'35%' ,backgroundImage: 'url(/images/skull.webp)', backgroundSize: '85% 50%' }}>
      <div
        className="w-full text-center"
        style={{ fontFamily: 'Kaotika' }}>
        <h1 className="text-5xl text-white">Kaotika</h1>
        <h1 className="text-5xl text-white">The Final Battle</h1>
      </div>
      <div className="h-[65%] w-full text-center">

      </div>
      <div className="w-full text-4xl text-white text-center">
        <h1>You've were killed.</h1>
        <h1>Wait untill the battle is over.</h1>
      </div>
    </div>
  );

};

export default DeadScreen;
