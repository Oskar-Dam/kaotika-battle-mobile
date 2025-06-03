import React from 'react';

interface ModalDropdownProps {
  description: string;
}

const BattleDescription: React.FC<ModalDropdownProps> = ({ description }) => {
  return (
    <div>
      {/* Título */}
      <div className='text-white text-4xl text-center shadow-white mb-1 mt-2'>
        Description
      </div>

      {/* Línea separadora */}
      <div className='w-3/4 mx-auto border-b border-white mb-2 shadow-lg'></div>

      {/* Descripción */}
      <div className='mt-4 text-3xl drop-shadow-md p-2 text-white rounded outline-color-black text-center'>
        {description}
      </div>
    </div>
  );
};

export default BattleDescription;
