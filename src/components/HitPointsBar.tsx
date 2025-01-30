interface HitPointsBarProps {

}

const HitPointsBar: React.FC<HitPointsBarProps> = ({ }) => {

  return (
    <div
      className="absolute top-[2.65%] right-[11.4%]"
    >
      <img
        src="/images/hp-bar.webp"
        alt={"?"}
        className="w-[10.7vh] mb-2 object-contain rounded-lg"
      />
    </div>
  );
};

export default HitPointsBar;