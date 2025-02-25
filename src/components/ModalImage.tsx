import React from 'react';

interface ModalImageProps {
  src: string;
  alt: string;
}

const ModalImage: React.FC<ModalImageProps> = ({ src, alt }) => {
  return <img
    src={src}
    alt={alt}
    className='h-[95%] mb-4 bg-blue-500 rounded-lg  shadow-black' />;
};

export default ModalImage;
