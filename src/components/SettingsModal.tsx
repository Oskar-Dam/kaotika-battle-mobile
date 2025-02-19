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
      className="w-full rounded-3xl fixed inset-0 z-55 flex-row items-end justify-center place-self-center h-screen bg-darkBlue/50 overflow-y-hidden "
      data-testid="setting-modal"
    >
      <div className="w-full text-4xl text-white text-center mt-4">
        <h2 className="text-6xl font-bold mb-4 text-medievalSepia">Settings</h2>
      </div>
    
      
      {(player.role === 'mortimer') && (
        <div className="w-full text-4xl text-white text-center h-[49%]">
          <EndGameButton classNameCss={classNameEndGameButton} />
        </div>

      )}
      <div className='items-center justify-center text-medievalSepia place-self-center'>
        <button
          className={'relative border-darkSepia border-2 px-12 py-8 text-5xl font-bold text-gray-100 z-10'}
          style={{
            // backgroundImage: 'url(/images/settings-button.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          onClick={handleOnClick}
          data-testid="setting-modal"
        >
        Close Modal
        </button>
      </div>  

    </div>
    
  );
};

export default SettingModal;