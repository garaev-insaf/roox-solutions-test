const UsersListReducer = (usersList = [], action) => {
    switch (action.type) {
        case "GET_USERS":
            return action.usersList.data;
        default:
            return usersList;
    }
};

export { UsersListReducer}