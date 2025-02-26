import React from 'react';

interface ModalHeaderProps {
  name: string;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ name }) => {
  return <h1 className='text-4xl mb-4 text-white text-center underline'>{name}</h1>;
};

export default ModalHeader;
