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
export const RECEIVE_RESULTS = 'RECEIVE_RESULTS';
export const SET_QUERY = 'SET_QUERY';
export const CLEAR_SEARCH = 'CLEAR_SEARCH';
export const SEND_VIDEO = 'SEND_VIDEO';
export const DISCONNECT = 'DISCONNECT';

/*
 * action creators
 */

export const addVideo = (video) => ({
	type: ADD_VIDEO,
	video,
});

export const deleteVideo = (index) => ({
	type: DELETE_VIDEO,
	index,
});

export const moveVideo = (fromIndex, toIndex) => ({
	type: MOVE_VIDEO,
	fromIndex,
	toIndex,
});

export const sendVideo = (video) => ({
	type: SEND_VIDEO,
	video,
});

export const toggleFill = () => ({
	type: TOGGLE_FILL,
});

export const setYoutube = (youtube) => ({
	type: SET_YOUTUBE,
	youtube,
});

export const receiveSearchResults = (json) => ({
	type: RECEIVE_RESULTS,
	results: json.items.map(filterYoutubeData),
});

export const fetchSearchResults = (query) => (dispatch) => {
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
		.then((json) => dispatch(receiveSearchResults(json)))
		.catch((error) => {
			// dispatch error
			console.log('request failed', error);
		});
};

export const setSearchQuery = (query) => ({
	type: SET_QUERY,
	query,
});

export const clearSearch = () => ({
	type: CLEAR_SEARCH,
});

export const disconnect = () => ({
	type: DISCONNECT,
});
