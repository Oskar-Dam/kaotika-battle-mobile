interface NickNameProps {
  nickname: string;
}


const NickName: React.FC<NickNameProps> = ({nickname}) => {
  return (
    <div className="w-full h-[4%] flex items-center justify-center text-white">{nickname}
    </div>
  );
};

export default NickName;
