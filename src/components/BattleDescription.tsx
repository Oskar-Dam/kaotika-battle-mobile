import React from 'react';

interface ModalDropdownProps {
  description: string;
}

const BattleDescription: React.FC<ModalDropdownProps> = ({description}) => {


  return (
    <div>
      <div className='text-white text-3xl text-center'>Description</div>
      <div className='mb-1 text-2xl drop-shadow-md p-2 text-white shadow-2xs shadow-white rounded outline-color-black'>
        {description}
      </div>
    </div>
  );
};

export default BattleDescription;
