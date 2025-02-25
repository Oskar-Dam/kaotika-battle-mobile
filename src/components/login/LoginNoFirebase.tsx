import React, { ChangeEvent } from 'react';
import { Player } from '../../interfaces/Player';
import { SOCKET_EMIT_EVENTS, SOCKET_EVENTS } from '../../sockets/events';
import socket from '../../sockets/socket';

interface LoginNoFirebaseProps {
    email: string;
    isLoading: boolean; 
    errorMessage: string;
      setEmail: (email: string) => void;
      setIsLoggedIn: (isLoggedIn: boolean) => void;
      setIsLoading: (isLoggedIn: boolean) => void;
      setErrorMessage: (errorMessage: string ) => void;
      setPlayer: (player: Player) => void;
}

const LoginNoFirebase: React.FC<LoginNoFirebaseProps> = ({
  email,
  setIsLoggedIn,
  setErrorMessage,
  setEmail,
  setIsLoading
}) => {

    
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrorMessage(''); // Clear error message when email changes
  };
  
  const handleEnterBattle = async () => {
    setIsLoading(true);
    console.log('Email:', email);
    try {
      
      // Connect with socket
      socket.connect();
      socket.on(SOCKET_EVENTS.CONNECT, () => {
        console.log('[Socket.io] Connected:', socket.id);
        socket.emit(SOCKET_EMIT_EVENTS.SIGN_IN, email, (response: { status: string; player: Player; message: string; }) => {
          if (response.status === 'ok') {
            console.log('player found:', response.player.email);
          } else {
            console.error('Error:', response.message);
          }
        });
      });

      setIsLoggedIn(true);
      setIsLoading(false);
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

  return (
    <div className='mt-[5%] flex flex-col items-center justify-center h-[15%]'>
      <div className="">
        <input
          type="search"
          placeholder='Enter your email'
          id="default-input"
          className="text-2xl border border-yellow-600 text-yellow-600 rounded-xs w-full p-2.5 bg-red-950 placeholder-yellow-600"
          value={email}
          style={{ fontFamily: 'Kaotika' }}
          onChange={handleEmailChange}
        />
            
      </div>
      <button
        className="mt-[5%] flex flex-col items-center justify-center h-[15%]"
        onClick={handleEnterBattle}
        style={{ filter: email === '' ? 'grayscale(100%)' : 'none', transition: 'filter 0.3s ease', pointerEvents: email === '' ? 'none' : 'auto', width: '45%', height: 'auto' }}
        disabled={email === ''}
      >
        <img
          src="/images/signin-button.webp"
          alt="Enter the battle"
          style={{ width: '100%' }} 
          className='brightness-80'/>
        <span
          className="text-white mt-2 text-3xl mb-2"
          style={{ fontFamily: 'Kaotika', position: 'absolute' }}>
          
        </span>
      </button> 
    </div>
    

  );
};

export default LoginNoFirebase;
