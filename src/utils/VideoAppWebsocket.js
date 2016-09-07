/* global room */
import io from 'socket.io-client';
import {
	addVideoWithToast,
	showToast,
	connect,
	disconnect,
	reconnect,
	reconnectFailed,
	SEND_VIDEO,
} from '../actions';
import config from '../Config';

class VideoAppWebsocket {
	constructor(opts = { isReceiver: false }) {
		this.store = { dispatch: () => null };
		this.socket = io({ reconnectionAttempts: config.reconnectionAttempts });

		this.socket.on('connect', () => {
			this.socket.emit('registerRoom', room);
			this.store.dispatch(connect());
		});

		this.socket.on('disconnect', () => {
			this.store.dispatch(disconnect());
		});

		this.socket.on('reconnecting', (attempt) => {
			this.store.dispatch(reconnect(attempt));
		});

		this.socket.on('reconnect_failed', () => {
			this.store.dispatch(reconnectFailed());
		});

		if (opts.isReceiver) {
			this.socket.on('addVideo', (video) => {
				this.store.dispatch(addVideoWithToast(video));
			});
		}
	}

	setStore = (store) => {
		this.store = store;
	}

	senderMiddleware = () => next => action => {
		if (action.type === SEND_VIDEO) {
			this.socket.emit('addVideo', action.video, () => {
				this.store.dispatch(showToast(`${action.video.title} was added to the playlist`));
			});
		}
		return next(action);
	};
}

export default VideoAppWebsocket;
