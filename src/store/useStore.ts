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
  selectedPlayer: Player | undefined;
  selectedPlayerIndex: number;
  setIsLoggedIn: (loggedIn: boolean) => void;
  setEmail: (email: string) => void;
  setPlayer: (player: Player) => void;
  setIsMyTurn: (turn: boolean) => void;
  setIsDisconnected: (disconnected: boolean) => void;
  setPermanentlyDisconnected: (disconnected: boolean) => void;
  setSelectedPotion: (potion: Potion | null) => void;
  setIsPotionModalOpen: (isOpen: boolean) => void;
  setSelectedPlayer: (player: Player | undefined) => void;
  setSelectedPlayerIndex: (index: number) => void;
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
  selectedPlayer: undefined,
  selectedPlayerIndex: 1,
  
  setIsLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),
  setEmail: (email) => set({ email }),
  setPlayer: (player: Player) => set(() => ({ player: player })),
  setIsMyTurn: (turn) => set(() => ({ isMyTurn: turn })),
  setIsDisconnected: (disconnected) => set({ isDisconnected: disconnected }),
  setPermanentlyDisconnected: (disconnected) => set({ permanentlyDisconnected: disconnected }),
  setSelectedPotion: (potion) => set({ selectedPotion: potion }),
  setIsPotionModalOpen: (isOpen) => set({ isPotionModalOpen: isOpen }),
  setSelectedPlayer: (player) => set({ selectedPlayer: player }),
  setSelectedPlayerIndex: (index) => set({ selectedPlayerIndex: index }),
}));

export default useStore;