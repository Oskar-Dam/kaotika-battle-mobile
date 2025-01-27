import React from 'react';
import Spinner from './Spinner';
import Button from './Button';

// the Waiting component is a modal that displays a spinner and a message while waiting for the game to start(mortimer) or if you are mortimer, you can start the game
interface WaitingProps {
    role?: string;
}
const Waiting: React.FC<WaitingProps> = ({role = "MORTIMER"}) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900/80 z-50">
           {role === "MORTIMER" ? <Button text={'Start the game'} onClick={() => {console.log("game started");
           }} /> : <Spinner text={'Waiting for Mortimer to start the game'} />}
        </div>
    );
};

export default Waiting;