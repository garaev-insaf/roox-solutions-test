import * as React from "react";
import { connect } from "react-redux";
import { history } from "../../../Store/Store";
import { useEffect, useState } from "react";
import { useUsers } from "../contexts/currentUsersContext/UsersContext";
import { getСurrentUser } from "../../../Actions/UsersAction";
import './styles/UserProfilePage.scss'
import { UserStateType } from "../static/static";
import { emailValidation, phoneValidation, websiteValidation } from "../../scripts/validators";
import { useSidebar } from '../contexts/SidebarContext';

interface IUserProfilePageProps {
    loaderStatus: {
        loading: boolean,
    }
    getСurrentUser(id: number): Promise<void>,
    currentUser: UserStateType,
}

const UserProfilePage: React.FC<IUserProfilePageProps> = ({ loaderStatus, getСurrentUser, currentUser }) => {
    const { showSidebar } = useSidebar();
    const initialInvalidDatas = {
        email: false,
        phone: false,
        website: false
    }
    const { currentUserState, setCurrentUserState } = useUsers(); // хранит данные пользователя
    const [editFlagState, setEditFlagState] = useState(() => true)
    const [invalidDatasState, setInvalidDatasState] = useState(() => initialInvalidDatas)
    useEffect(() => {
        // проверяем, есть ли у нас в контексте данные о пользователе. Если их нет, считываем с адресной строки айди пользователя и единично вытягиваем актуальную информацию
        // делается это для того, чтобы допустить обновление и переход на данную страницу по ссылке без потери информации о профиле пользователя
        // в данном случае можно было бы и через history props обойти использование контекста, но это не модно ☺
        if (!currentUserState) {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            if (urlParams.has('uid')) {
                getСurrentUser(Number(urlParams.get('uid')));
            }
            else {
                throw 'Error! Invalid url';
            }
        }
    }, [currentUserState])

    useEffect(() => {
        if (currentUser) {
            // т.к. в профиле пользователя используются комментарии добавляем данный ключ к объекту, расспыляя его между тем
            setCurrentUserState({ ...currentUser, comment: '' });
        }
    }, [currentUser])

    const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, type: string, count: number) => {
        // evt - событие
        // type - ключ вложенного объекта
        // count - уровень вложенного объекта, в данном контексте можно было бы обойтись и без этого счетчика, но решил всё-таки продумтаь этот момент
        if (type.length === 0 && count === null) {
            // убираем заполнение телефона, т.к. заполнение происходит посредством onKeyDown
            setCurrentUserState({ ...currentUserState, [evt.currentTarget.name]: evt.currentTarget.value })
        }
        else if (count === 1) {
            // мы знаем, что максимальная вложенность - это "один (count = 1) объект в другом объекте", при увеличении вложенности данная логика не работает
            setCurrentUserState({ ...currentUserState, [type]: { ...currentUserState[type], [evt.currentTarget.name]: evt.currentTarget.value } })
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const emailValidationResult = emailValidation(currentUserState.email);
        const phoneValidationResult = phoneValidation(currentUserState.phone);
        const websiteValidationResult = websiteValidation(currentUserState.website)
        if (!emailValidationResult || !phoneValidationResult || !websiteValidationResult) {
            setInvalidDatasState({ ...invalidDatasState, email: !emailValidationResult, phone: !phoneValidationResult, website: !websiteValidationResult })
            return;
        }
        else {
            setInvalidDatasState(initialInvalidDatas); // обнуляем ошибки
        }
        console.log(currentUserState);
        history.goBack();
    }
    return (
        <>
            {loaderStatus.loading ?
                <h1>Загрузка</h1>
                :
                <main className={`user-profile-main users-main ${window.innerWidth < 576 ? !showSidebar ? 'show' : 'hide' : 'show'}`}>
                    <div className="user-profile-header">
                        <h1 className="header-text">Профиль пользователя</h1>
                        <button className="button_edit-form" onClick={() => setEditFlagState(false)}>Редактировать</button>
                    </div>
                    {/* Не смотря на то, что макет под 665px и в нём не было логики перехода назад, я решил дерзнуть и добавить от себя. Т.к. данное разрешение уже затрагивает сенсорные девайсы*/}
                    <button className="button button_route-back" onClick={() => history.goBack()}>назад</button>
                    <form className="form_user-profile" onSubmit={(e) => handleSubmit(e)}>
                        <ul className="current-user-info-list">
                            <li className="current-user-info-list__item">
                                <label htmlFor="name">Name
                                    <input type="text" className="input_user-data" required readOnly={editFlagState} name="name" value={currentUserState?.name} onChange={(e) => handleInputChange(e, '', null)} />
                                </label>
                            </li>
                            <li className="current-user-info-list__item">
                                <label htmlFor="username">User name
                                    <input type="text" className="input_user-data" required readOnly={editFlagState} name="username" value={currentUserState?.username} onChange={(e) => handleInputChange(e, '', null)} />
                                </label>
                            </li>
                            <li className="current-user-info-list__item">
                                <label htmlFor="email">E-mail
                                    <input type="text" className={`input_user-data${invalidDatasState.email ? ' error' : ''}`} required readOnly={editFlagState} name="email" value={currentUserState?.email} onChange={(e) => handleInputChange(e, '', null)} />
                                </label>
                            </li>
                            <li className="current-user-info-list__item">
                                <label htmlFor="street">Street
                                    <input type="text" className="input_user-data" required readOnly={editFlagState} name="street" value={currentUserState?.address?.street} onChange={(e) => handleInputChange(e, 'address', 1)} />
                                </label>
                            </li>
                            <li className="current-user-info-list__item">
                                <label htmlFor="city">City
                                    <input type="text" className="input_user-data" required readOnly={editFlagState} name="city" value={currentUserState?.address?.city} onChange={(e) => handleInputChange(e, 'address', 1)} />
                                </label>
                            </li>
                            <li className="current-user-info-list__item">
                                <label htmlFor="zipcode">Zip code
                                    <input type="text" className="input_user-data" required readOnly={editFlagState} name="zipcode" value={currentUserState?.address?.zipcode} onChange={(e) => handleInputChange(e, 'address', 1)} />
                                </label>
                            </li>
                            <li className="current-user-info-list__item">
                                <label htmlFor="phone">Phone
                                    <input type="text" className={`input_user-data${invalidDatasState.phone ? ' error' : ''}`} required readOnly={editFlagState} name="phone" value={currentUserState?.phone} onChange={(e) => handleInputChange(e, '', null)} />
                                </label>
                            </li>
                            <li className="current-user-info-list__item">
                                <label htmlFor="website">Website
                                    <input type="text" className={`input_user-data${invalidDatasState.website ? ' error' : ''}`} required readOnly={editFlagState} name="website" value={currentUserState?.website} onChange={(e) => handleInputChange(e, '', null)} />
                                </label>
                            </li>
                            <li className="current-user-info-list__item">
                                <label htmlFor="comment">Comment
                                    <textarea className="input_user-data" readOnly={editFlagState} name="comment" value={currentUserState?.comment} onChange={(e) => handleInputChange(e, '', null)} />
                                </label>
                            </li>
                        </ul>
                        <input type="submit" value="Отправить" className="input_send-form" disabled={editFlagState} />
                    </form>
                </main>
            }
        </>
    );
};

const mapStateToProps = (state: any) => {
    return {
        currentUser: state.currentUser,
        loaderStatus: state.loadingStatus,
    };
};

const mapDispatchToProps = {
    getСurrentUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfilePage);
