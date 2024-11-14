import { useNavigate } from 'react-router-dom';
import TableBooks from '../modules/tableBooks';
import TableLayout from '../templates/TableLayout';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../elements/loading';
import axios from "axios";

function BooksPage({ columns = { columns },setBooks, books }) {
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
    }, [books]);
    
        
    return (
        <>
        {loading ?  <LoadingSpinner/> : ErrorStatus ? <div><h1>Terjadi Gangguan...</h1></div> : <TableLayout title="List of Books" buttonTitle={buttonTitle} onClick={onClick}>
            <TableBooks columns={columns} books={books} />
        </TableLayout>  }
        </> 
    )
}

export default BooksPage;