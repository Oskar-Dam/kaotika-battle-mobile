import React from 'react';
import useStore from '../store/useStore';

interface HitPointsBarProps {
}
const HitPointsBar: React.FC<HitPointsBarProps> = () => {
  
  const {player, maxPercent} = useStore();

  const actualPercent = player.attributes.hit_points / player.base_attributes.hit_points * maxPercent;

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