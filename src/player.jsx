import 'now-env';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import persistState, { mergePersistedState } from 'redux-localstorage';
import adapter from 'redux-localstorage/lib/adapters/sessionStorage';
import filter from 'redux-localstorage-filter';
import thunk from 'redux-thunk';
import socketMiddleware from './utils/socketMiddleware';
import player from './reducers/player';
import VideoAppPlayer from './components/VideoAppPlayer';
import { startTour } from './actions';

const reducer = compose(
	mergePersistedState()
)(player);

const storage = compose(
	filter('playlist')
)(adapter(sessionStorage));

const middlewares = [thunk, socketMiddleware({ room: window.room, isReceiver: true })];
if (process.env.NODE_ENV !== 'production') {
	const { logger } = require('redux-logger'); // eslint-disable-line global-require
	middlewares.push(logger);
}

const enhancer = compose(
	applyMiddleware(...middlewares),
	persistState(storage, window.room)
);

const store = createStore(
	reducer,
	enhancer
);

if (localStorage.getItem('visited') == null) {
	store.dispatch(startTour());
	localStorage.setItem('visited', true);
}

render(
	<Provider store={store}>
		<VideoAppPlayer />
	</Provider>,
	document.getElementById('app')
);
