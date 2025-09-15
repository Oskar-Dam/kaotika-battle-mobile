import React from 'react';
import AdventureButton from '../components/adventure/AdventureButton';

const AdventureScreen: React.FC = () => {

  const handleClick = (option:number): void => {
    console.log(option);
  };
  const content = 'Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.';
  const buttons = [
    { id: 'selectBattle', 
      component: <AdventureButton
        text='Battle'
        onClick={() => handleClick(1)}
        disabled={false}
        ariaDisabled={false}
        extraStyles=''
      /> 
    },
    { id: 'selectAdventure', 
      component: <AdventureButton
        text='Adventure'
        onClick={() => handleClick(2)}
        disabled={false}
        ariaDisabled={false}
        extraStyles=''
      /> 
    },
    { id: 'log-out', 
      component: <AdventureButton
        text='Log Out'
        onClick={() => handleClick(3)}
        disabled={false}
        ariaDisabled={false}
        extraStyles=''
      /> 
    }
  ];
  return (
    <div
      className="flex flex-col items-center h-screen p-4 bg-black text-white text-2xl font-bold w-screen"
      style={{
        backgroundColor: 'black',
        backgroundRepeat: 'no-repeat',
        backgroundPositionX: '50%',
        backgroundPositionY: '35%',
        backgroundImage: 'url(/images/acolyt-lobby-screen.webp)',
        backgroundSize: '100% 100%',
      }}
      data-testid="acolyte-lobby-screen"
    >
      <div className="flex items-center justify-center w-[80%] py-14 h-1/8 text-8xl rounded-lg">
        <h1>Adventure</h1> 
      </div>
      <div className={'w-full h-96 p-2 text-center bg-black/50 text-5xl rounded-2xl shadow-black shadow-xl border-2 text-white border-white'}>
        <p>{content}</p> 
      </div>
      <div className={'flex flex-col gap-6 w-full overflow-y-auto pr-3 z-10 mt-5 h-[50%]'}>
        {buttons.map(({ id, component }) => (
          <div
            key={id}
            className="flex items-center justify-center w-full h-[5%] min-h-[15%]">
            {component}
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default AdventureScreen;