import 'whatwg-fetch'; // fetch API polyfill
import config from '../Config';
import { serialize, checkStatus, parseJSON } from '../utils/fetchUtils';
import filterYoutubeData from '../utils/FilterYoutubeData';

/*
 * action types
 */

export const ADD_VIDEO = 'ADD_VIDEO';
export const DELETE_VIDEO = 'DELETE_VIDEO';
export const MOVE_VIDEO = 'MOVE_VIDEO';
export const TOGGLE_FILL = 'TOGGLE_FILL';
export const SET_YOUTUBE = 'SET_YOUTUBE';
export const FETCH_SEARCH_RESULTS = 'FETCH_SEARCH_RESULTS';
export const RECEIVE_SEARCH_RESULTS = 'RECEIVE_SEARCH_RESULTS';
export const CLEAR_SEARCH_RESULTS = 'CLEAR_SEARCH_RESULTS';
export const SEND_VIDEO = 'SEND_VIDEO';
export const CONNECT = 'CONNECT';
export const DISCONNECT = 'DISCONNECT';
export const RECONNECT = 'RECONNECT';
export const RECONNECT_FAILED = 'RECONNECT_FAILED';
export const PUSH_TOAST = 'PUSH_TOAST';
export const POP_TOAST = 'POP_TOAST';

/*
 * action creators
 */

export const addVideo = video => ({
	type: ADD_VIDEO,
	video,
	date: Date.now(),
});

export const deleteVideo = index => ({
	type: DELETE_VIDEO,
	index,
});

export const moveVideo = (fromIndex, toIndex) => ({
	type: MOVE_VIDEO,
	fromIndex,
	toIndex,
});

export const sendVideo = video => ({
	type: SEND_VIDEO,
	video,
});

export const toggleFill = () => ({
	type: TOGGLE_FILL,
});

export const setYoutube = youtube => ({
	type: SET_YOUTUBE,
	youtube,
});

export const receiveSearchResults = json => ({
	type: RECEIVE_SEARCH_RESULTS,
	results: json.items.map(filterYoutubeData),
});

export const fetchSearchResults = query => (dispatch) => {
	if (query.length < 3) return null;
	dispatch({ type: FETCH_SEARCH_RESULTS });
	const parameters = serialize({
		videoEmbeddable: true,
		part: 'snippet',
		type: 'video',
		maxResults: 20,
		key: config.youtubeApiKey,
		q: query,
	});
	return fetch(`https://www.googleapis.com/youtube/v3/search?${parameters}`)
		.then(checkStatus)
		.then(parseJSON)
		.then(json => dispatch(receiveSearchResults(json)))
		.catch((error) => {
			// dispatch error
			console.log('request failed', error);
		});
};

export const clearSearch = () => ({
	type: CLEAR_SEARCH_RESULTS,
});

export const connect = () => ({
	type: CONNECT,
});

export const disconnect = () => ({
	type: DISCONNECT,
});

export const reconnect = attempt => ({
	type: RECONNECT,
	attempt,
});

export const reconnectFailed = () => ({
	type: RECONNECT_FAILED,
});

export const pushToast = message => ({
	type: PUSH_TOAST,
	key: Date.now(),
	message,
});

export const popToast = () => ({
	type: POP_TOAST,
});

export const showToast = message => (dispatch) => {
	dispatch(pushToast(message));
	setTimeout(() => dispatch(popToast()), 2500);
};

export const addVideoWithToast = video => (dispatch) => {
	dispatch(addVideo(video));
	dispatch(showToast(`${video.title} was added to the playlist`));
};
