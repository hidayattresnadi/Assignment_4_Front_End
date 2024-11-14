import TableHeader from '../widgets/tableHeader';
import TableBooksRow from '../widgets/tableBookRow';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { successSwal } from '../../helper';

const TableBooks = ({ books, columns}) => {
    const navigate = useNavigate();

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
            }
        });
    };

    return (
        <>
            <table key={books.length} className="table table-bordered text-center">
                <TableHeader columns={columns} />
                <tbody>
                    {books.map((book) => (
                        <TableBooksRow
                            key={book.id}
                            book={book}
                            onEdit={() => {
                                navigate(`/books/edit/${book.id}`)
                            }}
                            onDelete={() => handleDeleteBook(book.id)}
                            onDetail={() => {
                                navigate(`/books/${book.id}`)
                            }}
                        />
                    ))}
                </tbody>
            </table>
        </>

    )

};

export default TableBooks;
