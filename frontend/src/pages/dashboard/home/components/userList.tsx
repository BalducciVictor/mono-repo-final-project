import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DeleteUserById, getUserByCompagnyId } from '../../../../services/api';
import { useUser } from '../../../../userContext';
import { space } from '../../../../styles/const';

interface User {
  _id: number;
  firstName: string;
  lastName: string;
  email: string;
}

interface UserListProps {
  companyId: string;
  userAdded: boolean;
}

interface RowProps {
  user: {
    _id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
  onDelete: (id: number) => void;
}

export const Row: React.FC<RowProps> = ({ user, onDelete }) => {
  return (
    <TableRow>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.email}</td>
      <td>
        <DeleteButton onClick={() => onDelete(user._id)}>
          Supprimer
        </DeleteButton>
      </td>
    </TableRow>
  );
};

export const UserList: React.FC<UserListProps> = ({ companyId, userAdded }) => {
  const [users, setUsers] = useState<User[]>([]);
  const { user } = useUser();
  const [apiMessage, setApiMessage] = useState<string>('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUserByCompagnyId(`${user.companyId}`);
        setUsers(response);
      } catch (error) {
        // @ts-ignore
        console.error('An error occurred:', error.message);
      }
    };

    fetchUsers();
  }, [companyId, userAdded]);

  const handleDelete = async (userId: number) => {
    const updatedUsers = users.filter(user => user._id !== userId);
    setUsers(updatedUsers);
    try {
      const responce = await DeleteUserById(`${userId}`);
      const updatedUsers = users.filter(user => user._id !== userId);
      setUsers(updatedUsers);
      setApiMessage('Suppression utilisateur reussite');
    } catch (error) {
      // @ts-ignore
      console.error('An error occurred:', error.message);
    }
  };

  return (
    <Wrapper>
      <StyledTable>
        <thead>
          <tr>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <Row key={user._id} user={user} onDelete={handleDelete} />
          ))}
        </tbody>
        {apiMessage && <p>{apiMessage}</p>}
      </StyledTable>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: white;
  padding: ${space.xxs} ${space.s};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 16px;
  text-align: left;
  background-color th,
  td {
    padding: 10px;
    border-bottom: 1px solid #ddd;
    background-color: 'white';
  }

  th {
    background-color: white;
  }

  tr:hover {
    background-color: #f5f5f5;
  }

  button {
    background-color: #f44336;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s;

    &:hover {
      background-color: #e53935;
    }
  }
`;

const TableRow = styled.tr`
  &:hover {
    background-color: #f5f5f5;
  }
`;

const DeleteButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e53935;
  }
`;
