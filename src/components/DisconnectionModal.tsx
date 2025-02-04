import React from 'react';
import Spinner from './Spinner';


interface DisconnectionModalProps {
  
}
const DisconnectionModal: React.FC<DisconnectionModalProps> = () => {

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900/80 z-50">
      <Spinner text={'Trying to find the way back into the battle...'} />
    </div>
  );
};

export default DisconnectionModal;