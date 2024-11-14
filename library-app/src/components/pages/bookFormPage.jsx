import { useParams } from 'react-router-dom';
import Form from '../modules/bookForm';
import FormLayout from '../templates/FormLayout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../elements/loading';
import { successSwal, validateInputBook } from '../../helper';

function BookFormPage({ setBooks,setErrors, errors, setCategories, setEditingBook, editingBook, categories, isFormOpen, setIsFormOpen }) {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [ErrorStatus, setErrorStatus] = useState();

    const addBook = async (book) => {
        const listErrors = await validateInputBook(book);
        setErrors(listErrors);

        if (Object.keys(listErrors).length === 0) {
            book.categoryId = parseInt(book.categoryId);
            await axios.post('http://localhost:5184/Book', book)
            successSwal('Book Added successfully');
        }
        return listErrors;
    };

    const updateBook = async (book) => {
        const listErrors = await validateInputBook(book, editingBook.isbn);
        setErrors(listErrors);

        if (Object.keys(listErrors).length === 0) {
            book.categoryId = parseInt(book.categoryId);
            await axios.put(`http://localhost:5184/Book/${id}`, book)
            successSwal('Book Edited successfully');
            setEditingBook(null);
        }
        return listErrors;
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const categoryResponse = await axios.get(`http://localhost:5184/Category`);
                setCategories(categoryResponse.data);
    
                if (!id) {
                    setLoading(false); 
                    setIsFormOpen(true);
                    return;
                }
    
                const bookResponse = await axios.get(`http://localhost:5184/Book/${id}`);
                setEditingBook(bookResponse.data);
                setIsFormOpen(true);
            } catch (error) {
                setErrorStatus(true);
                console.log(error);
            } finally {
                setLoading(false); 
            }
        };
        loadData();
    }, [id,setCategories, setIsFormOpen,setEditingBook]);
    


    return (
        <>
            {loading ? <LoadingSpinner /> : ErrorStatus ? <div><h1>Terjadi Gangguan...</h1></div> :
                <FormLayout title={id ? "Form to Update Book" : "Form to Add Book"}>
                    <Form
                        addBook={addBook}
                        setBooks={setBooks}
                        updateBook={updateBook}
                        editingBook={editingBook}
                        categories={categories}
                        isFormOpen={isFormOpen}
                        setIsFormOpen={setIsFormOpen}
                        errors={errors}
                    />
                </FormLayout>
            }
        </>
    );
}

export default BookFormPage;
