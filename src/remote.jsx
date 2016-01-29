/* global room */
import React from 'react';
import ReactDOM from 'react-dom';

import io from 'socket.io-client';

import Search from './components/Search/Search';

export default class VideoAppRemote extends React.Component {
	constructor(props) {
		super(props);
		this.socket = io();
		this.socket.on('connect', () => {
			this.socket.emit('registerRoom', room);
		});
		this.socket.on('disconnect', () => {
			if (confirm('You got disconnected!\nReload the page?')) {
				location.reload();
			}
		});
	}

	addVideo = (video) => {
		const question =
			'Do you want to add\n' +
			`"${video.title}" by "${video.channelTitle}"\n` +
			'to the playlist?';
		if (confirm(question)) {
			this.socket.emit('cueVideo', video);
		}
	};

	render() {
		return (
			<div>
				<Search
					id="search"
					onClickVideo={this.addVideo}
				/>
			</div>
		);
	}
}

ReactDOM.render(
	<VideoAppRemote />,
	document.getElementById('app')
);
