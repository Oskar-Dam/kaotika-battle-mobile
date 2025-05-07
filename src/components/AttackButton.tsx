import React from 'react';
import { SOCKET_EMIT_EVENTS } from '../sockets/events';
import socket from '../sockets/socket';
import useStore from '../store/useStore';

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
      className={'relative font-bold min-w-[70%] max-w-[90%] min-h-[20%] max-h-[20%] bg-black/50 text-white text-4xl rounded-4xl shadow-black shadow-xl border-2 border-white mb-5'}
      onClick={handleOnClick}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      data-testid="attack-button"
    >
    ATTACK
    </button>
  );
};

export default AttackButton;
