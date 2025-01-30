interface StaminaBarProps {

}

const StaminaBar: React.FC<StaminaBarProps> = ({ }) => {

  return (
    <div
      className="absolute top-[2.65%] left-[12.7%]"
    >
      <img
        src="/images/stamina_bar.webp"
        alt={"?"}
        className="w-[10.7vh] mb-2"
      />
    </div>
  );
};

export default StaminaBar;