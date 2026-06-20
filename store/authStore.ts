"use client";

import { create } from "zustand";

interface MockUser {
  name: string;
  email: string;
}

interface AuthStore {
  user: MockUser | null;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

// Simulates a pre-authenticated user — no real auth flow needed for the demo
const MOCK_USER: MockUser = {
  name: "Chidi Okonkwo",
  email: "chidi@example.com",
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: MOCK_USER,
  isAuthenticated: true,
  login: () => set({ user: MOCK_USER, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
