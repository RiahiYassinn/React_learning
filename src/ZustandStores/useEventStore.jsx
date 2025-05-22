import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getallEvents, deleteEvent, addEvent, editEvent } from "../services/api";

const useEventStore = create(
  persist(
    (set) => ({
      events: [],
      error: null,
      loading: false,

      // Actions
      populateEvents: (events) => set({ events }),
      
      fetchEvents: async () => {
        set({ loading: true });
        try {
          const response = await getallEvents();
          set({ events: response.data, error: null });
        } catch (error) {
          set({ error: error.message });
        } finally {
          set({ loading: false });
        }
      },

      addEvent: async (event) => {
        try {
          const response = await addEvent(event);
          set(state => ({ events: [...state.events, response.data] }));
          return response.data;
        } catch (error) {
          set({ error: error.message });
          throw error;
        }
      },

      updateEvent: async (id, updatedEvent) => {
        try {
          const response = await editEvent(id, updatedEvent);
          set(state => ({
            events: state.events.map(event => 
              event.id === id ? response.data : event
            )
          }));
          return response.data;
        } catch (error) {
          set({ error: error.message });
          throw error;
        }
      },

      deleteEvent: async (id) => {
        try {
          await deleteEvent(id);
          set(state => ({
            events: state.events.filter(event => event.id !== id)
          }));
        } catch (error) {
          set({ error: error.message });
          throw error;
        }
      }
    }),
    {
      name: "event-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useEventStore;