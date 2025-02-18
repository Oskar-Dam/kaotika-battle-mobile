import { create } from 'zustand';
import { Player } from '../interfaces/Player';
import { Potion } from '../interfaces/Potion';

interface StoreState {
  isLoggedIn: boolean;
  email: string;
  player: Player;
  dravokarPlayers: Player[]
  kaotikaPlayers: Player[]
  isMyTurn: boolean;
  isDisconnected: boolean;
  permanentlyDisconnected: boolean;
  selectedPotion: Potion | null;
  isPotionModalOpen: boolean;
  selectedPlayer: Player | undefined;
  selectedPlayerIndex: number;
  maxPercent: number;
  setIsLoggedIn: (loggedIn: boolean) => void;
  setEmail: (email: string) => void;
  setPlayer: (player: Player) => void;
  updatePlayerHitPoints: (newHitPoints: number) => void;
  setIsMyTurn: (turn: boolean) => void;
  setDravokarPlayers: (players: Player[]) => void;
  removeDravokarPlayer: (_id: string) => void;
  updateDravokarPlayerHitPoints: (_id: string, newHitPoints: number) => void;
  setKaotikaPlayers: (players: Player[]) => void;
  removeKaotikaPlayer: (_id: string) => void;
  updateKaotikaPlayerHitPoints: (_id: string, newHitPoints: number) => void;
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
  dravokarPlayers: [],
  kaotikaPlayers: [],
  isMyTurn: true,
  isDisconnected: false,
  permanentlyDisconnected: false,
  selectedPotion: null,
  isPotionModalOpen: false,
  selectedPlayer: undefined,
  selectedPlayerIndex: 1,
  maxPercent: 100,
  
  setIsLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),
  setEmail: (email) => set({ email }),
  setIsMyTurn: (turn) => set(() => ({ isMyTurn: turn })),
  setPlayer: (player: Player) => set(() => ({ player: player })),
  updatePlayerHitPoints: (newHitPoints: number) =>
    set((state) => {
      if (!state.player) return state;

      return {
        player: {
          ...state.player,
          attributes: {
            ...state.player.attributes,
            hit_points: newHitPoints,
          },
        },
      };
    }),
  setDravokarPlayers: (dravokarPlayers: Player[]) => set({ dravokarPlayers }),
  removeDravokarPlayer: (_id) =>
    set((state) => ({
      dravokarPlayers: state.dravokarPlayers.filter((player) => player._id !== _id),
    })),
  updateDravokarPlayerHitPoints: (_id, newHitPoints) =>
    set((state) => ({
      dravokarPlayers: state.dravokarPlayers.map((player) =>
        player._id === _id
          ? {
            ...player,
            attributes: {
              ...player.attributes,
              hit_points: newHitPoints,
            },
          }
          : player),
    })),
  setKaotikaPlayers: (kaotikaPlayers: Player[]) => set({ kaotikaPlayers }),
  removeKaotikaPlayer: (_id) =>
    set((state) => ({
      kaotikaPlayers: state.kaotikaPlayers.filter((player) => player._id !== _id),
    })),
  updateKaotikaPlayerHitPoints: (_id, newHitPoints) =>
    set((state) => ({
      kaotikaPlayers: state.kaotikaPlayers.map((player) =>
        player._id === _id
          ? {
            ...player,
            attributes: {
              ...player.attributes,
              hit_points: newHitPoints,
            },
          }
          : player),
    })),
  setIsDisconnected: (disconnected) => set({ isDisconnected: disconnected }),
  setPermanentlyDisconnected: (disconnected) => set({ permanentlyDisconnected: disconnected }),
  setSelectedPotion: (potion) => set({ selectedPotion: potion }),
  setIsPotionModalOpen: (isOpen) => set({ isPotionModalOpen: isOpen }),
  setSelectedPlayer: (player) => set({ selectedPlayer: player }),
  setSelectedPlayerIndex: (index) => set({ selectedPlayerIndex: index }),
}));

export default useStore;