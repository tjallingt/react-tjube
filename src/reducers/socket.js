import { CONNECT, DISCONNECT, RECONNECT, RECONNECT_FAILED } from '../actions';

const initialState = {
	connected: true,
	reconnect: {
		attempt: 0,
		failed: false,
	},
};

const socket = (state = initialState, action) => {
	switch (action.type) {
	case CONNECT:
		return initialState;
	case DISCONNECT:
		return {
			...state,
			connected: false,
		};
	case RECONNECT:
		return {
			...state,
			connected: false,
			reconnect: {
				...state.reconnect,
				attempt: action.attempt,
			},
		};
	case RECONNECT_FAILED:
		return {
			...state,
			reconnect: {
				...state.reconnect,
				failed: true,
			},
		};
	default:
		return state;
	}
};

export default socket;
