/* global room */
import io from 'socket.io-client';
import { addVideoWithToast, showToast, disconnect, SEND_VIDEO } from '../actions';

class VideoAppWebsocket {
	constructor(opts = { isReceiver: false }) {
		this.store = { dispatch: () => null };
		this.socket = io();

		this.socket.on('connect', () => {
			this.socket.emit('registerRoom', room);
		});

		this.socket.on('disconnect', () => {
			this.store.dispatch(disconnect());
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
