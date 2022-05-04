import * as React from "react";
import { Link } from "react-router-dom";
import { UserStateType } from "../../static/static";
import { useUsers } from "../../contexts/currentUsersContext/UsersContext";
import './styles/UserListItem.scss'

interface IUserListItemProps {
    userInfo: UserStateType,
}

const UserListItem: React.FC<IUserListItemProps> = ({ userInfo }) => {
    const { setCurrentUserState } = useUsers();
    return (
        <div className="user-list-item">
            <ul className="users-info-list">
                <li className="users-info-list__item">
                    <h4 className="user-info-header-text">ФИО:</h4>
                    <span>{userInfo?.name}</span>
                </li>
                <li className="users-info-list__item">
                    <h4 className="user-info-header-text">город:</h4>
                    <span>{userInfo?.address.city}</span>
                </li>
                <li className="users-info-list__item">
                    <h4 className="user-info-header-text">компания:</h4>
                    <span>{userInfo?.company.name}</span>
                </li>
            </ul>
            <Link to={`/user-profile?uid=${userInfo.id}`} className="link_details" onClick={() => setCurrentUserState(userInfo)}>Подробнее</Link>
        </div>
    );
};

export default UserListItem;

