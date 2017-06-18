import {
	FETCH_SEARCH_RESULTS,
	RECEIVE_SEARCH_RESULTS,
	ERROR_SEARCH_RESULTS,
	CLEAR_SEARCH_RESULTS,
} from '../actions';

const initialState = {
	isFetching: false,
	error: '',
	results: [],
};

const search = (state = initialState, action) => {
	switch (action.type) {
	case FETCH_SEARCH_RESULTS:
		return {
			...state,
			isFetching: true,
			error: '',
		};
	case ERROR_SEARCH_RESULTS:
		return {
			...initialState,
			error: action.error,
		};
	case RECEIVE_SEARCH_RESULTS:
		return {
			...initialState,
			results: action.results,
		};
	case CLEAR_SEARCH_RESULTS:
		return initialState;
	default:
		return state;
	}
};

export default search;
