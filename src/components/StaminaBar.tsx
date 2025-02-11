import React from 'react';

interface StaminaBarProps {
  base_resistance: number
  resistance: number
}

const StaminaBar: React.FC<StaminaBarProps> = ({ resistance, base_resistance }) => {

  const actualPercent = resistance / base_resistance * 100;

  return (
    <div
      className="absolute top-[2.65%] left-[12.7%]"
    >
      <img
        style={{ maskImage: `linear-gradient(to right, white ${actualPercent}%, transparent ${actualPercent + 10}%)` }}
        src="/images/stamina-bar.webp"
        alt={'?'}
        className="w-[10.7vh] mb-2"
      />
    </div>
  );
};

export default StaminaBar;