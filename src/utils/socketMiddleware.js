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

export default function socketMiddleware({ room = '', isReceiver = false }) {
	const socket = io({ reconnectionAttempts: config.reconnectionAttempts });

	return (store) => {
		socket.on('connect', () => {
			if (room && room.length === 3) {
				socket.emit('registerRoom', room);
			}
			store.dispatch(connect());
		});

		socket.on('disconnect', () => {
			store.dispatch(disconnect());
		});

		socket.on('reconnecting', (attempt) => {
			store.dispatch(reconnect(attempt));
		});

		socket.on('reconnect_failed', () => {
			store.dispatch(reconnectFailed());
		});

		if (isReceiver) { // is player
			socket.on('addVideo', (video) => {
				store.dispatch(addVideoWithToast(video));
			});
			// socket.on('requestPlaylist', () => {
			// 	socket.emit('playlist', store.getState().playlist);
			// });
		} else { // is remote
			// socket.on('playlist', (playlist) => {
			// 	store.dispatch(setPlaylist(playlist));
			// });
		}

		return next => (action) => {
			switch (action.type) {
			case SEND_VIDEO:
				socket.emit('addVideo', action.video, () => {
					store.dispatch(showToast(`${action.video.title} was added to the playlist`));
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
	};
}
