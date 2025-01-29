import Avatar from "./Avatar";

interface ClassImageProps {
  avatar?: string
}

const ClassImage: React.FC<ClassImageProps> = ({ avatar }) => {
  return (
    <div className="flex justify-center w-full h-[58.5%] border-0 border-blue-500" >
      <Avatar avatar={avatar}/>
    </div>
  );
};

export default ClassImage;
