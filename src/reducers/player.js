import { combineReducers } from 'redux';
import playlist from './playlist';
import search from './search';
import toasts from './toasts';
import socket from './socket';
import { SET_YOUTUBE, TOGGLE_FILL, START_TOUR, NEXT_TOUR, END_TOUR } from '../actions';

const initialState = {
	youtube: null,
	fill: false,
	tour: 0,
};

const player = (state = initialState, action) => {
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

	case START_TOUR:
		return {
			...state,
			tour: 1,
		};
	case NEXT_TOUR:
		return {
			...state,
			tour: state.tour + 1,
		};
	case END_TOUR:
		return {
			...state,
			tour: 0,
		};
	default:
		return state;
	}
};

export default combineReducers({
	player,
	playlist,
	search,
	toasts,
	socket,
});
