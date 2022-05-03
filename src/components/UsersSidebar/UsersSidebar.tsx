import * as React from "react";
import './styles/UsersSidebar.scss'

const UserSidebar: React.FC = () => {

    return (
        <aside className="user-sidebar">
            <div className="sort-wrpa">
                <span>Сортировка
                </span>
                <div className="button-wrapper">
                    <button className="button_town-sort">по городу</button>
                </div>
                <div className="button-wrapper">
                    <button className="button_company-sort">по компании</button>
                </div>
            </div>
        </aside>
    );
};

export default UserSidebar;

