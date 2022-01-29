import React, { FC, useState, useEffect } from 'react';
import axios from 'axios';
import { IUser } from '../types/types';
import { useHistory, useParams } from 'react-router-dom';

interface UserItemPageParams {
    id: string;
}

const UserItemPage: FC = () => {

    const [user, setUser] = useState<IUser | null>(null);
    const params = useParams<UserItemPageParams>();
    const history = useHistory();

    useEffect(() => {
        fetchUser();
    }, [])

    async function fetchUser() {
        try {
            const responce = await axios.get<IUser>(`https://jsonplaceholder.typicode.com/users/${params.id}`);
            setUser(responce.data);
        } catch (e) {
            alert(e);
        }
    }

    return <div>
        <button onClick={() => history.push('/users')}>Back</button>
        <h1>Страница пользователя {user?.name}</h1>
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <span>Email: {user?.email}</span>
            <span>Address: {user?.address.city}, {user?.address.street}, {user?.address.zipcode} </span>
        </div>
    </div>;
};

export default UserItemPage;
