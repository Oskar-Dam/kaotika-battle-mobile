import React from 'react';

interface MainFrameProps {
  frameBackground: string;
}

const MainFrame: React.FC<MainFrameProps> = ({frameBackground}) => {

  return(
    <div
      className='w-screen h-screen flex flex-col items-center justify-center top-0 z-20'
      style={{ backgroundImage: frameBackground, backgroundSize: '100% 100%' }}
      data-testid="battle-screen"
    />
  );
};

export default MainFrame;