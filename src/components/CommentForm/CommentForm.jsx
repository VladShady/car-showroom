import {useState} from 'react';
import styles from './CommentForm.module.scss';

export function CommentForm({onAddComment}) {
    const [name, setName] = useState('');
    const [text, setText] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name.trim() || !text.trim()) {
            setError('Both name and comment are required.');
            return;
        }

        if (text.length > 500) {
            setError('Comment cannot exceed 500 characters.');
            return;
        }

        const newComment = {
            reviewerName: name,
            comment: text,
            date: new Date().toISOString(),
            rating: 5,
        };

        onAddComment(newComment);

        setName('');
        setText('');
        setError('');
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h3 className={styles.title}>Add a Comment</h3>

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
                <label htmlFor="text">Comment:</label>
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