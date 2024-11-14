import { useParams } from 'react-router-dom';
import MemberDetailCard from '../modules/memberCard';
import DetailLayout from '../templates/detailLayout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../elements/loading';

function MemberDetailPage({ setEditingMember, editingMember }) {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const myFetch = async () => {
            try {
                const response = await axios.get(`http://localhost:5184/User/${id}`);
                setEditingMember(response.data);
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
    }, [id, setEditingMember]);

    if (loading) {
        return <LoadingSpinner/>; 
    }

    if (error) {
        return <div>{error}</div>; 
    }

    return (
        <DetailLayout title={'Member Details'}>
            <MemberDetailCard
            detailMember={editingMember}
        />
        </DetailLayout>
    )
}

export default MemberDetailPage;