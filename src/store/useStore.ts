import { create } from 'zustand';
import { Player } from '../interfaces/Player';

interface StoreState {
  isLoggedIn: boolean;
  email: string;
  player: Player | null;
  isMyTurn: boolean;
  isDisconnected: boolean;
  permanentlyDisconnected: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
  setEmail: (email: string) => void;
  setPlayer: (player: Player | null) => void;
  setIsMyTurn: (turn: boolean) => void;
  setIsDisconnected: (disconnected: boolean) => void;
  setPermanentlyDisconnected: (disconnected: boolean) => void;
}

const useStore = create<StoreState>((set) => ({
  isLoggedIn: false,
  email: '',
  player: null,
  isMyTurn: true,
  isDisconnected: false,
  permanentlyDisconnected: false,
  
  setIsLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),
  setEmail: (email) => set({ email }),
  setPlayer: (player) => set({ player }),
  setIsMyTurn: (turn) => set({ isMyTurn: turn }),
  setIsDisconnected: (disconnected) => set({ isDisconnected: disconnected }),
  setPermanentlyDisconnected: (disconnected) => set({ permanentlyDisconnected: disconnected }),
}));

export default useStore;