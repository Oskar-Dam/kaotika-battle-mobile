// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import LoginFirebase from '../components/login/LoginFirebase';
import Spinner from '../components/Spinner';
import { Player } from '../interfaces/Player';

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState('');


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
        className="absolute top-[8%] w-full text-center"
        style={{ fontFamily: 'Kaotika' }}>
        <h1 className="text-7xl text-white">KA<span className='text-kaotikaGold'>O</span>TIKA</h1>
      </div>
      <div
        className="flex flex-col items-center justify-center w-full max-w-[630px] h-[40%] border-0 border-white"
      >
        {/*No Firebase Login*/}
        {/* <LoginNoFirebase 
          email={email} 
          isLoading={isLoading} 
          errorMessage={errorMessage} 
          setEmail={setEmail} 
          setIsLoggedIn={setIsLoggedIn} 
          setIsLoading={setIsLoading} 
          setErrorMessage={setErrorMessage} 
          setPlayer={setPlayer}
        /> */}
                
        {/*Firebase Login*/}
        <LoginFirebase 
          setEmail={setEmail}
          setErrorMessage={setErrorMessage}
          errorMessage={''+errorMessage}
          setIsLoading={setIsLoading}
          setPlayer={setPlayer} 
          email={email} 
          isLoading={isLoading} 
          setIsLoggedIn={setIsLoggedIn} 
        />

      </div>
    </div>
  );
}; 
  
export default LoginScreen;  
  