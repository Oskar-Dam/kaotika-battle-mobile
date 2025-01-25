import React from 'react';

interface AttackButtonProps {
    text: string;
    onClick: () => void;
}

const AttackButton: React.FC<AttackButtonProps> = ({ text, onClick }) => {

    return (
        <>
            <button
                onClick={onClick}
                className="relative px-8 py-4 text-lg font-bold text-gray-100 uppercase transition-transform duration-200 transform bg-gray-800 border-2 border-gray-600 rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 active:scale-95"
            >
                <span className="absolute inset-0 w-full h-full border-2 border-gray-400 rounded-lg opacity-20"></span>
                <span className="relative">{text}</span>
            </button>
        </>
    );
};

export default AttackButton;