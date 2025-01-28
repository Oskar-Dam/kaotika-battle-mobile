interface NickNameProps {
  nickname?: string;
}


const NickName: React.FC<NickNameProps> = ({nickname}) => {
  return (
    <div className="w-full h-[5.5%] flex items-center justify-center text-white text-3xl border-0 border-green-500" style={{ fontFamily: 'Kaotika' }}>{nickname}
    </div>
  );
};

export default NickName;
