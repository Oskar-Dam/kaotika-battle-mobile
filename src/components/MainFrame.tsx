// import React from 'react';
// import StaminaBar from './StaminaBar';
// import HitPointsBar from './HitPointsBar';
// import Avatar from './Avatar';
// import useStore from '../store/useStore';

// interface MainFrameProps {
//   frameBackground: string;
// }

// const MainFrame: React.FC<MainFrameProps> = ({frameBackground}) => {

//   const {player, selectedPlayer, openModal} = useStore();

//   return(
//     <div
//       className='w-screen h-screen flex flex-col items-center justify-center top-0 z-20'
//       style={{ backgroundImage: frameBackground, backgroundSize: '100% 100%' }}
//       data-testid="battle-screen"
//     >
//       <StaminaBar/>
//       <HitPointsBar/>

//       {/* AVATAR */}
//       <Avatar
//         avatar={player?.avatar}
//         faction={player?.isBetrayer}/>

//       {/* CAROUSEL CONTAINER */}
//       <CarouselContainer/>
        
//       {/* SELECTED PLAYER NICK */}
//       <NickName nickname={selectedPlayer?.nickname} />

//       {/* ACTION BUTTONS */}
//       <Actions
//         openModal={openModal}
//       />
//     </div>
//   );
// };
// export default MainFrame;