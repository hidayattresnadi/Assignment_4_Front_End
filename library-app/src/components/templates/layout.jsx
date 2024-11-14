import Footer from "../templates/footer";
import Header from "../modules/headerSection";
import { Outlet } from "react-router-dom";


const Layout = ({setEditingBook, setEditingMember, setErrors}) => {
    return (
        <>
            <Header setEditingBook={setEditingBook} setEditingMember={setEditingMember} setErrors={setErrors} />
            <Outlet />
            <Footer />
        </>
    );

};

export default Layout;