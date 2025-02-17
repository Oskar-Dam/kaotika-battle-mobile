import React from 'react';
import { SOCKET_EMIT_EVENTS } from '../sockets/events';
import socket from '../sockets/socket';

interface EndGameButtonProps {
    classNameCss : string | undefined,
}

const EndGameButton: React.FC<EndGameButtonProps> = ({classNameCss}) => {

  const handleReconnect = () => {
    socket.emit(SOCKET_EMIT_EVENTS.GAME_RESET);
  };

  const cssClassName = classNameCss ? classNameCss : '';

  return (
    <div>
      <button
        className={'items-center justify-center text-medievalSepia place-self-center rounded text-3x brightness-50 '+ cssClassName}
        onClick={handleReconnect}
        style={{
          backgroundImage: 'url(/images/end-button.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    </div>
  );
};

export default EndGameButton;


