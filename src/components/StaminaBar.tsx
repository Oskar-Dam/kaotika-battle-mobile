import React from 'react';

interface StaminaBarProps {
  base_resistance: number
  resistance: number
}

const StaminaBar: React.FC<StaminaBarProps> = ({ resistance, base_resistance }) => {

  const actualPercent = resistance / base_resistance * 100;

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