import React from 'react';
import { Player } from '../interfaces/Player';

interface GameEndingModalProps {
  setPlayer: (player: Player | null) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setEmail: (email: string) => void;
  winner: string;
}

const GameEndingModal: React.FC<GameEndingModalProps> = ({ setPlayer, setIsLoggedIn, setEmail, winner }) => {

  const handleReconnect = () => {
    setPlayer(null);
    setIsLoggedIn(false);
    setEmail('');
  };

  const imgUrl: string = (winner === 'kaotika') ? 'url(/images/kaotikaWinner.webp)' :
    (winner === 'dravocar') ? 'url(/images/dravokarWinner.webp)' :
      'url(/images/login-background.webp)';

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-51">

      <div
        className="flex flex-col bg-black p-8 rounded shadow-lg justify-center text-center w-full h-full items-center"
        style={{ backgroundImage: imgUrl, backgroundSize: 'w-screen h-screen' }}>
        <h2 className="text-6xl font-bold mb-4 text-white">Game Over</h2>
        <p className="mb-4 text-4xl text-white">Winner: {winner}</p>  {/* Show who won */}
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded text-3xl"
          onClick={handleReconnect}
        >
          Go back to the Login Screen
        </button>
      </div>
    </div>
  );
};

export default GameEndingModal;
