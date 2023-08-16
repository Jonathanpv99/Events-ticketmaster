//import './style.css'
import styles from './EventItem.module.css'
//import { Link } from 'react-router-dom';
const EventItem = ({info, name, image, onEventClick, id}) =>{
    const handleSeeMoreClick = (evt) => {
        evt.stopPropagation();
        onEventClick(id);
    }
    return (
    <div className={styles.eventItemContainer}>
        <img src={image} alt={name} />
        <div className={styles.eventInfoContainer}>
            <h4 className={styles.eventName}>{name}</h4>
            <p className={styles.eventInfo}>{info}</p>
            <button onClick={handleSeeMoreClick} className={styles.seemorButton}>
                {/*<Link to={`/detail/${id}`}>
                    Ver más
                </Link>*/}
                Ver más
            </button>
        </div>
    </div>
    
    );
}

export default EventItem;