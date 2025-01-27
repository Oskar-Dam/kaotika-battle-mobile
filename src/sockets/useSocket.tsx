import { useEffect } from 'react';
import socket from './socket';

/**
 * Hook to handle socket events.
 * @param event - Name of the event to listen to.
 * @param callback - Function to execute when the event is received.
 */
const useSocket = (event: string, callback: (...args: unknown[]) => void) => {
  useEffect(() => {
    // Register the event
    socket.on(event, callback);

    // Clean up the listener when the component is unmounted
    return () => {
      socket.off(event, callback);
    };
  }, [event, callback]);

  return socket;
};

export default useSocket;