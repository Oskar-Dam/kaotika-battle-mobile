import React from 'react';
import AttackButton from './AttackButton';
import PotionContainer from './PotionContainer';
import { Potion } from '../interfaces/Potion';
import socket from '../sockets/socket';

interface ActionsProps {
  potions: Potion[];
  openModal: (potion: Potion) => void
  isMyTurn: boolean
  setIsMyTurn: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPlayer: string | undefined;
}

const Actions: React.FC<ActionsProps> = ({ potions, openModal, isMyTurn, setIsMyTurn, selectedPlayer  }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[49%] border-0 border-yellow-400">
      <AttackButton
        text={'Attack'}
        onClick={() => {
          console.log('Attacking ', selectedPlayer);
          socket.emit('mobile-attack', selectedPlayer);
          setIsMyTurn(false);
        }}
        isMyTurn={isMyTurn}
      />
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
