/* global room */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import persistState from 'redux-localstorage';
import createLogger from 'redux-logger';
import VideoAppWebsocket from './utils/VideoAppWebsocket';
import player from './reducers/player';
import VideoAppPlayer from './components/VideoAppPlayer';

const socket = new VideoAppWebsocket({ isReceiver: true });
const logger = createLogger();
const store = createStore(
	player,
	compose(
		applyMiddleware(logger),
		persistState('playlist', { key: room })
	)
);
socket.setStore(store);

render(
	<Provider store={store}>
		<VideoAppPlayer />
	</Provider>,
	document.getElementById('app')
);
