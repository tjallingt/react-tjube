import { combineReducers } from 'redux';
import playlist from './playlist';
import search from './search';
import { SET_YOUTUBE, TOGGLE_FILL } from '../actions';

const player = (state = { fill: false }, action) => {
	switch (action.type) {
	case SET_YOUTUBE:
		return {
			...state,
			youtube: action.youtube,
		};
	case TOGGLE_FILL:
		return {
			...state,
			fill: !state.fill,
		};
	default:
		return state;
	}
};

export default combineReducers({
	player,
	playlist,
	search,
});
