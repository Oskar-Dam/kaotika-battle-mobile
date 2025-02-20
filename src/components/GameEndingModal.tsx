import React, { useEffect, useState } from 'react';
import useStore from '../store/useStore';
import SettingButton from './SettingsButton';

interface GameEndingModalProps {
  winner: string;
}

const GameEndingModal: React.FC<GameEndingModalProps> = ({ winner }) => {

  const [winnerSide] = useState<string>(winner);
  const [resultTextColor, setResultTextColor] = useState<string>('text-medievalSepia');

  const {
    player
  } = useStore();

  useEffect(() => {
    console.log('Winner:', winner);
    console.log('Player:', player);

    const getResultTextColor = () => {
      if (winner === 'Draw') {
        return 'text-medievalSepia';
      }
      if (player?.isBetrayer) {
        return winner === 'Dravokar' ? 'text-green-500' : 'text-red-500';
      } else {
        return winner === 'Kaotika' ? 'text-green-500' : 'text-red-500';
      }
    };
    const color = getResultTextColor();
    console.log('Result Text Color:', color);
    setResultTextColor(color);
  }, [winner, player]);

  const imgUrl: string = (winnerSide === 'Kaotika') ? 'url(/images/kaotikaWinner.webp)' :
    (winnerSide === 'Dravokar') ? 'url(/images/dravokarWinner.webp)' :
      'url(/images/login-background.webp)';
  console.log('Image URL:', imgUrl);

  const getResultText = () => {
    if (winner === 'Draw') {
      return 'NO ONE WON THE BATTLE';
    }
    if (player?.isBetrayer) {
      return winner === 'Dravokar' ? 'YOU WIN' : 'YOU LOST';
    } else {
      return winner === 'Kaotika' ? 'YOU WIN' : 'YOU LOST';
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-51">

      <div
        className="grid grid-cols-1 grid-rows-2 flex-grow bg-black p-8 rounded shadow-lg text-center w-full h-full items-center"
        style={{ backgroundImage: imgUrl, backgroundSize: '100% 100%' }}>
        <div className='border-2  bg-darkBlue/50 rounded-lg'>
          <h2 className="text-6xl font-bold mb-4 text-medievalSepia">Game Over</h2>
          <p className={`mb-4 text-4xl ${resultTextColor}`}>{getResultText()}</p>  {/* Show result based on player status and winner */}
        </div>
        <div className='' >
          {(player.role === 'mortimer') && (
            <SettingButton />
          )}
        </div>

      </div>
    </div>
  );
};

export default GameEndingModal;
