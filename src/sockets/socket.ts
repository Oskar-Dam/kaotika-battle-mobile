import { io, Socket } from 'socket.io-client';
import { SOCKET_EVENTS } from './events';

// Read the server URL from the .env file
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000';

// Add a log to verify the URL
if (!SOCKET_URL) {
  throw new Error('[Socket.io] The server URL is not defined in the .env file');
}

// Socket configuration
const socket: Socket = io(SOCKET_URL, {
  autoConnect: true, // Automatic connection
  transports: ['websocket'], // Ensures the use of WebSockets
});

// Logs for main events
socket.on(SOCKET_EVENTS.CONNECT, () => {
  console.log('[Socket.io] Connected:', socket.id);
});

socket.on(SOCKET_EVENTS.DISCONNECT, (reason) => {
  console.log('[Socket.io] Disconnected:', reason);
});

socket.on(SOCKET_EVENTS.ERROR, (error) => {
  console.error('[Socket.io] Connection error:', error.message);
});

export default socket;