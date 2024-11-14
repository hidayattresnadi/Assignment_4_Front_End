import TableCell from '../elements/tableCell';
import Button from '../elements/button';
import Icon from '../elements/icon';

const TableBookRow = ({ book, onEdit, onDelete, onDetail }) => (
    <tr>
        <TableCell>{book.title}</TableCell>
        <TableCell>{book.author}</TableCell>
        <TableCell>{book.category.categoryName}</TableCell>
        <TableCell>{book.publicationYear}</TableCell>
        <TableCell>{book.isbn}</TableCell>
        <TableCell>{book.availability===true ? 'Available' : 'Not Available'}</TableCell>
        <TableCell>
            <Button onClick={onEdit} className="btn btn-primary" ariaLabel="Edit Book">
                <Icon className="fas fa-pencil-alt" />
            </Button>
        </TableCell>
        <TableCell>
            <Button onClick={onDelete} className="btn btn-danger" ariaLabel="Delete Book">
                <Icon className="fas fa-trash-alt" />
            </Button>
        </TableCell>
        <TableCell>
            <Button onClick={onDetail} className="btn btn-primary" aria-label="Detail Book">
                <Icon className="fas fa-eye" />
            </Button>
        </TableCell>
    </tr>
);

export default TableBookRow;
