import {create} from 'zustand';
import { Player } from '../interfaces/Player';
import { Potion } from '../interfaces/Potion';

interface StoreState {
  isLoggedIn: boolean;
  email: string;
  player: Player;
  isMyTurn: boolean;
  isDisconnected: boolean;
  permanentlyDisconnected: boolean;
  selectedPotion: Potion | null;
  isPotionModalOpen: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
  setEmail: (email: string) => void;
  setPlayer: (players: Player) => void;
  setIsMyTurn: (turn: boolean) => void;
  setIsDisconnected: (disconnected: boolean) => void;
  setPermanentlyDisconnected: (disconnected: boolean) => void;
  setSelectedPotion: (potion: Potion | null) => void;
  setIsPotionModalOpen: (isOpen: boolean) => void;
}

const useStore = create<StoreState>((set) => ({
  isLoggedIn: false,
  email: '',
  player: null!,
  isMyTurn: true,
  isDisconnected: false,
  permanentlyDisconnected: false,
  selectedPotion: null,
  isPotionModalOpen: false,
  
  setIsLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),
  setEmail: (email) => set({ email }),
  setPlayer: (player: Player) => set(() => ({ player: player })),
  setIsMyTurn: (turn) => set(() => ({ isMyTurn: turn })),
  setIsDisconnected: (disconnected) => set({ isDisconnected: disconnected }),
  setPermanentlyDisconnected: (disconnected) => set({ permanentlyDisconnected: disconnected }),
  setSelectedPotion: (potion) => set({ selectedPotion: potion }),
  setIsPotionModalOpen: (isOpen) => set({ isPotionModalOpen: isOpen }),
}));

export default useStore;