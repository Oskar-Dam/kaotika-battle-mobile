import { signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react';
import { auth, provider } from '../../api/firebase/firebaseConfig';
import { MobileBattlesResponse } from '../../interfaces/response/MobileBattlesResponse';
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

  const [isModalVisible, setIsModalVisible] = useState(false);

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
          socket.emit(SOCKET_EMIT_EVENTS.SIGN_IN, user.email, (response: MobileSignInResponse) => {
            if (response.status === 'OK') {
              console.log('player found with email:', response.player.email);
              localStorage.setItem('playerEmail', JSON.stringify(response.player.email));
              console.log('Player saved in local storage: ', JSON.stringify(response.player));
              setPlayer(response.player);
              setIsLoggedIn(true);
              setEmail(response.player.email);
              if ((user.email === mortimerEmail) || (user.email === villainEmail)) {
                console.log('email send is mortimer or villain');
                socket.emit(SOCKET_EMIT_EVENTS.GET_BATTLES, (response: MobileBattlesResponse) => {
                  if (response.status === 'OK') {
                    console.log('Battles receive correctly');
                    setBattles(response.battles);
                  } else {
                    console.error('Error:', response.error);
                  }
                });
              }
              setIsLoading(false);
            } else if (response.error === 'Player already logged in.') {
              console.error('Error:', response.error);
              setIsLoading(false);
              setIsModalVisible(true); // Show modal
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
    <div className="flex items-center justify-center w-full h-2/8">
      <button
        className="w-full h-full bg-black/50 text-white text-6xl rounded-xl shadow-black shadow-xl border-2 border-white"
        onClick={handleGoogleSignIn}
      >
        Sign In
      </button>
      {errorMessage && (
        <div
          className="mt-4 text-red-500"
          style={{ fontFamily: 'Kaotika' }}
        >
          {errorMessage}
        </div>
      )}
      {isModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="w-[90%] bg-black p-6 rounded-lg shadow-lg text-center border-white border-2">
            <p className="text-6xl text-white font-bold mb-4">Player already logged in.</p>
            <div className='py-4'></div>
            <button
              className="w-[90%] px-4 py-2 bg-black/50 border-white border-2 text-2xl text-white rounded-xl"
              onClick={() => setIsModalVisible(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginFirebase;