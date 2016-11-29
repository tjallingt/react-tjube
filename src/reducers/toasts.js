import { PUSH_TOAST, POP_TOAST } from '../actions';

const toasts = (state = [], action) => {
	switch (action.type) {
	case PUSH_TOAST:
		return [...state, {
			key: action.key,
			message: action.message,
		}];
	case POP_TOAST:
		return [...state.slice(1)];
	default:
		return state;
	}
};

export default toasts;
