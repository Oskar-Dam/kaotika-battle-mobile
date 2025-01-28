import React from 'react';

interface SelectOponentModalProps {
  closeModal: () => void;
}

const SelectOponentModal: React.FC<SelectOponentModalProps> = ({
  closeModal
}) => {
  return (
    <div className="w-full rounded-3xl fixed inset-0 z-50 flex items-center justify-center">
      <div className="w-[90%] h-[90%] rounded-3xl inset-0 z-50 flex items-center justify-center bg-black/90 ">
        <button
          onClick={closeModal}
          className="absolute top-[5%] right-[10%] text-black rounded-full text-xl font-bold mt-8 bg-white/70 px-3 py-1 hover:text-zinc-800/80"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default SelectOponentModal;