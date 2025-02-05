import React from 'react';
import Spinner from './Spinner';
import { Player } from '../interfaces/Player';


interface LoggedDisconnectionModalProps {
  player: Player | null;
  setPlayer: (player: Player) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setEmail: (email: string) => void;
}
const LoggedDisconnectionModal: React.FC<LoggedDisconnectionModalProps> = () => {

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900/80 z-50">
      <Spinner text={'Trying to find the way back into the battle...'} />
    </div>
  );
};

export default LoggedDisconnectionModal;