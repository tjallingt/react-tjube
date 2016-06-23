import { combineReducers } from 'redux';
import { SET_SEARCH_RESULTS, SET_SEARCH_QUERY } from '../actions';

const results = (state = [], action) => {
	switch (action.type) {
	case SET_SEARCH_RESULTS:
		return action.results;
	default:
		return state;
	}
};

const query = (state = '', action) => {
	switch (action.type) {
	case SET_SEARCH_QUERY:
		return action.query;
	default:
		return state;
	}
};

export default combineReducers({
	results,
	query,
});
