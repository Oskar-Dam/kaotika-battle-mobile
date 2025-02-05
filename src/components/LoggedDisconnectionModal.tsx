import React from 'react';
import { Player } from '../interfaces/Player';


interface LoggedDisconnectionModalProps {
  setPlayer: (player: Player | null) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setEmail: (email: string) => void;
}
const LoggedDisconnectionModal: React.FC<LoggedDisconnectionModalProps> = ({setPlayer, setIsLoggedIn, setEmail}) => {

  const handleReconnect = () => {
    setPlayer(null);
    setIsLoggedIn(false);
    setEmail('');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900/80 z-50">
      <div className="text-center">
        <p className="text-white mb-4">You have been disconnected from the battle</p>
        <button
          onClick={handleReconnect}
          className="bg-blue-500 text-white px-4 py-2 rounded">
          Return to login screen
        </button>
      </div>
    </div>
  );
};

export default LoggedDisconnectionModal;