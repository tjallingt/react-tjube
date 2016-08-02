import { combineReducers } from 'redux';
import results from './results';
import toasts from './toasts';
import { ADD_VIDEO, DELETE_VIDEO, SEND_VIDEO, DISCONNECT } from '../actions';

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

const connected = (state = true, action) => {
	switch (action.type) {
	case DISCONNECT:
		return false;
	default:
		return state;
	}
};

export default combineReducers({
	video,
	connected,
	results,
	toasts,
});
