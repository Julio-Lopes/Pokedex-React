import { create } from "zustand";
import type { PokemonTab } from "@/types/pokemon";

interface PokemonStore {
  selectedId: number | null;
  searchQuery: string;
  activeType: string;
  activeTab: PokemonTab;
  showShiny: boolean;
  setSelectedId: (id: number | null) => void;
  setSearchQuery: (q: string) => void;
  setActiveType: (t: string) => void;
  setActiveTab: (tab: PokemonTab) => void;
  toggleShiny: () => void;
}

export const usePokemonStore = create<PokemonStore>((set) => ({
  selectedId: null,
  searchQuery: "",
  activeType: "all",
  activeTab: "status",
  showShiny: false,
  setSelectedId: (id) => set({ selectedId: id, activeTab: "status", showShiny: false }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setActiveType: (activeType) => set({ activeType }),
  setActiveTab: (activeTab) => set({ activeTab }),
  toggleShiny: () => set((s) => ({ showShiny: !s.showShiny })),
}));