import React from 'react';
import Spinner from './Spinner';


interface DesconnectionModalProps {
  
}
const DesconnectionModal: React.FC<DesconnectionModalProps> = () => {

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900/80 z-50">
      <Spinner text={'Waiting to reconnect...'} />
    </div>
  );
};

export default DesconnectionModal;