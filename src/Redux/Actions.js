import {
	LOADING_DATA,
	POST_DATA,
	DELETE_DATA,
	STORE_DATA,
	FAILED,
} from './ActionType';

export const storeData = () => (dispatch) => {
	try {
		dispatch({ type: LOADING_DATA });
		fetch('https://jsonplaceholder.typicode.com/posts')
			.then((res) => res.json())
			.then((data) => {
				dispatch({ type: STORE_DATA, payload: data });
			});
	} catch (e) {
		dispatch({ type: FAILED, payload: e.message });
	}
};

export const postData = (data) => (dispatch) => {
	try {
		dispatch({ type: LOADING_DATA });
		dispatch({ type: POST_DATA, payload: data });
	} catch (e) {
		dispatch({ type: FAILED, payload: e.message });
	}
};
export const deleteData = (data) => (dispatch) => {
	try {
		dispatch({ type: LOADING_DATA });
		dispatch({ type: DELETE_DATA, payload: data });
	} catch (e) {
		console.log(`e`, e);
		dispatch({ type: FAILED, payload: e.message });
	}
};
