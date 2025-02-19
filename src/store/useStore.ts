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
  isSettingModalOpen: boolean;
  selectedPlayer: Player | undefined;
  selectedPlayerIndex: number;
  maxPercent: number;
  setIsLoggedIn: (loggedIn: boolean) => void;
  setEmail: (email: string) => void;
  setPlayer: (player: Player) => void;
  updatePlayerHitPoints: (newHitPoints: number) => void;
  updatePlayerStatus: (status: boolean) => void;
  setIsMyTurn: (turn: boolean) => void;
  setDravokarPlayers: (players: Player[]) => void;
  updateDravokarPlayerStatus: (_id: string, status: boolean) => void;
  updateDravokarPlayerHitPoints: (_id: string, newHitPoints: number) => void;
  setKaotikaPlayers: (players: Player[]) => void;
  updateKaotikaPlayerStatus: (_id: string, status: boolean) => void;
  updateKaotikaPlayerHitPoints: (_id: string, newHitPoints: number) => void;
  setIsDisconnected: (disconnected: boolean) => void;
  setPermanentlyDisconnected: (disconnected: boolean) => void;
  setSelectedPotion: (potion: Potion | null) => void;
  setIsPotionModalOpen: (isOpen: boolean) => void;
  setIsSettingModalOpen: (isOpen: boolean) => void;
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
  isSettingModalOpen: false,
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
  updatePlayerStatus: (status: boolean) =>
    set((state) => {
      if (!state.player) return state;

      return {
        player: {
          ...state.player,
          isAlive: status,
        },
      };
    }),
  setDravokarPlayers: (dravokarPlayers: Player[]) => set({ dravokarPlayers }),
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
  updateDravokarPlayerStatus: (_id, status) =>
    set((state) => ({
      dravokarPlayers: state.dravokarPlayers.map((player) =>
        player._id === _id
          ? {
            ...player,
            isAlive: status,
          }
          : player),
    })),
  setKaotikaPlayers: (kaotikaPlayers: Player[]) => set({ kaotikaPlayers }),
  updateKaotikaPlayerStatus: (_id, status) =>
    set((state) => ({
      kaotikaPlayers: state.kaotikaPlayers.map((player) =>
        player._id === _id
          ? {
            ...player,
            isAlive: status,
          }
          : player),
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
  setIsSettingModalOpen: (isOpen) => set({ isSettingModalOpen: isOpen }),
  setSelectedPlayer: (player) => set({ selectedPlayer: player }),
  setSelectedPlayerIndex: (index) => set({ selectedPlayerIndex: index }),
}));

export default useStore;