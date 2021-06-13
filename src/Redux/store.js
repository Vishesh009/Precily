import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import dataReducer from './DataReducer';
import thunk from 'redux-thunk';

const initialState = {};
const middleware = [thunk];

const reducer = combineReducers({
	data: dataReducer,
});
const store = createStore(
	reducer,
	initialState,
	compose(
		applyMiddleware(...middleware),
		window.__REDUX_DEVTOOLS_EXTENSION__
			? window.__REDUX_DEVTOOLS_EXTENSION__()
			: (f) => f
	)
);

export default store;
