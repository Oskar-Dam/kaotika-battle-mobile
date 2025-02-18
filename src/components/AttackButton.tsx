import React from 'react';
import useStore from '../store/useStore';
import socket from '../sockets/socket';
import { SOCKET_EMIT_EVENTS } from '../sockets/events';

const AttackButton: React.FC = () => {

  const { isMyTurn, setIsMyTurn, selectedPlayer, player } = useStore();

  const handleOnClick = () => {
    console.log('Attacking ', selectedPlayer?._id);
    socket.emit(SOCKET_EMIT_EVENTS.ATTACK, selectedPlayer?._id);
    setIsMyTurn(false);
  };

  console.log('AttackButton rendered, selectedPlayer is betrayer? ', selectedPlayer?.isBetrayer);

  const sameFaction = player?.isBetrayer === selectedPlayer?.isBetrayer;
  const isDisabled = !isMyTurn || sameFaction;

  console.log('sameFaction:', sameFaction); // Log sameFaction value
  console.log('isDisabled:', isDisabled); // Log isDisabled value

  return (
    <button
      className={`relative px-25 py-10 text-2xl font-bold text-gray-100 ${
        isMyTurn && !sameFaction ? 'animate-saturation' : ''
      }`}
      style={{
        backgroundImage: 'url(/images/attack-button.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: isMyTurn && !sameFaction ? 'saturate(1)' : 'saturate(0)',
      }}
      onClick={handleOnClick}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      data-testid="attack-button"
    >
      <span className="absolute inset-0 w-full h-full border-0 border-gray-400 rounded-lg opacity-20"></span>
    </button>
  );
};

export default AttackButton;
