import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { format } from "date-fns"
import { es } from 'date-fns/locale';

import styles from './Detail.module.css'
import useEventsResults from '../../state/events-results';

const Detail = () => {
    const { data } = useEventsResults();
    const {eventId} = useParams();
    const [eventData, setEventData] = useState({});
    const [error,setError] = useState('');
    const[isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events/${eventId}.json?apikey=${import.meta.env.VITE_TICKETMASTER_API_KEY}`);
                const data = await response;
                setEventData(data);
                setIsLoading(false);
                isLoading(false);
            } catch (error) {
                setEventData({});
                setError(error);

            }
        };
        fetchEventData();
    },[]);

    if(isLoading && Object.keys(eventData) ===0){
        return <div>Cargando evento...</div>
    }

    if(Object.keys(error) > 0){
        return <div>{error}</div>
    }
    return(
        <div className={styles.container}>
            <div className={styles.mainInforContainer}>
                <img src={eventData.imges?.[0].url}  alt="imagen Evento" className={styles.eventImage}/>
                <h4 className={styles.eventName}>{eventData.name}</h4>
                <p className={styles.inforParagraph}>{eventData.info}</p>
                {eventData.dates.start.dateTime ? 
                <p className={styles.date}>
                    {format(new Date(eventData?.dates.start.dateTime), 'd LLLL yyyy H:mm',{ locate: es})}
                </p>
                : null}
                
            </div>
            <div className={styles.seatInfoContainer}>
                <h6 className={styles.seatTitle}>Mapa del evento</h6>
                <img src={eventData.satmap?.staticUrl} alt="mapa del evento" />
                <p className={styles.pleaceNote}>{eventData.pleaseNote}</p>
                <p className={styles.priceRange}>
                    Rangp de precios:
                    {eventData.priceRanges?.[0].min}-{eventData.priceRanges?.[0].max}
                    {eventData.priceRanges?.[0].currency}
                </p>
                <a href={eventData.url}>Ir por tus boletos</a>
            </div>
        </div>
    );
}

export default Detail;