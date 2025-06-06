import { create } from 'zustand';
import { Battle } from '../interfaces/Battle';
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
  isBattleSelected: boolean;
  isAdventureSelected: boolean;
  selectedPlayer: Player | undefined;
  selectedPlayerIndex: number;
  maxPercent: number;
  gameSelected: boolean;
  gameCreated: boolean;
  gameJoined: boolean;
  selectedBattle: Battle;
  battles: Battle[];
  gameStarted: boolean;
  gameEnded: boolean;
  setGameEnded: (gameEnded: boolean) => void;
  setGameStarted: (gameStarted: boolean) => void;
  setBattles: (battles: Battle[]) => void;
  setSelectedBattle: (battle: Battle) => void;
  setGameJoined: (gameJoined: boolean) => void;
  setGameCreated: (gameCreated: boolean) => void;
  setGameSelected: (loggedIn: boolean) => void;
  setIsLoggedIn: (loggedIn: boolean) => void;
  setIsBattleSelected: (battleSelected: boolean) => void;
  setIsAdventureSelected: (adventureSelected: boolean) => void;
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
  isBattleSelected: false,
  isAdventureSelected: false,
  selectedPlayer: undefined,
  selectedPlayerIndex: 1,
  maxPercent: 100,
  gameSelected: false,
  gameCreated: false,
  gameJoined: false,
  selectedBattle: null!,
  battles: [],
  gameStarted: false,
  gameEnded: false,
  setGameEnded: (gameEnded) => set({ gameEnded }),
  setGameStarted: (gameStarted) => set({ gameStarted }),
  setBattles: (battles) => set({ battles }),
  setSelectedBattle: (battle) => set({ selectedBattle: battle }),
  setGameJoined: (gameJoined) => set({ gameJoined: gameJoined }),
  setGameCreated: (gameCreated) => set({ gameCreated: gameCreated }),
  setGameSelected: (gameSelected) => set({ gameSelected: gameSelected }),
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
  setIsBattleSelected: (battleSelected) => set({ isBattleSelected: battleSelected }),
  setIsAdventureSelected: (adventureSelected) => set({ isAdventureSelected: adventureSelected }),
}));

export default useStore;