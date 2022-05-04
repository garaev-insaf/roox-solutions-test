import axios from "axios";

export const getUsers = () => {
    return async (dispatch) => {
        dispatch({
            type: "SHOW_LOADER",
        });
        await axios
            .get(`https://jsonplaceholder.typicode.com/users`)
            .then((usersList) => {
                dispatch({
                    type: "GET_USERS",
                    usersList,
                });
            })
            .then(() => {
                dispatch({
                    type: "HIDE_LOADER",
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

export const getСurrentUser = (id: number) => {
    return async (dispatch) => {
        dispatch({
            type: "SHOW_LOADER",
        });
        await axios
            .get(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then((currentUser) => {
                dispatch({
                    type: "GET_CURRENT_USER",
                    currentUser,
                });
            })
            .then(() => {
                dispatch({
                    type: "HIDE_LOADER",
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };
};
