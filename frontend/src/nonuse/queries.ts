import sessionAPI from '../services/sessionStorageAPI';
import { customFetch } from './baseQuery';

interface AuthData {
    email: string;
    password: string;
}

export const fetchToken = async (data: AuthData) => {
const options: any = {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
};
return customFetch('auth/signin', options);
};

export const fetchCreateUser = async (data: AuthData) => {
    const options: any = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authentication': `Bearer ${sessionAPI.getToken()}`
        },
        body: JSON.stringify(data),
    };
    return customFetch('users', options);
    };