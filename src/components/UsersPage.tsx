import React, { FC, useState, useEffect } from 'react';
import axios from 'axios';
import { IUser } from '../types/types';
import List from './List';
import UserItem from './UserItem';
import { useHistory } from 'react-router-dom';

const UsersPage: FC = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const history = useHistory();
    useEffect(() => {
        fetchUsers();
    }, [])

    async function fetchUsers() {
        try {
            const responce = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users');
            setUsers(responce.data);
        } catch (e) {
            alert(e);
        }
    }

    return (
        <List items={users} renderItem={(user: IUser) => 
            <UserItem
                onClick={(user: IUser) => history.push(`/users/${user.id}`)}
                user={user}
                key={user.id}
            />}
         />
    );
};

export default UsersPage;
