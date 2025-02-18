import React from 'react';
import useStore from '../store/useStore';

interface StaminaBarProps {
}

const StaminaBar: React.FC<StaminaBarProps> = () => {
  const {player, maxPercent} = useStore();

  const actualPercent = player.attributes.resistance / player.base_attributes.resistance * maxPercent;

  return (
    <div
      className="top-0 left-0"
    >
      <img
        style={{ maskImage: `linear-gradient(to right, white ${actualPercent}%, transparent ${actualPercent + 10}%)` }}
        src="/images/stamina-bar.webp"
        alt={'?'}
        className="absolute w-[23%] left-[13.3%] top-[2.7%]"
      />
    </div>
  );
};

export default StaminaBar;