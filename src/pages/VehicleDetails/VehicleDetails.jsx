import {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import {fetchVehicleById} from '../../api/vehiclesApi';
import {useLocalStorage} from '../../hooks/useLocalStorage';
import {CommentForm} from '../../components/CommentForm/CommentForm';
import styles from './VehicleDetails.module.scss';

export function VehicleDetails() {
    const {id} = useParams();
    const [vehicle, setVehicle] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [localComments, setLocalComments] = useLocalStorage(`comments-${id}`, []);

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

    const handleAddComment = (newComment) => {
        setLocalComments([...localComments, newComment]);
    };

    if (isLoading) return <div className={styles.message}>Loading...</div>;
    if (error || !vehicle) return <div className={styles.error}>{error}</div>;

    const allComments = [...(vehicle.reviews) || [], ...localComments];

    return (
        <div className={styles.container}>
            <Link to="/" className={styles.backLink}>&larr; Back to Home</Link>

            <div className={styles.contentLayout}>
                <div className={styles.infoBlock}>
                    <img src={vehicle.images[0] || vehicle.thumbnail} alt={vehicle.title} className={styles.image} />
                    <div className={styles.details}>
                        <h2>{vehicle.title} <span className={styles.brand}>({vehicle.brand})</span></h2>
                        <p className={styles.price}>${vehicle.price}</p>
                        <p className={styles.description}>{vehicle.description}</p>

                        <ul className={styles.meta}>
                            <li><strong>Rating:</strong> {vehicle.rating} / 5</li>
                            <li><strong>In stock:</strong> {vehicle.stock}</li>
                            <li><strong>Warranty:</strong> {vehicle.warrantyInformation}</li>
                        </ul>
                    </div>
                </div>

                <div className={styles.commentsBlock}>
                    <h3>Reviews ({allComments.length})</h3>

                    <div className={styles.commentsList}>
                        {allComments.length > 0 ? (
                            allComments.map((review, index) => (
                                <div key={index} className={styles.commentItem}>
                                    <div className={styles.commentHeader}>
                                        <strong>{review.reviewerName}</strong>
                                        <span className={styles.date}>
                                            {new Date(review.date).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className={styles.commentText}>{review.comment}</p>
                                    </div>
                            ))
                        ) : (
                            <p className={styles.noComments}>No reviews yet. Be the first to review!</p>
                        )}
                    </div>

                    <CommentForm onAddComment={handleAddComment} />
                </div>
            </div>
        </div>
    );
} 