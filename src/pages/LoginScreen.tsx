// src/screens/LoginScreen.tsx
import React, { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import { MobileBattelsResponse } from '../interfaces/response/MobileBattlesResponse';
import { MobileSignInResponse } from '../interfaces/response/MobileSignInResponse';
import { SOCKET_EMIT_EVENTS, SOCKET_EVENTS } from '../sockets/events';
import socket from '../sockets/socket';
import useStore from '../store/useStore';
import LoginNoFirebase from '../components/login/LoginNoFirebase';

interface LoginScreenInterface {}

const LoginScreen: React.FC<LoginScreenInterface> = () => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState('');

  const {setPlayer, setIsLoggedIn, setEmail, setBattles} = useStore();

  const mortimerEmail = import.meta.env.VITE_MORTIMER_EMAIL;
  const villainEmail = import.meta.env.VITE_VILLAIN_EMAIL;

  useEffect(() => {
    const storedEmail = localStorage.getItem('playerEmail');
    if (storedEmail) {
      setIsLoading(true);
      try {
        const email = JSON.parse(storedEmail);
        console.log('User email:', email);
        if(email){
          // Connect with socket
          socket.connect();
          socket.on(SOCKET_EVENTS.CONNECT, () => {
            console.log('[Socket.io] Connected:', socket.id);
            socket.emit(SOCKET_EMIT_EVENTS.SIGN_IN, email , (response: MobileSignInResponse) => {
              if (response.status === 'OK') {
                console.log('player found with email:', response.player.email);
                // Save user in local storage
                localStorage.setItem('playerEmail', JSON.stringify(response.player.email));
                console.log('Email saved in local storage: ',  JSON.stringify(response.player.email));
                setPlayer(response.player);
                setIsLoggedIn(true);
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
    }
  }, []);

  return (
    <div
      className="flex bg-black p-4 items-center justify-center h-screen w-screen bg-no-repeat"
      style={{ backgroundImage: 'url(/images/login-background.webp)', backgroundSize: '100% 100%' }}
      data-testid="login-screen"
    >
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
          <Spinner text={'Retrieving player from database, please wait...'} />
        </div>
      )}
      <div
        className="absolute top-[10%] w-full text-center animate-pulse"
        style={{ fontFamily: 'Kaotika' }}>
        <h1 className="text-7xl text-white">KA<span className='text-kaotikaGold'>O</span>TIKA</h1>
      </div>
      <div
        className="flex flex-col items-center justify-center w-full max-w-[630px] h-[40%] border-0 border-white"
      >
        {/*No Firebase Login*/}
        <LoginNoFirebase
          isLoading={isLoading} 
          errorMessage={errorMessage} 
          setIsLoading={setIsLoading} 
          setErrorMessage={setErrorMessage} 
        />
                
        {/*Firebase Login*/}
        {/* <LoginFirebase
          setErrorMessage={setErrorMessage}
          errorMessage={''+errorMessage}
          setIsLoading={setIsLoading}
          isLoading={isLoading} 
        /> */}

      </div>
    </div>
  );
}; 
  
export default LoginScreen;
