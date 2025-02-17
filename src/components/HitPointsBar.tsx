import React from 'react';

interface HitPointsBarProps {
  base_hp: number
  hp: number
}
const HitPointsBar: React.FC<HitPointsBarProps> = ({hp, base_hp}) => {

  const actualPercent = hp / base_hp * 100;

  return (
    <div
      className="top-0 -right-0"
    >
      <img
        style={{maskImage: `linear-gradient(to left, white ${actualPercent}%, transparent ${actualPercent + 10}%)`}}
        src="/images/hp-bar.webp"
        alt={'?'}
        className="absolute w-[23%] right-[11.9%] top-[2.7%]"
      />
    </div>
  );
};
export default HitPointsBar;