interface NickNameProps {
  nickname: string;
}


const NickName: React.FC<NickNameProps> = ({nickname}) => {
  return (
    <div className="w-full h-[2%] flex items-center justify-center">{nickname}
    </div>
  );
};

export default NickName;
