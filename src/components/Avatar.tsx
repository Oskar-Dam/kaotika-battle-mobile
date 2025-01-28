interface AvatarProps {
  avatar: string;
}

const Avatar: React.FC<AvatarProps> = ({ avatar }) => {
  console.log(avatar);
  
  return (
    <div
      className="flex h-[32%] break-normal items-center justify-center border-2 border-amber-400 ml-[3%] -z-10"
    >
      <img
        src={avatar}
        alt={"?"}
        className="w-[90%] mb-2 object-contain rounded-lg"
      />
    </div>
  );
};

export default Avatar;