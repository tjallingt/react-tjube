import { combineReducers } from 'redux';
import { RECEIVE_RESULTS, SET_QUERY, CLEAR_SEARCH } from '../actions';

const results = (state = [], action) => {
	switch (action.type) {
	case RECEIVE_RESULTS:
		return action.results;
	case CLEAR_SEARCH:
		return [];
	default:
		return state;
	}
};

const query = (state = '', action) => {
	switch (action.type) {
	case SET_QUERY:
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
