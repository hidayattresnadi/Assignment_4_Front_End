import { useParams } from 'react-router-dom';
import BookDetailCard from '../modules/bookCard';
import DetailLayout from '../templates/detailLayout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../elements/loading';

function BookDetailPage({ setEditingBook, editingBook }) {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const myFetch = async () => {
            try {
                const response = await axios.get(`http://localhost:5184/Book/${id}`);
                setEditingBook(response.data);
            } catch (error) {
                setError('Failed to fetch book details');
                console.log("Error:", error);
            } finally {
                setTimeout(() => {
                    setLoading(false)
                }, 1000);
            }
        };

        myFetch();
    }, [id, setEditingBook]);

    if (loading) {
        return <LoadingSpinner/>; 
    }

    if (error) {
        return <div>{error}</div>; 
    }

    return (
        <DetailLayout title={'Book Details'}>
            <BookDetailCard
                detailBook={editingBook}
            />
        </DetailLayout>
    );
}

export default BookDetailPage;
