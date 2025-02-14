import React, { useState } from 'react';
import { SOCKET_EMIT_EVENTS } from '../sockets/events';
import socket from '../sockets/socket';

interface GameEndingModalProps {
  role: string;
  winner: string;
}

const GameEndingModal: React.FC<GameEndingModalProps> = ({ winner, role }) => {

  const [winnerSide] = useState<string>(winner);

  const handleReconnect = () => {
    socket.emit(SOCKET_EMIT_EVENTS.GAME_RESET);
  };

  const imgUrl: string = (winnerSide === 'kaotika') ? 'url(/images/kaotikaWinner.webp)' :
    (winnerSide === 'dravokar') ? 'url(/images/dravokarWinner.webp)' :
      'url(/images/login-background.webp)';

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-51">

      <div
        className="grid grid-cols-1 grid-rows-2 flex-grow bg-black p-8 rounded shadow-lg text-center w-full h-full items-center"
        style={{ backgroundImage: imgUrl, backgroundSize: 'w-screen h-screen' }}>
        <div className='border-2  bg-darkBlue/50 rounded-lg'>
          <h2 className="text-6xl font-bold mb-4 text-medievalSepia">Game Over</h2>
          <p className="mb-4 text-4xl text-medievalSepia">Winner: {winner}</p>  {/* Show who won */}
        </div>

        <div>{role === 'mortimer' && (

          <button
            className="text-medievalSepia p-20 place-self-item rounded text-3xl"
            onClick={handleReconnect}
            style={{
              backgroundImage: 'url(/images/end-button.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        )}


        </div>
      </div>
    </div>
  );
};

export default GameEndingModal;
