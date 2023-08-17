
import { create } from "zustand";

// Store para guardar valores de manera global
const useEventsResults = create((set) => ({
    data: [],
    error: null,
    isLoading: false,
    fetchEvents: async (params) => {
        try {
            set(() => ({isLoading: true}));

            const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${import.meta.env.VITE_TICKETMASTER_API_KEY}&countryCode=MX${params}`);
            const data = await response.json();
            set(() => ({data, isLoading: false}))

         } catch (error) {
            set(() => ({error}));
        }
       },
}));

export default useEventsResults;