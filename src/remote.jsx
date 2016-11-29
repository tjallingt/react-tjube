/* global room */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import remote from './reducers/remote';
import VideoAppWebsocket from './utils/VideoAppWebsocket';
import VideoAppRemote from './components/VideoAppRemote';

const socket = new VideoAppWebsocket();
const middlewares = [thunk, socket.senderMiddleware];
if (process.env.NODE_ENV !== 'production') {
	const createLogger = require('redux-logger'); // eslint-disable-line
	const logger = createLogger();
	middlewares.push(logger);
}

const store = createStore(
	remote,
	applyMiddleware(...middlewares),
);
socket.setStore(store);

render(
	<Provider store={store}>
		<VideoAppRemote />
	</Provider>,
	document.getElementById('app')
);
