import axios from "axios";

export const getUsers = (limit: number, currentPage: number) => {
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
                dispatch({
                    type: "HIDE_LOADER",
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };
};
