import { FETCH_SEARCH_RESULTS, RECEIVE_SEARCH_RESULTS, CLEAR_SEARCH_RESULTS } from '../actions';

const initialState = {
	isFetching: false,
	results: [],
};

const search = (state = initialState, action) => {
	switch (action.type) {
	case FETCH_SEARCH_RESULTS:
		return {
			...state,
			isFetching: true,
		};
	case RECEIVE_SEARCH_RESULTS:
		return {
			isFetching: false,
			results: action.results,
		};
	case CLEAR_SEARCH_RESULTS:
		return initialState;
	default:
		return state;
	}
};

export default search;
