interface HitPointsBarProps {
  base_hp: number
  hp: number
}
const HitPointsBar: React.FC<HitPointsBarProps> = ({hp, base_hp}) => {

  const actualPercent = hp / base_hp * 100;

  return (
    <div
      className="absolute top-[2.65%] right-[11.4%]"
    >
      <img
        style={{maskImage: `linear-gradient(to left, white ${actualPercent}%, transparent ${actualPercent + 10}%)`}}
        src="/images/hp-bar.webp"
        alt={"?"}
        className="w-[10.7vh] mb-2 object-contain rounded-lg"
      />
    </div>
  );
};
export default HitPointsBar;