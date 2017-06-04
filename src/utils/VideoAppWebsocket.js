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
	constructor(room, opts = { isReceiver: false }) {
		this.room = room;
		this.store = { dispatch: () => null };
		this.socket = io({ reconnectionAttempts: config.reconnectionAttempts });

		this.socket.on('connect', () => {
			this.socket.emit('registerRoom', this.room);
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

		if (opts.isReceiver) { // is player
			this.socket.on('addVideo', (video) => {
				this.store.dispatch(addVideoWithToast(video));
			});
			// this.socket.on('requestPlaylist', () => {
			// 	this.socket.emit('playlist', this.store.getState().playlist);
			// });
		} else { // is remote
			// this.socket.on('playlist', (playlist) => {
			// 	this.store.dispatch(setPlaylist(playlist));
			// });
		}
	}

	setStore = (store) => {
		this.store = store;
	}

	senderMiddleware = () => next => (action) => {
		switch (action.type) {
		case SEND_VIDEO:
			this.socket.emit('addVideo', action.video, () => {
				this.store.dispatch(showToast(`${action.video.title} was added to the playlist`));
			});
			break;
		// case REQUEST_PLAYLIST:
		// 	this.socket.emit('requestPlaylist');
		// 	break;
		default:
			break;
		}
		return next(action);
	};
}

export default VideoAppWebsocket;
