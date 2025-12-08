import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useEventFormStore = create(
  persist(
    (set) => ({
      eventData: null,

      updateEventData: (newEventData) =>
        set(() => ({
          eventData: newEventData,
        })),
      clearEventData: () => {
        set({ eventData: null });
        localStorage.removeItem('zustand:persist:eventData');
      },
    }),
    {
      name: 'event-data-storage',
    }
  )
);

export default useEventFormStore;
