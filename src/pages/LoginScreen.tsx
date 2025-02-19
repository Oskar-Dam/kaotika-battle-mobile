import React, { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import socket from '../sockets/socket';
import { SOCKET_EVENTS } from '../sockets/events';
import { getPlayerByEmail } from '../api/player';
import { Player } from '../interfaces/Player';
import { getRedirectResult, onAuthStateChanged, signInWithRedirect } from 'firebase/auth';
import { auth, provider } from '../api/firebase/firebaseConfig';

interface LoginScreenProps {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setPlayer: (player: Player) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ setIsLoggedIn, setPlayer }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  provider.setCustomParameters({ prompt: 'select_account' });

  useEffect(() => {
    console.log('Checking user session...');
    setIsLoading(true);
    
    const checkUserSession = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result?.user) {
          console.log('User logged in after redirect:', result.user);
          handleUserLogin(result.user);
          return;
        }
      } catch (error) {
        console.error('Error obteniendo usuario después de redirección:', error);
      }

      console.log('No user logged in after redirect, checking local storage...');
      
      const storedEmail = localStorage.getItem('userEmail');
      console.log('Stored email:', storedEmail);
      
      try {
        const playerData = await getPlayerByEmail(storedEmail);
        console.log('Player data:', playerData);
  
        // Emit an event with an object containing the email and socket ID
        socket.emit(SOCKET_EVENTS.SEND_SOCKETID, storedEmail);
        setIsLoggedIn(true);
        setIsLoading(false);
        setPlayer(playerData);
      } catch (error: unknown) {
        console.error('Fetch error:', error);
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage('An unknown error occurred');
        }
        setIsLoading(false);
      }
      
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          handleUserLogin(user);
        } else {
          setIsLoading(false);
        }
      });
      
      setIsLoading(false);

      return () => unsubscribe();
    };
    
    checkUserSession();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUserLogin = async (user: any) => {
    console.log('User logged in:', user);
    
    if (!user?.email) {
      console.log('No email found in user:', user);
      setErrorMessage('No se pudo obtener el correo electrónico del usuario.');
      setIsLoading(false);
      return;
    }

    try {
      console.log('User email:', user.email);
      
      localStorage.setItem('userEmail', user.email);
      const playerData = await getPlayerByEmail(user.email);
      socket.emit(SOCKET_EVENTS.SEND_SOCKETID, user.email);
      setIsLoggedIn(true);
      setPlayer(playerData);
    } catch (error) {
      console.error('Error obteniendo datos del jugador:', error);
      setErrorMessage('Error al recuperar datos del jugador.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error('Error en Google Sign-In:', error);
      setErrorMessage('Error en el inicio de sesión con Google.');
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex bg-black p-4 items-center justify-center h-screen w-screen"
      style={{ backgroundImage: 'url(/images/login-background.webp)', backgroundSize: '100% 100%' }}
      data-testid="login-screen"
    >
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
          <Spinner text={'Cargando, por favor espera...'} />
        </div>
      )}
      <div
        className="absolute top-[4%] w-full text-center"
        style={{ fontFamily: 'Kaotika' }}>
        <h1 className="text-5xl text-white">Kaotika</h1>
        <h1 className="text-5xl text-white">The Final Battle</h1>
      </div>
      <div
        className="flex flex-col items-center justify-center w-full max-w-[630px] h-[40%] border-0 border-white"
        style={{ backgroundImage: 'url(/images/login-frame.webp)', backgroundSize: '100% 100%' }}
      >
        <button
          className="mt-[5%] flex flex-col items-center justify-center bg-gray-500 h-[15%]"
          onClick={handleGoogleSignIn}
          style={{ width: '45%', height: 'auto' }}
        >
          <img
            src="/images/enter-button.webp"
            alt="Sign in with Google"
            style={{ width: '100%' }} />
          <span
            className="text-white mt-2 text-3xl mb-2"
            style={{ fontFamily: 'Kaotika', position: 'absolute' }}>
            SIGN IN
          </span>
        </button>
        {errorMessage && (
          <div
            className="mt-4 text-red-500"
            style={{ fontFamily: 'Kaotika' }}>
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginScreen;
