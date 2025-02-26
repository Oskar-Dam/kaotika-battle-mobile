import { signInWithPopup } from 'firebase/auth';
import React from 'react';
import { auth, provider } from '../../api/firebase/firebaseConfig';
import { MobileBattelsResponse } from '../../interfaces/response/MobileBattlesResponse';
import { MobileSignInResponse } from '../../interfaces/response/MobileSignInResponse';
import { SOCKET_EMIT_EVENTS, SOCKET_EVENTS } from '../../sockets/events';
import socket from '../../sockets/socket';
import useStore from '../../store/useStore';

interface LoginFirebaseProps {
    isLoading: boolean; 
    errorMessage: string;
      setIsLoading: (isLoggedIn: boolean) => void;
      setErrorMessage: (errorMessage: string ) => void;
}

const LoginFirebase: React.FC<LoginFirebaseProps> = ({
  errorMessage,
  setErrorMessage,
  setIsLoading,
}) => {

  const {
    setIsLoggedIn,
    setEmail,
    setPlayer,
    setBattles,
  } = useStore();

  const mortimerEmail = import.meta.env.VITE_MORTIMER_EMAIL;
  const villainEmail = import.meta.env.VITE_VILLAIN_EMAIL;

  const handleGoogleSignIn = async () => {
    provider.setCustomParameters({ prompt: 'select_account' });
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (user.email) {
        console.log('User email:', user.email);

        // Connect with socket
        socket.connect();
        socket.on(SOCKET_EVENTS.CONNECT, () => {
          console.log('[Socket.io] Connected:', socket.id);
          socket.emit(SOCKET_EMIT_EVENTS.SIGN_IN, user.email , (response: MobileSignInResponse) => {
            if (response.status === 'OK') {
              console.log('player found with email:', response.player.email);
              setPlayer(response.player);
              setIsLoggedIn(true);
              setEmail(response.player.email);
              if ((user.email === mortimerEmail) || (user.email === villainEmail)) {
                console.log('email send is mortimer or villain');
                socket.emit(SOCKET_EMIT_EVENTS.GET_BATTLES, (response: MobileBattelsResponse) => {
                  if (response.status === 'OK') {
                    console.log('Battles receive correctly'); 
                    setBattles(response.battles);
                  } else {
                    console.error('Error:', response.error);
                  }
                });
              }
              setIsLoading(false);
            } else {
              console.error('Error:', response.error);
              setIsLoading(false);
            }
          });
        });
        
      } else {
        setErrorMessage('No se pudo obtener el correo electrónico del usuario.');
        setIsLoading(false);
      }
    } catch (error: unknown) {
      console.error('Error during Google sign-in:', error);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An unknown error occurred during Google sign-in.');
      }
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
