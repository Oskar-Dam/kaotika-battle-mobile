import { signInWithPopup } from 'firebase/auth';
import React from 'react';
import { auth, provider } from '../../api/firebase/firebaseConfig';
import { getPlayerByEmail } from '../../api/player';
import { Player } from '../../interfaces/Player';
import { SOCKET_EVENTS } from '../../sockets/events';
import socket from '../../sockets/socket';

interface LoginFirebaseProps {
    email: string;
    isLoading: boolean; 
    errorMessage: string;
      setEmail: (email: string) => void;
      setIsLoggedIn: (isLoggedIn: boolean) => void;
      setIsLoading: (isLoggedIn: boolean) => void;
      setErrorMessage: (errorMessage: string ) => void;
      setPlayer: (player: Player) => void;
}

const LoginFirebase: React.FC<LoginFirebaseProps> = ({
  errorMessage,
  setIsLoggedIn,
  setPlayer,
  setErrorMessage,
  setIsLoading
}) => {

  const handleGoogleSignIn = async () => {
    provider.setCustomParameters({ prompt: 'select_account' });
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (user.email) {
        console.log('User email:', user.email);
        const playerData = await getPlayerByEmail(user.email);
        socket.emit(SOCKET_EVENTS.SEND_SOCKETID, user.email);
        setIsLoggedIn(true);
        setIsLoading(false);
        setPlayer(playerData);
      } else {
        setErrorMessage('No se pudo obtener el correo electrónico del usuario.');
      }
    } catch (error: unknown) {
      console.error('Error during Google sign-in:', error);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An unknown error occurred during Google sign-in.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='mt-[60%] flex flex-col items-center justify-center h-[15%]'>
      <button
        className="mt-[90%] flex flex-col items-center justify-center h-[15%]"
        onClick={handleGoogleSignIn}
        style={{ width: '70%', height: 'auto' }}
      >
        <img
          src="/images/signin-button.webp"
          alt="Enter the battle"
          style={{ width: '100%' }} 
          className='brightness-80'/>
        <span
          className="text-white mt-2 text-3xl mb-2"
          style={{ fontFamily: 'Kaotika', position: 'absolute' }}></span>
      </button> 
      {errorMessage && (
        <div
          className="mt-4 text-red-500"
          style={{ fontFamily: 'Kaotika' }}
        >
          {errorMessage}
        </div>
      )}
    </div>
    

  );
};

export default LoginFirebase;
