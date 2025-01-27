import React, { ChangeEvent } from 'react';
import { LoginScreenInterface } from '../interfaces/LoginScreenInterface';
import { mockPlayer } from '../mocks/PlayerMock';

const LoginScreen: React.FC<LoginScreenInterface> = ({ email, setEmail, setIsLoggedIn, setPlayer }) => {

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleEnterBattle = () => {
    console.log('Email:', email);
    setIsLoggedIn(true);
    setPlayer(mockPlayer);
  };

  return (
    <div
      className="flex bg-black p-4 items-center justify-center h-screen w-screen"
      style={{ backgroundImage: 'url(/images/LoginBackground.png)', backgroundSize: '100% 100%' }}>
      <div className="absolute top-[4%] w-full text-center" style={{ fontFamily: 'Kaotika' }}>
        <h1 className="text-5xl text-white">Kaotika</h1>
        <h1 className="text-5xl text-white">The Final Battle</h1>
      </div>
      <div className="flex flex-col items-center justify-center w-full max-w-[630px] h-[40%] border-0 border-white" style={{ backgroundImage: 'url(/images/LoginFrame.png)', backgroundSize: '100% 100%' }}>
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
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-[10%]"
          onClick={handleEnterBattle}>
          Enter the battle
        </button>
      </div>
    </div>
  );

}

export default LoginScreen;
