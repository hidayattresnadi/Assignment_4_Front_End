import axios from 'axios';
import { failedSwal, successSwal, validateInputMember } from '../../helper';
import MemberForm from '../modules/memberForm'
import FormLayout from '../templates/FormLayout';
import { v4 as uuidv4 } from 'uuid';
import LoadingSpinner from '../elements/loading';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function MemberFormPage({ setErrors, editingMember, isFormOpen, setIsFormOpen, errors, setEditingMember }) {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [ErrorStatus, setErrorStatus] = useState();

    const addMember = async (member) => {
        try {
            const listErrors = validateInputMember(member);
            setErrors(listErrors);
    
            if (Object.keys(listErrors).length === 0) {
                const id = uuidv4();
                member.idIdentity = id;
                await axios.post(`http://localhost:5184/User`, member)
                successSwal('Member Added successfully');
            }
            return listErrors;
            
        } catch (error) {
            failedSwal(error.response.data)
        }
       
    };

    const updateMember = async (member) => {
        try {
            const listErrors = validateInputMember(member);
            setErrors(listErrors);
    
            if (Object.keys(listErrors).length === 0) {
                member.idIdentity = editingMember.idIdentity
                // ga boleh nama duplikat
                await axios.put(`http://localhost:5184/User/${id}`, member)
                successSwal('Member Edited successfully');
                setEditingMember(null);
            }
            return listErrors;
        } catch (error) {
            failedSwal(error.response.data)
        }
       
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                if (!id) {
                    setLoading(false); 
                    setIsFormOpen(true);
                    return;
                }
                const memberResponse = await axios.get(`http://localhost:5184/User/${id}`);
                setEditingMember(memberResponse.data);
                setIsFormOpen(true);
            } catch (error) {
                setErrorStatus(true);
                console.log(error);
            } finally {
                setLoading(false); 
            }
        };
        loadData();
    }, [id,setIsFormOpen,setEditingMember]);

    return (
        <>
            {loading ? <LoadingSpinner /> : ErrorStatus ? <div><h1>Terjadi Gangguan...</h1></div> :
                <FormLayout title={editingMember ? "Form to Update Member" : "Form to Add Member"}>
                    <MemberForm
                        addMember={addMember}
                        updateMember={updateMember}
                        editingMember={editingMember}
                        isFormOpen={isFormOpen}
                        setIsFormOpen={setIsFormOpen}
                        errors={errors}
                    />
                </FormLayout>
            }
        </>
    )
}

export default MemberFormPage;