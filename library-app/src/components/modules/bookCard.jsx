import BookDetail from "../widgets/dataDetail";
import '../../bookCard.css'
import Container from "../elements/container";

const BookDetailCard = ({ detailBook }) => {

    return (
        <>
            <Container className="book-details">
                <BookDetail label="Title" value={detailBook.title} />
                <BookDetail label="Author" value={detailBook.author} />
                <BookDetail label="Category" value={detailBook.category.categoryName} />
                <BookDetail label="Publication Year" value={detailBook.publicationYear} />
                <BookDetail label="ISBN" value={detailBook.isbn} />
            </Container>
        </>

    );
};

export default BookDetailCard;
