import { useNavigate } from 'react-router-dom';
import TableMembers from '../modules/tableMembers';
import TableLayout from '../templates/TableLayout';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../elements/loading';
import axios from 'axios';
import Container from '../elements/container';

function MembersPage({ columns = { columns }, members, setMembers = setMembers }) {
    const navigate = useNavigate();
    const buttonTitle = 'Add Member';
    const onClick = ()=>navigate('/members/add')
    const [loading, setLoading] = useState(true);
    const [ErrorStatus, setErrorStatus] = useState();

    useEffect(() => {
        const myFetch = async () => {
            try {
                let response = await axios.get(`http://localhost:5184/User`);
                setMembers(response.data);
            }
            catch (error) {
                setErrorStatus(true);
                console.log(error);
            }
            finally {
                setTimeout(() => {
                    setLoading(false);
                }, 3000);
            }
        }
        myFetch();
    }, [members])

    return (
        <>
        {loading ? ErrorStatus ? <Container><h1>Terjadi Gangguan...</h1></Container> :  <LoadingSpinner/> : <TableLayout title="List of Members" buttonTitle={buttonTitle} onClick={onClick} >
            <TableMembers columns={columns} members={members} />
        </TableLayout> }
        </>
    )
}

export default MembersPage;