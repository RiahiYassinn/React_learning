import { create } from "zustand";
import { persist } from "zustand/middleware";

const useFavoriteStore = create(
  persist(
    (set) => ({
      favorites: [],

      // Actions
      toggleFavorite: (eventId) =>
        set((state) => ({
          favorites: state.favorites.includes(eventId)
            ? state.favorites.filter(id => id !== eventId)
            : [...state.favorites, eventId]
        })),

      isFavorite: (eventId) => {
        return get().favorites.includes(eventId);
      },

      clearFavorites: () => set({ favorites: [] })
    }),
    {
      name: "favorite-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useFavoriteStore;