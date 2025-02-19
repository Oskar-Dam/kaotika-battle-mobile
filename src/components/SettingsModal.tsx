import useStore from '../store/useStore';
import EndGameButton from './EndGameButton';


// the Waiting component is a modal that displays a spinner and a message while waiting for the game to start(mortimer) or if you are mortimer, you can start the game
interface SettingModalProps {}

const SettingModal: React.FC<SettingModalProps> = () => {

  const classNameEndGameButton = 'p-16 z-75';

  const {
    setIsSettingModalOpen,
    player,
  } = useStore();

  const handleOnClick = () => {    
    setIsSettingModalOpen(false);
  };
  
  return (
    <div
      className="w-full fixed inset-0 z-55 flex-row grid-col-1 grid-row-3 items-end justify-center place-self-center h-screen bg-darkBlue/80 overflow-y-hidden "
      data-testid="setting-modal"
    >
      <div className="w-full text-4xl text-white text-center mt-4 h-1/3">
        {/* <h2 className="text-6xl font-bold mb-4 text-darkSepia">Settings</h2> */}
        <img
          src={'/images/settings-button.webp'}
          alt={'settings'}
          className="place-self-center"
        />
      </div>
    
      
      {(player.role === 'mortimer') && (
        <div className="w-full text-4xl text-white text-center h-1/3">
          <EndGameButton classNameCss={classNameEndGameButton} />
        </div>

      )}
      <div className='flex items-center justify-center text-medievalSepia place-self-center h-1/3'>
        <button
          className={' px-28 py-8 justify-center place-self-center text-5xl font-bold text-gray-100'}
          style={{
            backgroundImage: 'url(/images/setting-close-button.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          onClick={handleOnClick}
          data-testid="setting-modal"
        >
        </button>
      </div>  

    </div>
    
  );
};

export default SettingModal;