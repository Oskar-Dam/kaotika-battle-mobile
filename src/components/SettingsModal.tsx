import useStore from '../store/useStore';
import EndGameButton from './EndGameButton';
import GameStartButton from './GameStartButton';


// the Waiting component is a modal that displays a spinner and a message while waiting for the game to start(mortimer) or if you are mortimer, you can start the game
interface SettingModalProps { }

const SettingModal: React.FC<SettingModalProps> = () => {

  const {
    setIsSettingModalOpen,
  } = useStore();

  const handleOnClick = () => {
    setIsSettingModalOpen(false);
  };

  return (
    <div
      className="w-full flex flex-col fixed inset-0 items-center justify-center z-55 grid-col-1 grid-row-3 place-self-center h-screen bg-darkBlue/90 overflow-y-hidden "
      data-testid="setting-modal"
    >

      <div className='h-[70%] flex flex-col items-center justify-between'>
        <img
          src={'/images/settings-button.webp'}
          alt={'settings'}
          className="place-self-center"
        />


        <EndGameButton/>
        <GameStartButton/>

        <button
          className="min-w-[90%] max-w-[90%] min-h-[15%] max-h-[15%] bg-black/50 text-white text-4xl rounded-4xl shadow-black shadow-xl border-2 border-white"
          onClick={handleOnClick}
          data-testid="setting-modal"
        >
          CLOSE
        </button>
      </div>
      
    </div>

  );
};

export default SettingModal;