/* global room */
import React from 'react';
import ReactDOM from 'react-dom';

import io from 'socket.io-client';

import Search from './components/Search/Search';

export default class VideoAppRemote extends React.Component {
	constructor(props) {
		super(props);
		this.socket = io.connect(window.location.origin);
		this.socket.emit('registerRoom', room);
	}

	addVideo(video) {
		if (confirm(`Do you want to add "${video.title}" by "${video.channelTitle}" to the playlist?`)) {
			this.socket.emit('cueVideo', video);
		}
	}

	render() {
		return (
			<div>
				<Search id="search" onClickVideo={::this.addVideo} />
			</div>
		);
	}
}

ReactDOM.render(
	<VideoAppRemote />,
	document.getElementById('app')
);
