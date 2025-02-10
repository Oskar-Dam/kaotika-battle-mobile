import React from 'react';
import Spinner from './Spinner';


interface UnloggedDisconnectionModalProps {

}
const UnloggedDisconnectionModal: React.FC<UnloggedDisconnectionModalProps> = () => {

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-900/80 z-50"
      data-testid="unlogged-disconnection-modal">
      <Spinner text={'Trying to find the way back into the battle...'} />
    </div>
  );
};

export default UnloggedDisconnectionModal;