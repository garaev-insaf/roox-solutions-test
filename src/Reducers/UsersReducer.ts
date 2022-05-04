const UsersListReducer = (usersList = [], action) => {
    switch (action.type) {
        case "GET_USERS":
            return action.usersList.data;
        default:
            return usersList;
    }
};

const CurrentUserReducer = (currentUser = null, action) => {
    switch (action.type) {
        case "GET_CURRENT_USER":
            return action.currentUser.data;
        default:
            return currentUser;
    }
}

export { UsersListReducer, CurrentUserReducer }