import Swal from 'sweetalert2';
import TableHeader from '../widgets/tableHeader';
import TableMemberRow from '../widgets/tableMemberRow';
import { useNavigate } from 'react-router-dom';
import { successSwal } from '../../helper';
import axios from 'axios';


const TableMembers = ({ members, columns }) => {
    const navigate = useNavigate();

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
                successSwal('User Deleted successfully');
            }
        });
    };
    
    return (
        <>
            <table className="table table-bordered text-center">
                <TableHeader columns={columns} />
                <tbody>
                    {members.map((member) => (
                        <TableMemberRow
                            key={member.userId}
                            member={member}
                            onEdit={() => {
                                navigate(`/members/edit/${member.userId}`)
                            }}
                            onDelete={() => handleDeleteUser(member.userId)}
                            onDetail={() => {
                                navigate(`/members/${member.userId}`)
                            }}
                        />
                    ))}
                </tbody>
            </table>
        </>

    )

};

export default TableMembers;
