/* global room */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import persistState, { mergePersistedState } from 'redux-localstorage';
import adapter from 'redux-localstorage/lib/adapters/sessionStorage';
import filter from 'redux-localstorage-filter';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import VideoAppWebsocket from './utils/VideoAppWebsocket';
import player from './reducers/player';
import VideoAppPlayer from './components/VideoAppPlayer';

const logger = createLogger();

const reducer = compose(
  mergePersistedState()
)(player);

const storage = compose(
  filter('playlist')
)(adapter(window.sessionStorage));

const enhancer = compose(
	applyMiddleware(thunk, logger),
	persistState(storage, room)
);

const socket = new VideoAppWebsocket({ isReceiver: true });
const store = createStore(
	reducer,
	enhancer
);
socket.setStore(store);

render(
	<Provider store={store}>
		<VideoAppPlayer />
	</Provider>,
	document.getElementById('app')
);
