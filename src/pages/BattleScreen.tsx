import { useState, useEffect } from 'react';
import { Potion } from '../interfaces/Potion';
import Actions from '../components/Actions';
import CarouselContainer from '../components/CarouselContainer';
import socket from '../sockets/socket';
import Waiting from '../components/Waiting';
import PotionModal from '../components/PotionModal';
import BlockedScreen from '../components/BlockedScreen';
import Avatar from '../components/Avatar';
import NickName from '../components/NickName';
import StaminaBar from '../components/StaminaBar';
import HitPointsBar from '../components/HitPointsBar';
import { Factions } from '../interfaces/Factions';
import { listenToRemovePlayer, listenToUpdatePlayer } from '../sockets/socketListeners';
import { Player } from '../interfaces/Player';
interface BattleScreenProps {
  potions: Potion[];
  player: Player | null;
  isMyTurn: boolean;
  setIsMyTurn: React.Dispatch<React.SetStateAction<boolean>>;
}

const BattleScreen: React.FC<BattleScreenProps> = ({
  potions, player, isMyTurn, setIsMyTurn
}) => {

  const [selectedPotion, setSelectedPotion] = useState<Potion | null>(null);
  const [showWaitingScreen, setShowWaitingScreen] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player>();
  const [filteredFaction, setFilteredFaction] = useState<Factions|undefined>(undefined);
  const [kaotikaPlayers, setKaotikaPlayers] = useState<Player[]>([]);
  const [dravocarPlayers, setDravocarPlayers] = useState<Player[]>([]);

  useEffect(() => {

    listenToUpdatePlayer(setKaotikaPlayers, setDravocarPlayers, kaotikaPlayers, dravocarPlayers);
    listenToRemovePlayer(setKaotikaPlayers, setDravocarPlayers, kaotikaPlayers, dravocarPlayers);

    // ⬇️ MOCK PLAYERS ⬇️ // 
    // console.warn("Take into account that the players are Mocked!")
    // setKaotikaPlayers(factions.kaotika);
    // setDravocarPlayers(factions.dravocar);
  }, []);

  useEffect(() => {
    socket.on('assign-turn', (_id: string) => {
      if (player?._id === _id) {
        setIsMyTurn(true);
      } else {
        setIsMyTurn(false);
      }
    });

    return () => {
      socket.off('assign-turn');
    };
  }, [player, setIsMyTurn]);

  const openModal = (potion: Potion) => {
    setSelectedPotion(potion);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const frameBackground = player?.isBetrayer ? 'url(/images/frame-betrayer.webp)' : 'url(/images/frame-loyal.webp)';

  return (
    <>
      {!isMyTurn && <BlockedScreen />}

      {showWaitingScreen && (
        <Waiting 
          role={player?.role}
          setDravocarPlayers={setDravocarPlayers}
          setKaotikaPlayers={setKaotikaPlayers}
          setShowWaitingScreen={setShowWaitingScreen}
        />)
      }

      {/* MAIN FRAME */}
      <div
        className='w-screen h-screen flex flex-col items-center justify-center top-0 z-20'
        style={{ backgroundImage: frameBackground, backgroundSize: '100% 100%' }}
      >
        <StaminaBar
          resistance={player?.attributes.resistance ?? 0}
          base_resistance={player?.base_attributes.resistance ?? 0}
        />
        <HitPointsBar
          hp={player?.attributes.hit_points ?? 0}
          base_hp={player?.base_attributes.hit_points ?? 0}
        />

        {/* AVATAR */}
        <Avatar avatar={player?.avatar} />

        {/* CAROUSEL CONTAINER */}
        <CarouselContainer
          setSelectedPlayer={setSelectedPlayer}
          filteredFaction={filteredFaction}
          setFilteredFaction={setFilteredFaction}
          kaotikaPlayers={kaotikaPlayers}
          dravocarPlayers={dravocarPlayers}
          selectedPlayer={selectedPlayer!}
        />
        
        {/* SELECTED PLAYER NICK */}
        <NickName nickname={selectedPlayer?.nickname} />

        {/* ACTION BUTTONS */}
        {player && (
          <Actions
            playerId={player._id}
            potions={potions}
            openModal={openModal}
            isMyTurn={isMyTurn}
            setIsMyTurn={setIsMyTurn}/>
        )}

      </div>

      {isModalOpen && selectedPotion && (
        <PotionModal
          potion={selectedPotion}
          closeModal={closeModal}
        />
      )}
    </>
  );
};

export default BattleScreen;