import React, { useEffect } from 'react';
import { Player } from '../interfaces/Player';

interface GameEndingModalProps {
  setPlayer: (player: Player | null) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setEmail: (email: string) => void;
  winner: string;
}

const GameEndingModal: React.FC<GameEndingModalProps> = ({ setPlayer, setIsLoggedIn, setEmail, winner }) => {
  useEffect(() => {
    setPlayer(null);
    setIsLoggedIn(false);
    setEmail('');
  }, [setPlayer, setIsLoggedIn, setEmail]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Game Over</h2>
        <p className="mb-4">Thank you for playing!</p>
        <p className="mb-4">Winner: {winner}</p>  {/* Show who won */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => window.location.reload()}
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default GameEndingModal;
