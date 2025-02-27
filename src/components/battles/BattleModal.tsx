import React from 'react';
import { Battle } from '../../interfaces/Battle';
import ModalHeader from '../ModalHeader';
import ModalImage from '../ModalImage';
import BattleDescription from './BattleDescription';
import BattleEnemies from './BattleEnemies';
import BattleSuggestions from './BattleSuggestions';

import { SOCKET_EMIT_EVENTS } from '../../sockets/events';
import socket from '../../sockets/socket';
import BattleModalButton from '../ModalButton';
import BattleRewards from './BattleRewards';

interface BattleModalProps {
  battle: Battle;
  onClose: () => void;
}

const BattleModal: React.FC<BattleModalProps> = ({ battle, onClose }) => {

  const handleBattleCreate = () => {
    onClose();
    console.log('Emit create game of the battle: ' + battle.name);
    socket.emit(SOCKET_EMIT_EVENTS.CREATE_GAME, battle._id);
  };

  return (
    <div className='fixed inset-0 py-2 flex justify-center items-start bg-black/90 z-50 overflow-auto'>
      <div className='flex flex-col bg-black/90 p-4 rounded h-full w-[90%] max-h-full'>
        <div className='flex-shrink-0 h-[10%]'>
          <ModalHeader name={battle.name} />
        </div>
        <div className='flex-shrink-0 h-[25%] w-full justify-center mb-2'>
          <ModalImage
            src={`/images/background/${battle.battle_background}`}
            alt='Battle' />
        </div>
        <div className='flex-grow overflow-auto w-full border-2 border-white rounded-lg mb-2'>
          <BattleDescription description={battle.description}/>
          <BattleEnemies enemies={battle.enemies}/>
          
          
          <BattleSuggestions battle={battle}></BattleSuggestions>
          <BattleRewards battle={battle}/>
        </div>
        <div className='flex flex-row h-[10%] mt-2 gap-2'>
          <BattleModalButton
            text='Create'
            color='green'
            onClick={handleBattleCreate} />
          <BattleModalButton
            text='Close'
            color='red'
            onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default BattleModal;
