import React from 'react';
import ReactDOM from 'react-dom';

import Search from './components/Search/Search';

export default class VideoAppRemote extends React.Component {
	constructor( props ) {
		super( props );
	}

	addVideo( video, removeVideo ) {
		if( confirm( `Do you want to add "${video.snippet.title}" by "${video.snippet.channelTitle}" to the playlist?` ) ) {
			socket.emit( "cueVideo", video );
			removeVideo();
		}		
	}

	render() {
		return(
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