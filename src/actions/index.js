/*
 * action types
 */

export const ADD_VIDEO = 'ADD_VIDEO';
export const DELETE_VIDEO = 'DELETE_VIDEO';
export const MOVE_VIDEO = 'MOVE_VIDEO';
export const TOGGLE_FILL = 'TOGGLE_FILL';
export const SET_YOUTUBE = 'SET_YOUTUBE';
export const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS';
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
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

export const moveVideo = (video, location, target) => ({
	type: MOVE_VIDEO,
	video,
	location,
	target,
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

export const setSearchResults = (results) => ({
	type: SET_SEARCH_RESULTS,
	results,
});

export const setSearchQuery = (query) => ({
	type: SET_SEARCH_QUERY,
	query,
});

export const disconnect = () => ({
	type: DISCONNECT,
});
