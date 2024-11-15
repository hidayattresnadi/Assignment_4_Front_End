import axios from "axios";
import { useEffect, useState } from "react";
import LoadingSpinner from "../elements/loading";

const BorrowBookForm = ({ members, setMembers, books,setBooks, onSubmit }) => {
    const [ErrorStatus, setErrorStatus] = useState();
    const [Loading, setLoading] = useState();

    useEffect(() => {
        const loadData = async () => {
            try {
                const BookResponse = await axios.get(`http://localhost:5184/Book`);
                setBooks(BookResponse.data);

                const memberResponse = await axios.get(`http://localhost:5184/User`);
                setMembers(memberResponse.data);
            } catch (error) {
                setErrorStatus(true);
                console.log(error);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
            }
        };
        loadData();
    }, [setBooks, setMembers, setErrorStatus]);

    const [formData, setFormData] = useState({
        userId: "",
        borrowedBooks: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddBook = (bookId) => {
        if (formData.borrowedBooks.length < 3 && !formData.borrowedBooks.includes(bookId)) {
            setFormData({
                ...formData,
                borrowedBooks: [...formData.borrowedBooks, bookId],
            });
        }
    };

    const handleRemoveBook = (bookId) => {
        setFormData({
            ...formData,
            borrowedBooks: formData.borrowedBooks.filter((id) => id !== bookId),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({
            userId: "",
            borrowedDate: "",
            dueDate: "",
            borrowedBooks: [],
        });
    };

    if (Loading) return <LoadingSpinner />;
    if (ErrorStatus) return <p>Error loading employees</p>;

    return (
        <form onSubmit={handleSubmit} className="container mt-4">
            <h3 className="mb-4">Borrow Book</h3>

            {/* User Dropdown */}
            <div className="mb-3">
                <label htmlFor="userId" className="form-label">
                    Select User
                </label>
                <select
                    id="userId"
                    name="userId"
                    className="form-select"
                    value={formData.userId}
                    onChange={handleChange}
                    required
                >
                    <option value="">-- Select User --</option>
                    {members.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Borrowed Books */}
            <div className="mb-3">
                <label className="form-label">Select Books (Max 3)</label>
                <div className="d-flex flex-wrap">
                    {books.map((book) => (
                        <div key={book.id} className="me-2 mb-2">
                            <button
                                type="button"
                                className={`btn ${formData.borrowedBooks.includes(book.id) ? "btn-success" : "btn-outline-primary"}`}
                                onClick={() =>
                                    formData.borrowedBooks.includes(book.id)
                                        ? handleRemoveBook(book.id)
                                        : handleAddBook(book.id)
                                }
                                disabled={!formData.borrowedBooks.includes(book.id) && formData.borrowedBooks.length >= 3}
                            >
                                {formData.borrowedBooks.includes(book.id) ? "Remove" : "Add"} {book.title}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <button type="submit" className="btn btn-primary">
                Borrow Books
            </button>
        </form>
    );
};

export default BorrowBookForm;
