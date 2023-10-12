import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  company: string;
}

interface UserListProps {
  companyId: number;
}

interface RowProps {
    user: {
        id: number;
        firstName: string;
        lastName: string;
        company: string;
    };
    onDelete: (id: number) => void;
}

export const Row: React.FC<RowProps> = ({ user, onDelete }) => {
    return (
        <TableRow>
            <td>{user.id}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.company}</td>
            <td><DeleteButton onClick={() => onDelete(user.id)}>Supprimer</DeleteButton></td>
        </TableRow>
    );
};

export const UserList: React.FC<UserListProps> = ({ companyId }) => {
  const [users, setUsers] = useState<User[]>([]);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`/users?companyId=${companyId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch users.");
        }
        const fetchedUsers: User[] = await response.json();
        setUsers(fetchedUsers);
      } catch (error:any) {
        console.error("An error occurred:", error.message);
      }
    };

    fetchUsers();
  }, [companyId]);

  const handleDelete = (userId: number) => {
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
  };

  return (
    <div>
      {/* Ici des filtres */}
      <table>
        <StyledTable>
            <thead>
            <tr>
                <th>ID</th>
                <th>Prénom</th>
                <th>Nom</th>
                <th>Compagnie</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {users.map(user => (
                <Row key={user.id} user={user} onDelete={handleDelete} />
            ))}
            </tbody>
        </StyledTable>
      </table>
    </div>
  );
};

const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    font-size: 16px;
    text-align: left;

    th, td {
        padding: 10px;
        border-bottom: 1px solid #ddd;
    }

    th {
        background-color: #f2f2f2;
    }

    tr:hover {
        background-color: #f5f5f5;
    }

    button {
        background-color: #f44336;  // Rouge
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