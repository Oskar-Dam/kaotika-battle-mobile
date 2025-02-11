import React from 'react';

interface NickNameProps {
  nickname?: string;
}

const NickName: React.FC<NickNameProps> = ({nickname}) => {
  return (
    <div
      className="w-full h-[5.5%] flex items-center mb-[6%] justify-center text-white text-5xl border-0 border-green-500 break-words text-center"
      style={{ fontFamily: 'Kaotika' }}>{nickname}
    </div>
  );
};

export default NickName;