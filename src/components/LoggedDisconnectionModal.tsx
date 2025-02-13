import React from 'react';
import { Player } from '../interfaces/Player';
import { DisconectionText } from '../constants/disconectionTextConstants';


interface LoggedDisconnectionModalProps {
  setPlayer: (player: Player | null) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setEmail: (email: string) => void;
  setPermanentlyDisconnected: (isDisconnected: boolean) => void;
}
const LoggedDisconnectionModal: React.FC<LoggedDisconnectionModalProps> = ({ setPlayer, setIsLoggedIn, setEmail, setPermanentlyDisconnected }) => {
  const disconectionText = DisconectionText;
  const handleReconnect = () => {
    setPlayer(null);
    setIsLoggedIn(false);
    setEmail('');
    setPermanentlyDisconnected(false);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-900/100 z-50"
      data-testid="logged-disconnection-modal">
      <div className="text-center">
        <p className="text-white mb-4 text-3xl"> 
          {disconectionText[Math.floor(Math.random() * disconectionText.length)]}
        </p>
        <button
          onClick={handleReconnect}
          className="bg-blue-500 text-white px-4 py-2 rounded text-2xl">
          Return to login screen
        </button>
      </div>
    </div>
  );
};

export default LoggedDisconnectionModal;