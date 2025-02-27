import React, { ChangeEvent } from 'react';
import { MobileBattelsResponse } from '../../interfaces/response/MobileBattlesResponse';
import { MobileSignInResponse } from '../../interfaces/response/MobileSignInResponse';
import { SOCKET_EMIT_EVENTS, SOCKET_EVENTS } from '../../sockets/events';
import socket from '../../sockets/socket';
import useStore from '../../store/useStore';

interface LoginNoFirebaseProps {
    isLoading: boolean; 
    errorMessage: string;
      setIsLoading: (isLoggedIn: boolean) => void;
      setErrorMessage: (errorMessage: string ) => void;
}

const LoginNoFirebase: React.FC<LoginNoFirebaseProps> = ({
  setErrorMessage,
  setIsLoading
}) => {

    
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrorMessage(''); // Clear error message when email changes
  };

  const {
    email,
    setIsLoggedIn,
    setEmail,
    setPlayer,
    setBattles,
  } = useStore();

  const mortimerEmail = import.meta.env.VITE_MORTIMER_EMAIL;
  const villainEmail = import.meta.env.VITE_VILLAIN_EMAIL;
  
  const handleEnterBattle = async () => {
    setIsLoading(true);
    console.log('Email:', email);
    try {
      // Connect with socket
      socket.connect();
      socket.on(SOCKET_EVENTS.CONNECT, () => {
        console.log('[Socket.io] Connected:', socket.id);
        socket.emit(SOCKET_EMIT_EVENTS.SIGN_IN, email, (response: MobileSignInResponse) => {
          if (response.status === 'OK') {
            console.log('player found with email:', response.player.email);
            setPlayer(response.player);
            setIsLoggedIn(true);
            setIsLoading(false);
            setEmail(response.player.email);
            if ((email === mortimerEmail) || (email === villainEmail)) {
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
          } else {
            console.error('Error:', response.error);
          }
        });
      });
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
        className=" mt-[10%] z-1 w-full h-[50%] bg-black/50 text-white text-5xl rounded-4xl shadow-black shadow-xl border-2 border-white"
        onClick={handleEnterBattle}
        style={{ filter: email === '' ? 'grayscale(100%)' : 'none', transition: 'filter 0.3s ease', pointerEvents: email === '' ? 'none' : 'auto', width: '95%', height: '175%' }}
        disabled={email === ''}
      >
        Sign In
      </button> 
    </div>  

  );
};

export default LoginNoFirebase;
