import * as React from "react";
import UserListItem from "../UserListItem/UserListItem";
import './styles/UsersList.scss'

const UsersList: React.FC = () => {

    return (
        <main className="users-list-main">
            <header className="user-list-header">
                <h1 className="header-text">Список пользователей</h1>
            </header>
            <main className="users-wrapper">
                <UserListItem />
                <UserListItem />
            </main>
        </main>
    );
};

export default UsersList;

