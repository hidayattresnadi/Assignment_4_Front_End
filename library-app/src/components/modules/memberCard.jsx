import MemberDetail from "../widgets/dataDetail";
import '../../bookCard.css'
import Container from "../elements/container";

const MemberDetailCard = ({ detailMember }) => {
    return (
        <>
            <Container className="book-details">
                <MemberDetail label="Id" value={detailMember.id} />
                <MemberDetail label="Full Name" value={detailMember.fullName} />
                <MemberDetail label="Email" value={detailMember.email} />
                <MemberDetail label="Gender" value={detailMember.gender} />
                <MemberDetail label="Phone" value={detailMember.phoneNumber} />
                <MemberDetail label="Address" value={detailMember.address} />
            </Container>
        </>

    );
};

export default MemberDetailCard;
