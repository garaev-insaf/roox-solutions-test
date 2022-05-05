import * as React from "react";
import { Route, Switch } from "react-router-dom";
import UserSidebar from "./UsersSidebar/UsersSidebar";
import './styles/MainPage.scss'
import UserProfilePage from "./UserProfilePage/UserProfilePage";
import { UsersProvider } from "./contexts/currentUsersContext/UsersContext";
import UsersList from "./UsersListPage/UsersList";
import { SidebarProvider } from "./contexts/SidebarContext";

const MainPage: React.FC = () => {
    return (
        <>
            <div className="users-main-page">
                <UsersProvider>
                    <SidebarProvider>
                        <UserSidebar />
                        <Switch>
                            <Route exact path="/" ><UsersList /></Route>
                            <Route exact path="/user-profile" ><UserProfilePage /></Route>
                        </Switch>
                    </SidebarProvider>
                </UsersProvider>
            </div>
        </>
    );
};

export default MainPage;

