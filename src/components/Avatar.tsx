interface AvatarProps {
  avatar?: string;
}

const Avatar: React.FC<AvatarProps> = ({ avatar }) => {
  
  return (
    <div
      className="flex relative top-[2vh] break-normal items-center justify-center border-2 border-amber-400 ml-[2%] -z-10"
    >
      <img
        src={avatar}
        alt={"?"}
        className="w-[9vh] mb-2 object-contain rounded-lg"
      />
    </div>
  );
};

export default Avatar;