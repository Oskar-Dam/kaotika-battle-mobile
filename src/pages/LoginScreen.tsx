import React, { ChangeEvent, useState } from 'react';
import { LoginScreenInterface } from '../interfaces/LoginScreenInterface';
import Spinner from '../components/Spinner';
import socket from '../sockets/socket';
import { SOCKET_EVENTS } from '../sockets/events';
import { getPlayerByEmail } from '../api/getPlayerByEmail';

const LoginScreen: React.FC<LoginScreenInterface> = ({ email, setEmail, setIsLoggedIn, setPlayer }) => {

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
      setPlayer(playerData.data);
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
    <div
      className="flex bg-black p-4 items-center justify-center h-screen w-screen"
      style={{ backgroundImage: 'url(/images/LoginBackground.png)', backgroundSize: '100% 100%' }}>
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
          <Spinner text={'Retrieving player from database, please wait...'} />
        </div>
      )}
      <div className="absolute top-[4%] w-full text-center" style={{ fontFamily: 'Kaotika' }}>
        <h1 className="text-5xl text-white">Kaotika</h1>
        <h1 className="text-5xl text-white">The Final Battle</h1>
      </div>
      <div className="flex flex-col items-center justify-center w-full max-w-[630px] h-[36%] border-0 border-white" style={{ backgroundImage: 'url(/images/LoginFrame.png)', backgroundSize: '100% 100%' }}>
        <div className="w-[80%]">
          <input
            type="search"
            placeholder='Enter your email'
            id="default-input"
            className="text-2xl border border-yellow-600 text-yellow-600 rounded-xs  w-full p-2.5 bg-red-950 placeholder-yellow-600"
            value={email}
            style={{ fontFamily: 'Kaotika' }}
            onChange={handleEmailChange}></input>
        </div>
        
        <button
          className="mt-[2%] flex flex-col items-center justify-center"
          onClick={handleEnterBattle}
          style={{ filter: email === '' ? 'grayscale(100%)' : 'none', transition: 'filter 0.3s ease', pointerEvents: email === '' ? 'none' : 'auto' }}
          disabled={email === ''}>
          <img src="/images/ENTER_BUTTON.png" alt="Enter the battle" style={{ width: '45%' }}/>
          <span className="text-white mt-2 text-3xl mb-2" style={{ fontFamily: 'Kaotika', position: 'absolute' }}>ENTER</span>
        </button>

        {errorMessage && (
          <div className="text-red-500 mt-2 text-2xl" style={{ fontFamily: 'Kaotika' }}>
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );

}

export default LoginScreen;
