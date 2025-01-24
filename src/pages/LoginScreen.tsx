import React, { ChangeEvent } from 'react';
import { LoginScreenInterface } from '../interfaces/LoginScreenInterface';

const LoginScreen: React.FC<LoginScreenInterface> = ({ email, setEmail, setIsLoggedIn }) => {

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value); 
  };

  const handleEnterBattle = () => {
    console.log('Email:', email);
    setIsLoggedIn(true);
  };

  return (
    <div className="flex bg-black p-4 items-center justify-center h-screen w-screen">
      <div className="absolute top-[4%] w-full text-center">
        <h1 className="text-5xl text-white">Kaotika</h1>
        <h1 className="text-5xl text-white">The Final Battle</h1>
      </div>
      <div className="flex flex-col items-center justify-center w-full max-w-[630px] h-[40%] border-4 border-white" style={{ backgroundImage: 'url(/images/LoginFrame.png)', backgroundSize: '100% 100%' }}>
        <div className="w-[80%]">
          <input
            type="search"
            placeholder='Enter your email'
            id="default-input"
            className="border border-yellow-600 text-yellow-600 text-sm rounded-lg  w-full p-2.5 bg-red-950 placeholder-yellow-600"
            value={email}
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
