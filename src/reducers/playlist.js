import update from 'react-addons-update';
import { ADD_VIDEO, DELETE_VIDEO, MOVE_VIDEO } from '../actions';

const playlist = (state = [], action) => {
	switch (action.type) {
	case ADD_VIDEO:
		return update(state, {
			$push: [{
				...action.video,
				key: action.video.key + Date.now(), // make key unique
			}],
		});
	case DELETE_VIDEO:
		return update(state, {
			$splice: [
				[action.index, 1],
			],
		});
	case MOVE_VIDEO:
		return update(state, {
			$splice: [
				[action.fromIndex, 1],
				[action.toIndex, 0, state[action.fromIndex]],
			],
		});
	default:
		return state;
	}
};

export default playlist;
