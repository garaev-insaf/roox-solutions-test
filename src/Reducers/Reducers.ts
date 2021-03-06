import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import { LoadingReducer } from "./LoadingReducer";
import { CurrentUserReducer, UsersListReducer } from "./UsersReducer";

const createRootReducer = (history) =>
	combineReducers({
		router: connectRouter(history),
		loadingStatus: LoadingReducer,
		userList: UsersListReducer,
		currentUser: CurrentUserReducer,
	});

export default createRootReducer;
