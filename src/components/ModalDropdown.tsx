import React, { useState } from 'react';

interface ModalDropdownProps {
  title: string;
  content: string;
}

const ModalDropdown: React.FC<ModalDropdownProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='mb-2'>
      <button 
        className='w-full text-left p-2 bg-gray-200 rounded'
        onClick={() => setIsOpen(!isOpen)}>
        {title} {isOpen ? '▲' : '▼'}
      </button>
      {isOpen && <div className='p-2'>{content}</div>}
    </div>
  );
};

export default ModalDropdown;
