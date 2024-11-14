import { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "../components/pages/homepage";
import Layout from "../components/templates/layout";
import { successSwal } from "../helper";
import BookFormPage from "../components/pages/bookFormPage";
import BooksPage from "../components/pages/booksPage";
import MembersPage from "../components/pages/membersPage";
import MemberFormPage from "../components/pages/memberFormPage";
import BookDetailPage from "../components/pages/bookDetailPage";
import MemberDetailPage from "../components/pages/memberDetailPage";

// Initial data and functions for book management
const columnsTableBooks = ["Title", "Author", "Category", "Publication Year", "ISBN", "Available", "Edit", "Delete", "Detail"];
const columnsTableMembers = ["Id", "Full Name", "Email", "Gender", "Phone", "Address", "Edit", "Delete", "Detail"];

const AppRouter = () => {

    const [books, setBooks] = useState();
    const [members, setMembers] = useState();
    const [categories, setCategories] = useState();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingBook, setEditingBook] = useState(null);
    const [selectedMemberId, setSelectedMemberId] = useState(null);
    const [editingMember, setEditingMember] = useState(null);
    const [errors,setErrors]= useState(null);

    const updateMember = (member) => {
        const newErrors = {};

        if (!member.fullName) {
            newErrors.fullName = 'Name is required'
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(member.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!/^\+62\d{9,13}$/.test(member.phone)) {
            newErrors.phone = 'Phone number must start with +62 and contain 9-13 digits';
        }
        if (member.address.length < 200) {
            newErrors.address = 'address minimal characters should be 200'
        }
        if (!member.gender) {
            newErrors.gender = 'gender is required'
        }
        setErrors(newErrors);
        
        if (Object.keys(newErrors).length === 0) {
            const updatedMembers = [...members];
            member.id = selectedMemberId
            const indexMember = members.findIndex((member) => member.id === selectedMemberId);
            updatedMembers[indexMember] = member;
            setMembers(updatedMembers);
            successSwal('Member Edited successfully');
            setSelectedMemberId(null);
            setEditingMember(null);
        }
        return newErrors;
    };

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
                        />
                    )
                },
                {
                    path: "/members/add",
                    element: (
                        <MemberFormPage
                            setErrors={setErrors}
                            updateMember={updateMember}
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
                            updateMember={updateMember}
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
            ]
        }
    ]);

    return (
        <RouterProvider router={router} />
    );
};

export default AppRouter;
