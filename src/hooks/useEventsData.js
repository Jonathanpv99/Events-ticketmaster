import {  useState } from 'react';
//import eventsJson from '../data/events.json'


const useEventsData = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

     const fetchEvents = async (params) => {
        try {
            const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=pEpqjNqYmT7qPol77twiqFOE6YCC4XVQ&countryCode=MX${params}`);
            const data = await response.json();
            setData(data);
            setIsLoading(false);
         } catch (error) {
            setError(error);
        }
       };  

    return {
        events: data?._embedded?.events || [],
        page: data?.page || {},
        isLoading,
        error,
        fetchEvents,
    };
};

export default useEventsData;