import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import remote from './reducers/remote';
import socketMiddleware from './utils/socketMiddleware';
import VideoAppRemote from './components/VideoAppRemote';

const middlewares = [thunk, socketMiddleware({ room: window.room })];
if (process.env.NODE_ENV !== 'production') {
	const { logger } = require('redux-logger'); // eslint-disable-line global-require
	middlewares.push(logger);
}

const store = createStore(
	remote,
	applyMiddleware(...middlewares),
);

render(
	<Provider store={store}>
		<VideoAppRemote />
	</Provider>,
	document.getElementById('app')
);
