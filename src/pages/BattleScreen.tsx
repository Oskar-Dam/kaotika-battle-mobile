import { useState } from "react";
import { Potion } from "../interfaces/Potion";
import Actions from "../components/Actions";
import NickName from "../components/NickName";
import ClassImage from "../components/ClassImage"; // Import the new component
import socket from "../sockets/socket";
import PlayerInterface from "../interfaces/PlayerInterface";
import Waiting from "../components/Waiting";

interface BattleScreenProps {
  potions: Potion[];
  player: PlayerInterface | null;
  setAllPlayers: React.Dispatch<React.SetStateAction<PlayerInterface[]>>;
}

const BattleScreen: React.FC<BattleScreenProps> = ({
  potions, player,setAllPlayers
}) => {
  //remove this log when sockect is used for the first time
  console.log(socket);

  const [showWaitingScreen, setShowWaitingScreen] = useState(false);
  setShowWaitingScreen;

  const frameBackground = player?.isBetrayer ? 'url(/images/frame_betrayer.png)' : 'url(/images/frame_loyal.png)';

  return (
    <>
    {showWaitingScreen && <Waiting setAllPlayers={setAllPlayers} />}

      {/* MAIN FRAME */}
      <div  
        className='w-full h-screen flex flex-col items-center justify-center top-0'
        style={{ backgroundImage: frameBackground, backgroundSize: '100% 100%' }}
      >

        {/* AVATAR */}
        <ClassImage avatar={player?.avatar}/>

        {/* NICKNAME */}
        <NickName nickname={player?.nickname}/>

        {/* ACTION BUTTONS */}
        <Actions potions={potions} />

      </div>

    </>
  );
};

export default BattleScreen;