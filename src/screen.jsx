import React from 'react';
import ReactDOM from 'react-dom';
import YouTube from 'react-youtube';

import VideoList from './components/VideoList/VideoList';
import Search from './components/Search/Search';

export default class VideoAppScreen extends React.Component {
	state = { 
		playing: 0,
		playlist: [],
		fill: false
	};

	constructor( props ) {
		super( props );
		socket.on( "cueVideo", ::this.addVideo );
	}

	addVideo( video ) {
		console.log( "addVideo", video, this.state );
		this.setState( ( state ) => ({playlist: state.playlist.concat( video )}) );
	}

	onReady( event ) {
		console.log( "onReady", event, this.state );
		if( typeof this.state.playlist[this.state.playing] !== 'undefined' ) {
			event.target.playVideo();
		}
	}

	onPlay( event ) {
		console.log( "onPlay", event, this.state );
	}

	onPause( event ) {
		console.log( "onPause", event, this.state );
	}

	onEnd( event ) {
		console.log( "onEnd", event, this.state );
		this.setState( ( state ) => ({playing: state.playing + 1}) );
	}

	onError( event ) {
		console.log( "onError", event, this.state );
	}

	scaleVideo() {
		this.setState( ( state ) => ({fill: !state.fill}) );
	}

	render() {
		let url = '';
		const opts = {
			height: '100%',
			width: '100%',
			playerVars: {
				controls: 1, // disable later
				cc_load_policy : 0,
				iv_load_policy: 3,
				modestbranding: 1,
				rel: 0,
				showinfo: 0,
				fs: 0
			}
		};
		const styles = {
			player: {
				height: "100vh",
				width: "100vw",
				zIndex: -1
			},
			playlist: {
				position: "absolute", 
				top: 10,
				right: 10,
				maxWidth: 250,
			},
			search: {
				position: "absolute",
				top: 10,
				left: 10,
				maxWidth: 300
			},
			button: {
				position: "absolute",
				left: 20,
				bottom: 20
			}
		};

		if( this.state.fill == true ) {
			Object.assign( styles.player, {
				position: "absolute",
				left: "50%",
				top: "50%",
				transform: "translate(-50%, -50%)",
				width: "100vw",
				height: "56.25vw",
				minHeight: "100vh",
				minWidth: "177.78vh"
			});
		}

		if( typeof this.state.playlist[this.state.playing] !== 'undefined' ) {
			url = 'http://youtu.be/' + this.state.playlist[this.state.playing].id.videoId;
		}

		return(
			<div>
				<div style={styles.button} onClick={::this.scaleVideo}>fit/fill</div>
				<div id="player" style={styles.player}>
					<YouTube
						url={url}
						opts={opts}
						onReady={::this.onReady}
						onPlay={::this.onPlay}
						onPause={::this.onPause}
						onEnd={::this.onEnd}
						onError={::this.onError}
					/>
				</div>
				<VideoList style={styles.playlist} list={this.state.playlist} />
				<Search style={styles.search} addVideo={::this.addVideo} />
			</div>
		);
	}
}

ReactDOM.render(
	<VideoAppScreen />,
	document.getElementById('app')
);