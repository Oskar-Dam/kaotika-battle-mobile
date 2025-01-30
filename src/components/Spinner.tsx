import React from 'react';

interface SpinnerProps {
  text?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ text }) => {

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Spinner */}
      <div className="relative">
        {/* Spinner con bordes de tonos derivados */}
        <div
          className={`animate-spin rounded-full h-16 w-16 border-4 
                        border-t-gray-200
                        border-r-gray-400 
                        border-b-gray-600
                        border-l-gray-800`}
        ></div>
      </div>
      {/* Texto */}
      {text && <p className={`text-4xl text-center font-medium text-white px-8`}>{text}</p>}
    </div>
  );
};

export default Spinner;