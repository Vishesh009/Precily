import {
	LOADING_DATA,
	POST_DATA,
	DELETE_DATA,
	STORE_DATA,
	FAILED,
} from './ActionType';

const data = [];

const initalState = {
	docs: [],
	loading: false,
	error: null,
};

export const DataReducer = (state = initalState, action) => {
	switch (action.type) {
		case LOADING_DATA:
			return {
				...state,
				loading: true,
				error: null,
			};
		case STORE_DATA:
			return {
				docs: action.payload,
				error: null,
				loading: false,
			};

		case POST_DATA:
			const newData = action.payload;
			if (
				newData.id == '' ||
				newData.title == '' ||
				newData.body == null ||
				newData.userId == ''
			) {
				return {
					...state,
					error: 'all fields are required',
					loading: false,
				};
			}
			console.log(`newData`, newData);
			const oldIndex = state.docs.findIndex((doc) => doc.id == newData.id);
			console.log(`oldIndex`, oldIndex);
			if (oldIndex != -1) {
				state.docs[oldIndex].title = newData.title;
				state.docs[oldIndex].body = newData.body;
				state.docs[oldIndex].userId = newData.userId;
				return {
					...state,
					error: null,
					loading: false,
				};
			} else {
				return {
					...state,
					docs: [...state.docs, newData],
					error: null,
					loading: false,
				};
			}

		case DELETE_DATA:
			const data = action.payload;
			const index = state.docs.indexOf(data);

			state.docs.splice(index, 1);
			return {
				...state,
				error: null,
				loading: false,
			};
		case FAILED:
			return {
				...state,
				error: action.payload,
				loading: false,
			};
		default:
			return state;
	}
};

export default DataReducer;
