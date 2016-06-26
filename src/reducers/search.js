import { combineReducers } from 'redux';
import { RECEIVE_SEARCH_RESULTS, SET_SEARCH_QUERY, CLEAR_SEARCH } from '../actions';

const results = (state = [], action) => {
	switch (action.type) {
	case RECEIVE_SEARCH_RESULTS:
		return action.results;
	case CLEAR_SEARCH:
		return [];
	default:
		return state;
	}
};

const query = (state = '', action) => {
	switch (action.type) {
	case SET_SEARCH_QUERY:
		return action.query;
	case CLEAR_SEARCH:
		return '';
	default:
		return state;
	}
};

export default combineReducers({
	results,
	query,
});
