import {Link} from "react-router-dom";
import styles from './VehicleCard.module.scss';

export function VehicleCard({ vehicle }) {
    return (
        <article className={styles.card}>
            <div className={styles.imageWrapper}>
                <img src={vehicle.thumbnail} alt={vehicle.title} loading="lazy"/>
            </div>
            <div className={styles.content}>
                <h3 className={styles.title}>{vehicle.title}</h3>
                <p className={styles.brand}>{vehicle.brand}</p>
                <p className={styles.price}>${vehicle.price}</p>
            
                <Link to={`/vehicles/${vehicle.id}`} className={styles.button}>Details</Link>
            </div>
        </article>
    );
}