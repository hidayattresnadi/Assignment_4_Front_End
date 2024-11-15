import { useNavigate } from 'react-router-dom';
import TableBooks from '../modules/tableBooks';
import TableLayout from '../templates/TableLayout';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../elements/loading';
import axios from "axios";
import Swal from 'sweetalert2';
import { successSwal } from '../../helper';

function BooksPage({ columns = { columns },setBooks, books, refresh, setRefresh }) {
    const navigate = useNavigate();
    const buttonTitle = 'Add Book';
    const onClick = ()=>navigate('/books/add')
    const [loading, setLoading] = useState(true);
    const [ErrorStatus, setErrorStatus] = useState();

    useEffect(() => {
        const myFetch = async () => {
            try {
                let response = await axios.get(`http://localhost:5184/Book`)
                setBooks(response.data)
            }
            catch (error) {
                setErrorStatus(true)
                console.log("Error:", error)
            }
            finally {
                setTimeout(() => {
                    setLoading(false)
                }, 1000);
            }
        };
    
        myFetch();
    }, [refresh]);

    const handleDeleteBook = (id) => {
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
                await axios.delete(`http://localhost:5184/Book/${id}`)
                successSwal('Book Deleted successfully');
                setRefresh(!refresh);
            }
        });
    };
    
        
    return (
        <>
        {loading ?  <LoadingSpinner/> : ErrorStatus ? <div><h1>Terjadi Gangguan...</h1></div> : <TableLayout title="List of Books" buttonTitle={buttonTitle} onClick={onClick}>
            <TableBooks columns={columns} books={books} handleDeleteBook={handleDeleteBook} />
        </TableLayout>  }
        </> 
    )
}

export default BooksPage;