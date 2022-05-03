import * as React from "react";
import './styles/UserListItem.scss'

const UserListItem: React.FC = () => {

    return (
        <div className="user-list-item">
            <ul className="users-info-list">
                <li className="users-info-list__item">
                    <h4 className="user-info-header-text">ФИО:</h4>
                    <span>Иван Иванов</span>
                </li>
                <li className="users-info-list__item">
                    <h4 className="user-info-header-text">город:</h4>
                    <span>Москва</span>
                </li>
                <li className="users-info-list__item">
                    <h4 className="user-info-header-text">компания:</h4>
                    <span>ООО "Пример"</span>
                </li>
            </ul>
            <button className="button_deatils">Подробнее</button>
        </div>
    );
};

export default UserListItem;

