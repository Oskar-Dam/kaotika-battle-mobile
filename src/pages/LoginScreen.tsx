// src/screens/LoginScreen.tsx
import React, { ChangeEvent, useState } from 'react';
import Spinner from '../components/Spinner';
import socket from '../sockets/socket';
import { SOCKET_EVENTS } from '../sockets/events';
import { getPlayerByEmail } from '../api/player';
import { Player } from '../interfaces/Player';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../api/firebase/firebaseConfig';

interface LoginScreenInterface {
  email: string;
  setEmail: (email: string) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setPlayer: (player: Player) => void;
}

const LoginScreen: React.FC<LoginScreenInterface> = ({
  email,
  setEmail,
  setIsLoggedIn,
  setPlayer,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrorMessage(''); // Clear error message when email changes
  };

  const handleEnterBattle = async () => {
    setIsLoading(true);
    console.log('Email:', email);
    try {
      const playerData = await getPlayerByEmail(email);
      console.log('Player data:', playerData);

      // Emit an event with an object containing the email and socket ID
      socket.emit(SOCKET_EVENTS.SEND_SOCKETID, email);
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
  };

  const handleGoogleSignIn = async () => {
    provider.setCustomParameters({ prompt: 'select_account' });
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (user.email) {
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
    <div
      className="flex bg-black p-4 items-center justify-center h-screen w-screen"
      style={{ backgroundImage: 'url(/images/login-background.webp)', backgroundSize: '100% 100%' }}
      data-testid="login-screen"
    >
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
          <Spinner text={'Retrieving player from database, please wait...'} />
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
        style={{ backgroundImage: 'url(/images/login-frame.webp)', backgroundSize: '100% 100%' }}>
        {/*no firebase*/}
        <div className="w-[80%] h-[15%] mt-[10%]">
          <input
            type="search"
            placeholder='Enter your email'
            id="default-input"
            className="text-2xl border border-yellow-600 text-yellow-600 rounded-xs  w-full p-2.5 bg-red-950 placeholder-yellow-600"
            value={email}
            style={{ fontFamily: 'Kaotika' }}
            onChange={handleEmailChange}
            hidden= {true}></input>
            
        </div>
        <button
          className="mt-[5%] flex flex-col items-center justify-center bg-gray-500 h-[15%]"
          onClick={handleEnterBattle}
          style={{ filter: email === '' ? 'grayscale(100%)' : 'none', transition: 'filter 0.3s ease', pointerEvents: email === '' ? 'none' : 'auto', width: '45%', height: 'auto' }}
          disabled={email === ''}
          hidden= {true}>
          <img
            src="/images/enter-button.webp"
            alt="Enter the battle"
            style={{ width: '100%' }} />
          <span
            className="text-white mt-2 text-3xl mb-2"
            style={{ fontFamily: 'Kaotika', position: 'absolute' }}>ENTER</span>
        </button> 
        {/*firebase*/}
        <button
          className="mt-[5%] flex flex-col items-center justify-center bg-gray-500 h-[15%]"
          onClick={handleGoogleSignIn}
          style={{ width: '45%', height: 'auto' }}
          hidden= {false}>
          <img
            src="/images/enter-button.webp"
            alt="Enter the battle"
            style={{ width: '100%' }} />
          <span
            className="text-white mt-2 text-3xl mb-2"
            style={{ fontFamily: 'Kaotika', position: 'absolute' }}>SING IN</span>
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
  