import { combineReducers } from 'redux';
import playlist from './playlist';
import search from './search';
import toasts from './toasts';
import socket from './socket';
import { SET_YOUTUBE, TOGGLE_FILL, START_TUTORIAL, NEXT_TUTORIAL, END_TUTORIAL } from '../actions';

const initialState = {
	youtube: null,
	fill: false,
	tutorial: 0,
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

	case START_TUTORIAL:
		return {
			...state,
			tutorial: 1,
		};
	case NEXT_TUTORIAL:
		return {
			...state,
			tutorial: state.tutorial + 1,
		};
	case END_TUTORIAL:
		return {
			...state,
			tutorial: 0,
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
