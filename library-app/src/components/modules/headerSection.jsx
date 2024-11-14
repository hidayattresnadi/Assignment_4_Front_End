import Container from '../elements/container';
import Text from '../elements/text';
import GreetingMessage from '../widgets/greetingsMessage';
import '../../header.css'
import { useNavigate } from 'react-router-dom';

const Header = ({setEditingBook, setEditingMember, setErrors}) => {
  const navigate = useNavigate();
  const date = new Date();
  const fullDate = date.toLocaleDateString('en-EN', { day: '2-digit', month: 'long', year: 'numeric' });
  const timeOfDay = date.getHours() < 12 ? 'morning' : 'evening';


  return (
    <Container className="container-fluid d-flex flex-column align-items-center bg-header mb-5 position-relative">
      {/* Overlay for Background Image */}
      <div className="overlay"></div>

      {/* Navigation and Title */}
      <div className="d-flex w-100 justify-content-between align-items-center px-4">
        <Text className="text-white fs-1 fw-bold z-index-1">Library App</Text>
        <div className="nav-links d-flex gap-4">
        <span onClick={() => {
            navigate(`/`)
            setEditingBook(null)
            setEditingMember(null)
            setErrors(null)
          }} style={{ cursor: 'pointer' }} className="text-white fw-bold text-decoration-none fs-5">Home</span>
          <span onClick={() => {
            navigate(`/members`)
            setEditingBook(null)
            setEditingMember(null)
            setErrors(null)
          }} style={{ cursor: 'pointer' }} className="text-white fw-bold text-decoration-none fs-5">Members</span>
          <span onClick={() => {
            navigate(`/books`)
            setEditingBook(null)
            setEditingMember(null)
            setErrors(null)
          }} style={{ cursor: 'pointer' }} className="text-white fw-bold text-decoration-none fs-5">Books</span>
        </div>
      </div>
      {/* Greeting Message */}
      <GreetingMessage timeOfDay={timeOfDay} fullDate={fullDate} />
    </Container>
  );
};

export default Header;


