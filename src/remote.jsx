/* global room */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import remote from './reducers/remote';
import createLogger from 'redux-logger';
import VideoAppWebsocket from './utils/VideoAppWebsocket';
import VideoAppRemote from './components/VideoAppRemote';

const socket = new VideoAppWebsocket();
const logger = createLogger();
let store = createStore(
	remote,
	applyMiddleware(socket.senderMiddleware, logger),
);
socket.setStore(store);

render(
	<Provider store={store}>
		<VideoAppRemote />
	</Provider>,
	document.getElementById('app')
);
