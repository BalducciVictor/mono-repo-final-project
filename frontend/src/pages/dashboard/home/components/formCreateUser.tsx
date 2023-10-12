import { useState } from "react";
import { UserFormData } from "../../../../types/usertypes";
import { Button } from "../../../../components/button";
import styled from "styled-components";
import { postUser } from "../../../../services/api";
  
export const CreateUserForm: React.FC<{ onSubmit: (data: UserFormData) => void }> = ({ onSubmit }) => {
    const [formData, setFormData] = useState<UserFormData>({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      companyId: '',
      groupId: '',
      role: '',
    });
    const [apiMessage, setApiMessage] = useState<string | null>(null);
    
    const handleUserFormChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await postUser(formData);
            console.log(response.message);
            if (response.message) {
                setApiMessage(response.message);
            }
        } catch (err:any) {
            console.log(err)
            setApiMessage(err.message);
        }
    };

    return (
        <WrapperForm>
            <form onSubmit={handleSubmit}>
                <Label>Prénom</Label>
                <StyledInput name="firstName" value={formData.firstName} onChange={(e) => handleUserFormChange(e.target.name, e.target.value)} placeholder="First Name" required/>
                <Label>Nom</Label>
                <StyledInput name="lastName" value={formData.lastName} onChange={(e) => handleUserFormChange(e.target.name, e.target.value)} placeholder="Last Name" required/>
                <Label>Email</Label>
                <StyledInput name="email" type="email" value={formData.email} onChange={(e) => handleUserFormChange(e.target.name, e.target.value)} placeholder="Email" required/>
                <Label>Mot de passe</Label>
                <StyledInput name="password" type="password" value={formData.password} onChange={(e) => handleUserFormChange(e.target.name, e.target.value)} placeholder="Password" required/>
                <Label>Numero de l'entreprise</Label>
                <StyledInput name="companyId" value={formData.companyId} onChange={(e) => handleUserFormChange(e.target.name, e.target.value)} placeholder="Company ID" required/>
                <Label>Numero du groupe</Label>
                <StyledInput name="groupId" value={formData.groupId} onChange={(e) => handleUserFormChange(e.target.name, e.target.value)} placeholder="Group ID" required/>
                <Label>Role</Label>
                <select 
                    name="role" 
                    value={formData.role} 
                    onChange={(e) => handleUserFormChange(e.target.name, e.target.value)}
                    required
                >   
                    <option value="">Sélectionnez un rôle</option>
                    <option value="ADMIN">ADMIN</option>
                    <option value="USER">USER</option>
                </select >
                <Button type="submit">Envoyer</Button>
                {apiMessage && <ErrorMessage>{apiMessage}</ErrorMessage>}
            </form>
        </WrapperForm>
    );
}
 
const WrapperForm = styled.div` 
    padding: 20px;
    width: 500px;
    form{
        display: flex;
        flex-direction: column;
        justify-content: center;

        label {
            display: block;
            margin-bottom: 5px;
            font-weight: 600;
            color: #333;
        }

        select {
            margin: 5px 0px 15px;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 16px;
            transition: border-color 0.3s ease;

            &:focus {
                border-color: #007BFF;
                outline: none;
            }
        }
    }
`
const Label = styled.label`
    display: block;
    margin-bottom: 5px;
    font-weight: 600;
    color: #333;
`

const InputForm = styled.div`
    margin-bottom: 10px;
`

const ErrorMessage= styled.p`
    color: red;
`
const StyledInput = styled.input`
    margin: 5px 0px 15px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    transition: border-color 0.3s ease;

    &:focus {
        border-color: #007BFF;
        outline: none;
    }
`;