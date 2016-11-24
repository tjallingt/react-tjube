import { combineReducers } from 'redux';
import search from './search';
import toasts from './toasts';
import socket from './socket';
import { ADD_VIDEO, DELETE_VIDEO, SEND_VIDEO } from '../actions';

const video = (state = null, action) => {
	switch (action.type) {
	case ADD_VIDEO:
		return action.video;
	case DELETE_VIDEO:
	case SEND_VIDEO:
		return null;
	default:
		return state;
	}
};

export default combineReducers({
	video,
	search,
	toasts,
	socket,
});
