import * as React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useUsers } from "../contexts/currentUsersContext/UsersContext";
import { useSidebar } from '../contexts/SidebarContext';
import { sortUsersOfObjectByKey } from "../UsersListPage/UserListItem/scripts/sorting";
import './styles/UsersSidebar.scss'

const UserSidebar: React.FC = () => {
    let location = useLocation();
    const { showSidebar, setShowSidebar } = useSidebar();
    const { userListState, setUserListState } = useUsers();
    const [sortedStatusState, setSortedStatusState] = useState({
        city: false,
        name: false, // company name
    });
    const sortByParams = (key1: string, key2: string) => {
        if (!sortedStatusState[key2]) {
            const sortedList =  userListState;
            setUserListState([...sortUsersOfObjectByKey(sortedList, key1, key2)])
            if (key2 === 'city') {
                // обнуляем сортированность по другому параметру, чтобы сортировка происходила снова
                setSortedStatusState({...sortedStatusState, [key2]: true, name: false})
            }
            else {
                setSortedStatusState({...sortedStatusState, [key2]: true, city: false})
            }
        } else {
            const reversedArray = userListState.reverse();
            setUserListState([...reversedArray]);
        }
    }
    return (
        <aside className={`user-sidebar ${window.innerWidth < 576 ? !showSidebar ? 'hide': 'show'  : 'show'}`}>
            <button className="toggle-sidebar" onClick={() => setShowSidebar(!showSidebar)}></button>
            <div className="sort-wrap">
                <span>Сортировка
                </span>
                {/* Кнопки ЗАДИЗЕЙБЛЕНЫ на второй странице, но по макеты это не было указано, поэтому пользователь этого не видит */}
                <div className="button-wrapper">
                    <button className="button_town-sort" disabled={location.search.length === 0 ? false : true} onClick={() => sortByParams('address', 'city')}>по городу</button>
                </div>
                <div className="button-wrapper">
                    <button className="button_company-sort" disabled={location.search.length === 0 ? false : true} onClick={() => sortByParams('company', 'name')}>по компании</button>
                </div>
            </div>
        </aside>
    );
};

export default UserSidebar;

