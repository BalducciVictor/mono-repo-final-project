import { useState } from "react";
import { UserFormData } from "../../../../types/usertypes";
import { FormularInput } from "../../../auth/components/molecules/FormularInput";
import { Button } from "../../../../components/button";
import styled from "styled-components";
import { TitleH2 } from "../../../../components/Title";
  
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
  
    const handleUserFormChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
        console.log(formData);
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(formData);
    };
  
    return (
        <WrapperForm>
            <TitleH2>Creation d'utilisateur</TitleH2>
            <form onSubmit={handleSubmit}>
                <label>First Name</label>
                <input name="firstName" value={formData.firstName} onChange={(e) => handleUserFormChange(e.target.name, e.target.value)} placeholder="First Name" />
                <label>Last Name</label>
                <input name="lastName" value={formData.lastName} onChange={(e) => handleUserFormChange(e.target.name, e.target.value)} placeholder="Last Name" />
                <label>Email</label>
                <input name="email" type="email" value={formData.email} onChange={(e) => handleUserFormChange(e.target.name, e.target.value)} placeholder="Email" />
                <label>Password</label>
                <input name="password" type="password" value={formData.password} onChange={(e) => handleUserFormChange(e.target.name, e.target.value)} placeholder="Password" />
                <label>CompagnyId</label>
                <input name="companyId" value={formData.companyId} onChange={(e) => handleUserFormChange(e.target.name, e.target.value)} placeholder="Company ID" />
                <label>GroupeId</label>
                <input name="groupId" value={formData.groupId} onChange={(e) => handleUserFormChange(e.target.name, e.target.value)} placeholder="Group ID" />
                <label>Role</label>
                <select 
                    name="role" 
                    value={formData.role} 
                    onChange={(e) => handleUserFormChange(e.target.name, e.target.value)}
                >
                    <option value="ADMIN">ADMIN</option>
                    <option value="USER">USER</option>
                </select>
                <Button type="submit">Submit</Button>
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
        input{
            margin: 5px 0px;
        }
        select{
            margin: 5px 0px;
        }
    }
`

const InputForm = styled.div`
    
`