// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import Spinner from '../components/Spinner';
import LoginNoFirebase from '../components/login/LoginNoFirebase';

interface LoginScreenInterface {}

const LoginScreen: React.FC<LoginScreenInterface> = () => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState('');

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
  