import { useState, useEffect, useRef } from 'react';
import InputField from '../widgets/inputField';
import Button from '../elements/button';
import { useNavigate } from 'react-router-dom';
import RadioGroup from './radioGroup';
import LabeledTextArea from '../widgets/labeledTextArea';

const MemberForm = ({ addMember, updateMember, editingMember, isFormOpen, setIsFormOpen, errors }) => {
    const navigate = useNavigate();
    const fullNameInputRef = useRef();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        gender: '',
        address: '',
        phoneNumber: ''
    });

    useEffect(() => {
        if (editingMember) {
            setFormData({
                name: editingMember.name,
                email: editingMember.email,
                gender: editingMember.gender,
                address: editingMember.address,
                phoneNumber: editingMember.phoneNumber
            });
        } else {
            setFormData({
                name: '',
                email: '',
                gender: '',
                address: '',
                phoneNumber: ''
            });
        }
    }, [editingMember]);

    useEffect(() => {
        if (isFormOpen && fullNameInputRef.current) {
            fullNameInputRef.current.focus();
        }
    }, [isFormOpen]);

    const handleInputChange = (e) => {
        const { id, name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [type === "radio" ? name : id]: type === "checkbox" ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editingMember) {
            const result = await updateMember(formData);
            if(Object.keys(result).length === 0){
                navigate('/members');
                setFormData({
                    name: '',
                    email: '',
                    gender: '',
                    address: '',
                    phoneNumber: ''
                });
                setIsFormOpen(false);
            }
        } else {
            const result = await addMember(formData);
            if(Object.keys(result).length === 0){
                setFormData({
                    name: '',
                    email: '',
                    gender: '',
                    address: '',
                    phoneNumber: ''
                });
                setIsFormOpen(false);
                navigate('/members')
            }
        }
    };

    const openForm = () => {
        setIsFormOpen(true);
    };

    const options = [
        { label: "Female", value: "Female" },
        { label: "Male", value: "Male" }
    ];

    return (
        <>
            <form onSubmit={handleSubmit}>
                <InputField
                    label="Full Name"
                    type="text"
                    ref={fullNameInputRef}
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                />
                {errors?.fullName ? <h6 className='text-start'>{errors.fullName}</h6> : ''}
                <InputField
                    label="Email"
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                />
                {errors?.email ? <h6 className='text-start'>{errors.email}</h6> : ''}
                <LabeledTextArea
                    label="Address"
                    id="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter your address"
                />
                {errors?.address ? <h6 className='text-start'>{errors.address}</h6> : ''}
                <InputField
                    label="Phone Number"
                    type="text"
                    placeholder='+628xxxxxxx'
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                />
                {errors?.phone ? <h6 style={{marginBottom:'50px'}} className='text-start'>{errors.phone}</h6> : ''}
                <RadioGroup
                    options={options}
                    name="gender"
                    selectedValue={formData.gender}
                    onChange={handleInputChange}
                />
                {errors?.gender ? <h6 className='text-start'>{errors.gender}</h6> : ''}
                <Button onClick={openForm} type="submit" className="btn btn-primary mt-3 w-100">
                    Submit
                </Button>
            </form>
        </>
    );
};

export default MemberForm;
