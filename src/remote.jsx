import React from 'react';
import ReactDOM from 'react-dom';

import Search from './components/Search/Search';

export default class VideoAppRemote extends React.Component {
	constructor( props ) {
		super( props );
	}

	addVideo( video ) {
		if( confirm( "Do you want to add this video to the playlist?\n\n add name + channel or smth" ) ) socket.emit( "cueVideo", video );
	}

	render() {
		const styles = {
			search: {
				position: "absolute",
				top: 10,
				left: "25%",
				width: "50%"
			}
		};

		return(
			<div>
				<Search style={styles.search} addVideo={::this.addVideo} />
			</div>
		);
	}
}

ReactDOM.render(
	<VideoAppRemote />,
	document.getElementById('app')
);