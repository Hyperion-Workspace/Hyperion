import { create } from "zustand";

export type PanelType = "upgrade" | "account" | "billing" | null;

interface PanelState {
  activePanel: PanelType;
  closePanel: () => void;
  openPanel: (panel: PanelType) => void;
}

export const usePanelStore = create<PanelState>((set) => ({
  activePanel: null,
  openPanel: (panel) => set({ activePanel: panel }),
  closePanel: () => set({ activePanel: null }),
}));
