import {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import {fetchVehicleById} from '../../api/vehiclesApi';
import {useLocalStorage} from '../../hooks/useLocalStorage';
import {ReviewForm} from '../../components/ReviewForm/ReviewForm';
import styles from './VehicleDetails.module.scss';

export function VehicleDetails() {
    const {id} = useParams();
    const [vehicle, setVehicle] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [localReviews, setLocalReviews] = useLocalStorage(`reviews-${id}`, []);

    useEffect(() => {
        const loadVehicle = async () => {
            try {
                const data = await fetchVehicleById(id);
                setVehicle(data);
            } catch (error) {
                setError('Failed to fetch vehicle details.');
            } finally {
                setIsLoading(false);
            }
        };

        loadVehicle();
    }, [id]);

    const handleAddReview = (newReview) => {
        setLocalReviews([...localReviews, newReview]);
    };

    if (isLoading) return <div className={styles.message}>Loading...</div>;
    if (error || !vehicle) return <div className={styles.error}>{error}</div>;

    const allReviews = [...(vehicle.reviews) || [], ...localReviews];

    return (
        <div className={styles.container}>
            <Link to="/" className={styles.backLink}>&larr; Back to Home</Link>

            <div className={styles.contentLayout}>
                <div className={styles.infoBlock}>
                    <img src={vehicle.images[0] || vehicle.thumbnail} alt={vehicle.title} className={styles.image} />
                    <div className={styles.details}>
                        <h2>{vehicle.brand} {vehicle.title}</h2>
                        <p className={styles.price}>${vehicle.price}</p>
                        <p className={styles.description}>{vehicle.description}</p>

                        <ul className={styles.meta}>
                            <li><strong>Rating:</strong> {vehicle.rating} / 5</li>
                            <li><strong>In stock:</strong> {vehicle.stock}</li>
                            <li><strong>Warranty:</strong> {vehicle.warrantyInformation}</li>
                        </ul>
                    </div>
                </div>

                <div className={styles.reviewsBlock}>
                    <h3>Reviews ({allReviews.length})</h3>

                    <div className={styles.reviewsList}>
                        {allReviews.length > 0 ? (
                            allReviews.map((review, index) => (
                                <div key={index} className={styles.reviewItem}>
                                    <div className={styles.reviewHeader}>
                                        <strong>{review.reviewerName}</strong>
                                        <span className={styles.date}>
                                            {new Date(review.date).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className={styles.reviewText}>{review.comment}</p>
                                    </div>
                            ))
                        ) : (
                            <p className={styles.noReviews}>No reviews yet. Be the first to review!</p>
                        )}
                    </div>

                    <ReviewForm onAddReview={handleAddReview} />
                </div>
            </div>
        </div>
    );
} 