import * as React from "react";
import UserSidebar from "../UsersSidebar/UsersSidebar";
import './styles/MainPage.scss'
import UsersList from "./UsersListPage/UsersList";

const MainPage: React.FC = () => {

    return (
        <>
            <div className="users-main-page">
                <UserSidebar />
                <UsersList />
            </div>
        </>
    );
};

export default MainPage;

