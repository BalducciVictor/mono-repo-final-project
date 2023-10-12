import { useState } from "react";
import { UserFormData } from "../../../../types/usertypes";
import { FormularInput } from "../../../auth/components/molecules/FormularInput";
import { Button } from "../../../../components/button";
  
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
        <form onSubmit={handleSubmit}>
            <input name="firstName" value={formData.firstName} onChange={handleUserFormChange} placeholder="First Name" />
            <input name="lastName" value={formData.lastName} onChange={handleUserFormChange} placeholder="Last Name" />
            <input name="email" type="email" value={formData.email} onChange={handleUserFormChange} placeholder="Email" />
            <input name="password" type="password" value={formData.password} onChange={handleUserFormChange} placeholder="Password" />
            <input name="companyId" value={formData.companyId} onChange={handleUserFormChange} placeholder="Company ID" />
            <input name="groupId" value={formData.groupId} onChange={handleUserFormChange} placeholder="Group ID" />
            <input name="role" value={formData.role} onChange={handleUserFormChange} placeholder="Role" />

            <Button type="submit">Submit</Button>
        </form>
    );
}
 
