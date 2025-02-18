import React from 'react';
import { SOCKET_EMIT_EVENTS } from '../sockets/events';
import socket from '../sockets/socket';
import AttackButton from './AttackButton';
import EndGameButton from './EndGameButton';
import PotionContainer from './PotionContainer';
import useStore from '../store/useStore';
import { Potion } from '../interfaces/Potion';

interface ActionsProps {
  potions: Potion[];
  openModal: (potion: Potion) => void;
}

const Actions: React.FC<ActionsProps> = ({ potions, openModal }) => {
  const {
    isMyTurn,
    setIsMyTurn,
    selectedPlayer,
    player,
  } = useStore();

  const classNameEndGameButton = 'p-16 z-75';

  return (
    <div className="flex flex-col items-center justify-center w-full h-[49%] border-0 border-yellow-400">
      <AttackButton
        player={player}
        onClick={() => {
          console.log('Attacking ', selectedPlayer?._id);
          socket.emit(SOCKET_EMIT_EVENTS.ATTACK, selectedPlayer?._id);
          setIsMyTurn(false);
        }}
        isMyTurn={isMyTurn}
        selectedPlayer={selectedPlayer}
      />
      {(player?.role === 'mortimer') && (
        <div className='w-full flex items-center place-self-center justify-center mt-[10%]'>
          <EndGameButton classNameCss={classNameEndGameButton} />
        </div>
      )}      
      <div className='w-full flex items-center justify-center m-[10%]'>
        <PotionContainer
          potions={potions}
          onClick={openModal}
        />
      </div>
    </div>
  );
};

export default Actions;
