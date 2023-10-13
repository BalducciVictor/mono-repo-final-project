import { useEffect, useState } from "react";
import { UserFormData } from "../../../../types/usertypes";
import { Button } from "../../../../components/button";
import styled from "styled-components";
import { getCompanyById, postUser } from "../../../../services/api";
import { useUser } from "../../../../userContext";
  
export const CreateUserForm: React.FC<{ onSubmit: (data: UserFormData) => void }> = ({ onSubmit }) => {
    const {user} = useUser();
    const [formData, setFormData] = useState<UserFormData>({
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      companyId: user.companyId, 
      groupId: null,
      role: null,
    });
    const [apiMessage, setApiMessage] = useState<string | null>(null);
    const [companyGroups, setCompanyGroups] = useState<Array<{groupName: string, _id: string}>>([]);
    
    const handleUserFormChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await postUser(formData);
            setApiMessage("Utilisateur bien créé");
        } catch (err:any) {
            console.log(err)
            setApiMessage(err.message);
        }
    };

    const GetGroupCompagny = async() => {
        try {
            const response = await getCompanyById(`${user.companyId}`);
            console.log(response)
            if (response && response.companyGroup) {
                setCompanyGroups(response.companyGroup);
            }
        } catch (err:any) {
            console.log(err)
        }
    }

    useEffect(()=>{
        GetGroupCompagny();
    },[])

    return (
        <WrapperForm>
            <form onSubmit={handleSubmit}>
                <Label>Prénom</Label>
                <StyledInput name="firstName" value={formData.firstName  ?? ''} onChange={(e) => handleUserFormChange(e.target.name, e.target.value)} placeholder="First Name" required/>
                <Label>Nom</Label>
                <StyledInput name="lastName" value={formData.lastName ?? ''} onChange={(e) => handleUserFormChange(e.target.name, e.target.value)} placeholder="Last Name" required/>
                <Label>Email</Label>
                <StyledInput name="email" type="email" value={formData.email  ?? ''} onChange={(e) => handleUserFormChange(e.target.name, e.target.value)} placeholder="Email" required/>
                <Label>Mot de passe</Label>
                <StyledInput name="password" type="password" value={formData.password  ?? ''} onChange={(e) => handleUserFormChange(e.target.name, e.target.value)} placeholder="Password" required/>
                <Label>Sélectionner un groupe</Label>
                <select
                    name="groupId"
                    value={formData.groupId ?? ''}
                    onChange={(e) => handleUserFormChange(e.target.name, e.target.value)}
                    required
                >
                    <option value="">Sélectionnez un groupe</option>
                    {companyGroups.map(group => (
                        <option key={group._id} value={group._id}>{group.groupName}</option>
                    ))}
                </select>
                <Label>Role</Label>
                <select
                    name="role" 
                    value={formData.role  ?? ''} 
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

const ErrorMessage= styled.p`
    margin: 10px;
    font-size: 18px;
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