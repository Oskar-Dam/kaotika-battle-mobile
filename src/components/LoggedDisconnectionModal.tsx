import React, { useEffect } from 'react';
import Spinner from './Spinner';
import { Player } from '../interfaces/Player';


interface LoggedDisconnectionModalProps {
  setPlayer: (player: Player | null) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setEmail: (email: string) => void;
}
const LoggedDisconnectionModal: React.FC<LoggedDisconnectionModalProps> = ({setPlayer, setIsLoggedIn, setEmail}) => {

  useEffect(() => {
    setPlayer(null);
    setIsLoggedIn(false);
    setEmail('');
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900/80 z-50">
      <Spinner text={'Trying to find the way back into the battle...'} />
    </div>
  );
};

export default LoggedDisconnectionModal;