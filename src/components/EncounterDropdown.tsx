import React, { useState } from 'react';

const levels = ['1-5', '6-10', '11-15', '16-20', '21-25', '26-30'];

const EncounterDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selection, setSelection] = useState(levels[0]);

  return (
    <div className="flex flex-col items-center relative">
      <label className="text-white text-3xl underline underline-thin mb-6">
        ENCOUNTER LEVEL
      </label>
      <div className="relative w-[40%]">
        {/* Selected Value */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          onBlur={() => setIsOpen(false)}
          className="text-orange-400 bg-gray-800 border-2 border-gray-600 rounded-lg p-2 w-full text-3xl text-left flex justify-between items-center"
        >
          {selection}
          <span className="ml-2 text-xs">&#9660;</span> {/* Smaller down arrow */}
        </button>

        {/* Dropdown List */}
        {isOpen && (
          <div className="absolute w-full bg-gray-800 border-2 border-gray-600 rounded-lg mt-0.5 z-10 overflow-hidden">
            <ul className="max-h-36 overflow-y-auto">
              {levels.map((level, index) => (
                <li
                  key={index}
                  onMouseDown={() => {
                    setSelection(level);
                    setIsOpen(false);
                  }}
                  className="p-2 text-orange-400 text-2xl hover:bg-gray-700 cursor-pointer"
                >
                  {level}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default EncounterDropdown;
