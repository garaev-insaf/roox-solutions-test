import * as React from "react";
import { connect } from "react-redux";
import { useEffect } from "react";
import { getUsers } from "../../../Actions/UsersAction";
import UserListItem from "./UserListItem/UserListItem";
import './styles/UsersList.scss'
import { UserStateType } from "../static/static";
import { useUsers } from "../contexts/currentUsersContext/UsersContext";
import { useSidebar } from '../contexts/SidebarContext';

interface IUserListProps {
    loader: boolean,
    getUsers(): Promise<void>,
    userList: UserStateType[] | [],
}

const UsersList: React.FC<IUserListProps> = ({ loader, getUsers, userList }) => {
    const { showSidebar } = useSidebar();
    const {userListState, setUserListState} = useUsers() // главный стейт; хранит в себе список пользователей

    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        setUserListState(userList);
    }, [userList])

    return (
        <>
            {!loader ?
                <main className={`users-list-main users-main ${window.innerWidth < 576 ? !showSidebar ? 'show' : 'hide' : 'show'}`}>
                    <div className="user-list-header">
                        <h1 className="header-text">Список пользователей</h1>
                    </div>
                    <div className="users-wrapper">

                        {userListState.length > 0 ? // на случай получения пустого массива с сервера
                            userListState.map((elem) =>
                                <UserListItem userInfo={elem} key={elem.id} />
                            )
                            : null}
                        <div className="users-count">
                            <p className="users-count-text">Найдено {userListState.length} пользователей</p>
                        </div>
                    </div>
                </main>
                : <h1>Загрузка</h1>}
        </>
    );
};

const mapStateToProps = (state: any) => {
    return {
        userList: state.userList,
        loader: state.loadingStatus.loading,
    };
};

const mapDispatchToProps = {
    getUsers,
};


export default connect(mapStateToProps, mapDispatchToProps)(UsersList);

