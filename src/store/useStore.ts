import { create } from 'zustand';
import { Player } from '../interfaces/Player';
import { Dispatch, SetStateAction } from 'react';

interface StoreState {
  isLoggedIn: boolean;
  email: string;
  player: Player | null;
  isMyTurn: boolean;
  isDisconnected: boolean;
  permanentlyDisconnected: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
  setEmail: (email: string) => void;
  setPlayer: Dispatch<SetStateAction<Player | null>>;
  setIsMyTurn: Dispatch<SetStateAction<boolean>>;
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
  setPlayer: (player) => set((state) => ({ player: typeof player === 'function' ? player(state.player) : player })),
  setIsMyTurn: (turn) => set((state) => ({ isMyTurn: typeof turn === 'function' ? turn(state.isMyTurn) : turn })),
  setIsDisconnected: (disconnected) => set({ isDisconnected: disconnected }),
  setPermanentlyDisconnected: (disconnected) => set({ permanentlyDisconnected: disconnected }),
}));

export default useStore;