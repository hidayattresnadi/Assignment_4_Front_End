import axios from 'axios'
import Swal from 'sweetalert2'
export function successSwal(message) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: 'success',
        title: message
    })
}

export async function validateInputBook(book, isbn) {
    const date = new Date();
    const newErrors = {}
    if (book.isbn) {
        const dupplicateIsbn = await axios.get(`http://localhost:5184/Book/validateISBN/${book.isbn}`);
        if (dupplicateIsbn.data && dupplicateIsbn.data.isbn != isbn ) {
            newErrors.isbn = 'Isbn dupplicate detected'
        }
    }
    if (book.isbn.length < 13) {
        newErrors.isbn = 'Isbn must be at least 13 characters'
    }
    if (!book.title || book.title.length < 3) {
        newErrors.title = 'title must be at least 3 characters'
    }
    if (!book.author) {
        newErrors.author = 'author is required'
    }
    if (book.publicationYear > date.getFullYear()) {
        newErrors.publicationYear = 'year is exceeded from this year'
    }
    if (!book.publicationYear) {
        newErrors.publicationYear = 'year is required'
    }
    if (!book.categoryId) {
        newErrors.bookCategory = 'please choose category'
    }
    return newErrors;
}

export async function validateInputMember(member) {
    const newErrors = {};
        if (!member.fullName) {
            newErrors.fullName = 'Name is required'
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(member.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!/^\+62\d{9,13}$/.test(member.phoneNumber)) {
            newErrors.phone = 'Phone number must start with +62 and contain 9-13 digits';
        }
        if (member.address.length < 200) {
            newErrors.address = 'address minimal characters should be 200'
        }
        if (!member.gender) {
            newErrors.gender = 'gender is required'
        }
    return newErrors;
}

export function failedSwal(error){
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error,
        footer: '<a href="">Why do I have this issue?</a>'
      })
}
