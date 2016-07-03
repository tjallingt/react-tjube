import { RECEIVE_RESULTS, CLEAR_SEARCH } from '../actions';

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

export default results;
