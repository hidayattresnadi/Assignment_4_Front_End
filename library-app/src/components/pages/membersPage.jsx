import { useNavigate } from 'react-router-dom';
import TableMembers from '../modules/tableMembers';
import TableLayout from '../templates/TableLayout';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../elements/loading';
import axios from 'axios';
import Container from '../elements/container';
import Swal from 'sweetalert2';
import { successSwal } from '../../helper';

function MembersPage({ columns = { columns }, members, setMembers = setMembers, refresh, setRefresh }) {
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
    }, [refresh])

    const handleDeleteUser = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.delete(`http://localhost:5184/User/${id}`)
                successSwal('User Deleted successfully')
                setRefresh(!refresh)
            }
        });
    };

    return (
        <>
        {loading ? ErrorStatus ? <Container><h1>Terjadi Gangguan...</h1></Container> :  <LoadingSpinner/> : <TableLayout title="List of Members" buttonTitle={buttonTitle} onClick={onClick} >
            <TableMembers columns={columns} members={members} handleDeleteUser={handleDeleteUser} />
        </TableLayout> }
        </>
    )
}

export default MembersPage;