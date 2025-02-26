import React from 'react';

interface ModalImageProps {
  src: string;
  alt: string;
}

const ModalImage: React.FC<ModalImageProps> = ({ src, alt }) => {
  return <img
    src={src}
    alt={alt}
    className='h-[100%] mb-4 rounded-lg  shadow-black border-2 border-white'/>;
};

export default ModalImage;
