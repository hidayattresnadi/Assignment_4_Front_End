import { useState, useEffect, useRef } from 'react';
import InputField from '../widgets/inputField';
import SelectField from '../widgets/selectField';
import Button from '../elements/button';
import { useNavigate } from 'react-router-dom';
import Checkbox from '../elements/checkbox';
import axios from 'axios';

const BookForm = ({ addBook, updateBook, editingBook, categories, isFormOpen, setIsFormOpen, errors, setBooks }) => {
    const navigate = useNavigate();
    const titleInputRef = useRef();
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        categoryId: '',
        publicationYear: '',
        isbn: '',
        availability: false
    });

    useEffect(() => {
        if (editingBook) {
            setFormData({
                title: editingBook.title,
                author: editingBook.author,
                categoryId: editingBook.categoryId,
                publicationYear: editingBook.publicationYear,
                isbn: editingBook.isbn,
                availability: editingBook.availability
            });
        } else {
            setFormData({
                title: '',
                author: '',
                categoryId: '',
                publicationYear: '',
                isbn: '',
                availability: false
            });
        }
    }, [editingBook]);

    useEffect(() => {
        if (isFormOpen && titleInputRef.current) {
            titleInputRef.current.focus();
        }
    }, [isFormOpen]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editingBook) {
            const result = await updateBook(formData);
            if (Object.keys(result).length === 0) {
                setFormData({
                    title: '',
                    author: '',
                    categoryId: '',
                    publicationYear: '',
                    isbn: '',
                    availability: false
                })
                setIsFormOpen(false)
                const response = await axios.get(`http://localhost:5184/Book`)
                const dataJson = response.data
                await setBooks(dataJson)
                navigate("/books")
            }

        } else {
            const result = await addBook(formData);
            if (Object.keys(result).length === 0) {
                setFormData({
                    title: '',
                    author: '',
                    categoryId: '',
                    publicationYear: '',
                    isbn: '',
                    availability: false
                });
                setIsFormOpen(false);
            }
        }
    };

    const openForm = () => {
        setIsFormOpen(true);
    };

    const optionss = [
        { id: true, label: 'Is Available' },
    ];

    return (
        <>
            <form onSubmit={handleSubmit}>
                <InputField
                    label="Title"
                    type="text"
                    ref={titleInputRef}
                    id="title"
                    value={formData.title}
                    onChange={handleInputChange}
                />
                {errors?.title ? <h6 className='text-start'>{errors.title}</h6> : ''}
                <InputField
                    label="Author"
                    type="text"
                    id="author"
                    value={formData.author}
                    onChange={handleInputChange}
                />
                {errors?.author ? <h6 className='text-start'>{errors.author}</h6> : ''}
                <InputField
                    label="Publication Year"
                    type="text"
                    placeholder="Example: 2023"
                    pattern="\d*"
                    id="publicationYear"
                    value={formData.publicationYear}
                    onChange={handleInputChange}
                />
                {errors?.publicationYear ? <h6 className='text-start'>{errors.publicationYear}</h6> : ''}
                <InputField
                    label="ISBN"
                    type="text"
                    id="isbn"
                    value={formData.isbn}
                    onChange={handleInputChange}
                />
                {errors?.isbn ? <h6 className='text-start'>{errors.isbn}</h6> : ''}
                <SelectField
                    label="Book Category"
                    id="categoryId"
                    options={categories}
                    value={formData.categoryId}
                    onChange={handleInputChange}
                    className="form-select"
                />
                {errors?.bookCategory ? <h6 className='text-start'>{errors.bookCategory}</h6> : ''}

                <Checkbox
                    options={optionss}
                    checked={formData.availability}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.checked })}
                    label='Is Available'
                />
                <Button onClick={openForm} type="submit" className="btn btn-primary mt-3 w-100">
                    Submit
                </Button>
            </form>
        </>
    );
};

export default BookForm;
