import React from 'react';
import { DisconectionImages } from '../constants/DisconectionImagesConstants';
import { DisconectionText } from '../constants/DisconectionTextConstants';
import useStore from '../store/useStore';

interface LoggedDisconnectionModalProps {}

const LoggedDisconnectionModal: React.FC<LoggedDisconnectionModalProps> = () => {
  const disconectionText = DisconectionText;
  const imgUrl = DisconectionImages;
  
  const {
    setPlayer,
    setIsLoggedIn,
    setEmail,
    setPermanentlyDisconnected,
  } = useStore();

  const handleReconnect = () => {
    setPlayer(null!);
    setIsLoggedIn(false);
    setEmail('');
    setPermanentlyDisconnected(false);
  };

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-between bg-gray-900/100 z-50 bg-cover bg-no-repeat bg-center"
      data-testid="logged-disconnection-modal"
      style={{ backgroundImage: imgUrl[Math.floor(Math.random() * imgUrl.length)], backgroundSize: 'w-screen h-screen' }}
    >
      {/* Contenedor del texto con fondo negro semi-transparente */}
      <div className="w-[90%] bg-black bg-opacity-50 rounded-lg p-6 mt-[5%] text-center">
        <p className="text-white text-3xl">
          {disconectionText[Math.floor(Math.random() * disconectionText.length)]}
        </p>
      </div>
      
      {/* Botón posicionado abajo */}
      <button
        onClick={handleReconnect}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg text-2xl mb-10"
      >
        Return to login screen
      </button>
    </div>
  );
};

export default LoggedDisconnectionModal;