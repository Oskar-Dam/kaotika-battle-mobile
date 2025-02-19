import React from 'react';
import { useEffect, useState } from 'react';
import useStore from '../store/useStore';



const Avatar: React.FC= () => {

  const {player} = useStore();

  const avatar = player.avatar;
  const faction = player.isBetrayer;

  const [imgSrc, setImgSrc] = useState<string>('');

  useEffect(() => {
    const defaultImage = faction
      ? '/images/too_many_request_betrayer.webp'
      : '/images/too_many_request_loyal.webp';

    if (avatar) {
      const img = new Image();
      img.src = avatar;

      img.onload = () => setImgSrc(avatar);
      img.onerror = () => setImgSrc(defaultImage);
    } else {
      setImgSrc(defaultImage);
    }
  }, [avatar, faction]);

  return (
    <div className="flex relative top-[2vh] break-normal items-center justify-center border-2 border-amber-400 ml-[2%] -z-10">
      <img
        src={imgSrc}
        alt="Avatar"
        className="w-[9vh] mb-2 object-contain rounded-lg"
      />
    </div>
  );
};

export default Avatar;
