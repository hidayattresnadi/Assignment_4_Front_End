import { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "../components/pages/homepage";
import Layout from "../components/templates/layout";
import BookFormPage from "../components/pages/bookFormPage";
import BooksPage from "../components/pages/booksPage";
import MembersPage from "../components/pages/membersPage";
import MemberFormPage from "../components/pages/memberFormPage";
import BookDetailPage from "../components/pages/bookDetailPage";
import MemberDetailPage from "../components/pages/memberDetailPage";
import BorrowBookForm from "../components/modules/borrowBookForm";

// Initial data and functions for book management
const columnsTableBooks = ["Title", "Author", "Category", "Publication Year", "ISBN", "Available", "Edit", "Delete", "Detail"];
const columnsTableMembers = ["Id", "Full Name", "Email", "Gender", "Phone", "Address", "Edit", "Delete", "Detail"];

const AppRouter = () => {
    const [books, setBooks] = useState();
    const [members, setMembers] = useState();
    const [categories, setCategories] = useState();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingBook, setEditingBook] = useState(null);
    const [editingMember, setEditingMember] = useState(null);
    const [errors,setErrors]= useState(null);
    const [refresh, setRefresh] = useState(false);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout
            setEditingBook={setEditingBook}
            setEditingMember={setEditingMember}
            setErrors={setErrors}
               />,
            children: [
                {
                    path: "/",
                    element: (
                        <HomePage
                            books={books}
                            setBooks={setBooks}
                            members={members}
                            setMembers={setMembers}
                        />
                    )
                },
                {
                    path: "/books",
                    element: (
                        <BooksPage
                            books={books}
                            setBooks={setBooks}
                            columns={columnsTableBooks}
                            refresh={refresh}
                            setRefresh={setRefresh}
                        />
                    )
                },
                {
                    path: "/books/add",
                    element: (
                        <BookFormPage
                            setErrors={setErrors}
                            setBooks={setBooks}
                            categories={categories}
                            setCategories={setCategories}
                            isFormOpen={isFormOpen}
                            setIsFormOpen={setIsFormOpen}
                            errors={errors}
                        />
                    ),
                },
                {
                    path: "/books/edit/:id",
                    element: (
                        <BookFormPage
                            setEditingBook={setEditingBook}
                            setErrors={setErrors}
                            setBooks={setBooks}
                            setCategories={setCategories}
                            editingBook={editingBook}
                            categories={categories}
                            isFormOpen={isFormOpen}
                            setIsFormOpen={setIsFormOpen}
                            errors={errors}
                        />
                    ),
                },
                {
                    path: "/books/:id",
                    element: (
                        <BookDetailPage
                            editingBook={editingBook}
                            setEditingBook={setEditingBook}
                        />
                    ),
                },
                {
                    path: "/members",
                    element: (
                        <MembersPage
                            members={members}
                            setMembers={setMembers}
                            columns={columnsTableMembers}
                            refresh={refresh}
                            setRefresh={setRefresh}
                        />
                    )
                },
                {
                    path: "/members/add",
                    element: (
                        <MemberFormPage
                            setErrors={setErrors}
                            editingMember={editingMember}
                            isFormOpen={isFormOpen}
                            setIsFormOpen={setIsFormOpen}
                            errors={errors}
                        />
                    ),
                },
                {
                    path: "/members/edit/:id",
                    element: (
                        <MemberFormPage
                            setEditingMember={setEditingMember}
                            editingMember={editingMember}
                            isFormOpen={isFormOpen}
                            setIsFormOpen={setIsFormOpen}
                            errors={errors}
                            setErrors={setErrors}
                        />
                    ),
                },
                {
                    path: "/members/:id",
                    element: (
                        <MemberDetailPage
                            editingMember={editingMember}
                            setEditingMember={setEditingMember}
                        />
                    ),
                },
                {
                    path: "/borrow",
                    element: (
                        <BorrowBookForm
                        members={members}
                        setMembers={setMembers}
                        books={books}
                        setBooks={setBooks}
                        />
                    ),
                }
            ]
        }
    ]);

    return (
        <RouterProvider router={router} />
    );
};

export default AppRouter;
