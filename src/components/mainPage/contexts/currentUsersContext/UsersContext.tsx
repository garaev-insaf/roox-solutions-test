import React from 'react'
import { useState, useContext, createContext, useMemo } from 'react'
import { UserStateType } from "../../static/static";
const UsersContext = createContext(null)

const useUsers = () => {
    const context = useContext(UsersContext)
    if (!context) {
        throw new Error(`useCount must be used within a CountProvider`)
    }
    return context
}

const UsersProvider = (props) => {
    const [userListState, setUserListState] = useState<UserStateType | []>([]); // в данном случае использую этот контекст для обращения к списку пользователей с sidebar'a & usersList
    const [currentUserState, setCurrentUserState] = useState<UserStateType>(null); // выделяю в отдельный стейт, потому при обновлении и прочих ситуациях вытягивияем лишь одного пользователя
    const value = useMemo(() => ({
        currentUserState, setCurrentUserState, userListState, setUserListState
    }), [currentUserState, userListState])
    return <UsersContext.Provider value={value} {...props} />
}

export { UsersProvider, useUsers }