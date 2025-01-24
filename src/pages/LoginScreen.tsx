import React, { useState } from 'react';

const LoginScreen: React.FC = () => {
  // Definimos los estados para los campos de formulario
  const [email, setEmail] = useState<string>('');

  return (
    <div className="flex bg-black p-4 items-center justify-center h-screen w-screen">
      <div className="absolute top-[4%] w-full text-center">
        <h1 className="text-5xl text-white">Kaotika</h1>
        <h1 className="text-5xl text-white">The Final Battle</h1>
      </div>
      <div className="flex items-center justify-center w-[100%] h-[50%] border-4 border-white">
        <div className="relative mb-6">
          <div className="mb-6">
            <input type="text" placeholder='Enter your email' id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
          </div>
        </div>
      </div>
    </div>
  );

}

export default LoginScreen;
