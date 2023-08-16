import { useParams } from "react-router-dom";
const Detail = () => {
    const {eventId} = useParams();
    return(
        <div>Detail</div>
    );
}

export default Detail;