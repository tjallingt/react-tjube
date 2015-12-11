/* global socket, room */
import React from 'react';
import ReactDOM from 'react-dom';

import Search from './components/Search/Search';

export default class VideoAppRemote extends React.Component {
	constructor(props) {
		super(props);
	}

	addVideo(video) {
		if (confirm(`Do you want to add "${video.title}" by "${video.channelTitle}" to the playlist?`)) {
			socket.emit('cueVideo', video);
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
