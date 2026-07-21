import {useState} from 'react';
import styles from './ReviewForm.module.scss';

export function ReviewForm({onAddReview}) {
    const [name, setName] = useState('');
    const [text, setText] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name.trim() || !text.trim()) {
            setError('Both name and review are required.');
            return;
        }

        if (text.length > 500) {
            setError('Review cannot exceed 500 characters.');
            return;
        }

        const newReview = {
            reviewerName: name,
            comment: text,
            date: new Date().toISOString(),
            rating: 5,
        };

        onAddReview(newReview);

        setName('');
        setText('');
        setError('');
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h3 className={styles.title}>Add a Review</h3>

            {error && <div className={styles.error}>{error}</div>}

            <div className={styles.field}>
                <label htmlFor="name">Name:</label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="text">Review:</label>
                <textarea
                    id="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="What's on your mind?"
                    rows="4"
                />

                <small className={styles.counter}>
                    {text.length}/500 characters
                </small>
            </div>

            <button type="submit" className={styles.button}>
                Submit
            </button>
        </form>
    );
}
