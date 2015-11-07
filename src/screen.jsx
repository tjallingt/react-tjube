import React from 'react';
import ReactDOM from 'react-dom';
import YouTube from 'react-youtube';
import ClassNames from 'classnames';

import ProgressBar from './components/ProgressBar';
import VideoList from './components/VideoList/VideoList';
import Search from './components/Search/Search';

export default class VideoAppScreen extends React.Component {
	state = { 
		playlist: [],
		fill: false,
		progress: 0
	};

	constructor( props ) {
		super( props );
		socket.on( "cueVideo", ::this.addVideo );

		this.youtube = {};
	}

	componentDidMount() {
		let playlist = JSON.parse( sessionStorage.getItem( room ) );
		if( playlist ) {
			//this.setState({playlist: playlist});
		}
	}

	addVideo( video, removeVideo ) {
		console.log( "addVideo", video, this.state );
		this.setState(
			( state ) => {
				state.playlist.push( video );
				return {playlist: state.playlist};
			},
			::this.updateSessionStore
		);

		//calls by socket.io don't have a remove callback...
		if( typeof removeVideo === "function" ) {
			removeVideo();
		}
	}

	nextVideo() {
		console.log( "nextVideo" );
		this.setState( 
			( state ) => {
				state.playlist.shift();
				return {playlist: state.playlist};
			},
			::this.updateSessionStore
		);
	}

	updateProgressBar() {
		// don't know if this is any good (repeatedly calling setState...)
		this.setState( ( state ) => {
			return {progress: (this.youtube.getCurrentTime() / this.youtube.getDuration()) * 100};
		});
		if( this.youtube.getPlayerState() === YT.PlayerState.PLAYING ) {
			setTimeout( ::this.updateProgressBar, 250 );
		}
	}

	scaleVideo() {
		this.setState( ( state ) => {
			return {fill: !state.fill};
		});
	}

	updateSessionStore() {
		sessionStorage.setItem( room, JSON.stringify( this.state.playlist ) );
	}

	onReady( event ) {
		console.log( "onReady", event, this.state );
		this.youtube = event.target;
	}

	onPlay( event ) {
		console.log( "onPlay", event, this.state );
		this.updateProgressBar();
	}

	onPause( event ) {
		console.log( "onPause", event, this.state );
	}

	onEnd( event ) {
		console.log( "onEnd", event, this.state );
		this.nextVideo();
	}

	onError( event ) {
		console.log( "onError", event, this.state );
	}

	render() {
		let url = '';
		let title = 'add videos to the playlist to begin';
		const opts = {
			height: '100%',
			width: '100%',
			playerVars: {
				autoplay: 1,
				controls: 0,
				cc_load_policy : 0,
				iv_load_policy: 3,
				modestbranding: 1,
				rel: 0,
				showinfo: 0,
				fs: 0
			}
		};
		let playerClass = ClassNames({
			fill: this.state.fill
		});
		let scaleBtnClass = ClassNames({
			'fa': true,
			'fa-lg': true,
			'fa-compress': this.state.fill,
			'fa-expand': !this.state.fill
		});

		if( this.state.playlist.length > 0 ) {
			url = 'http://youtu.be/' + this.state.playlist[0].id.videoId;
			title = this.state.playlist[0].snippet.title;
		}

		return(
			<div>
				<div id="player" className={playerClass}>
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
				<ProgressBar id="progress-bar" now={this.state.progress} />
				<span id="title" onClick={::this.nextVideo}>{title}</span>
				<VideoList id="playlist" list={this.state.playlist} />
				<Search id="search" onClickVideo={::this.addVideo} />
				<div id="button-row">
					<i className={scaleBtnClass} onClick={::this.scaleVideo}></i>
					<span>/add/{room}</span>
				</div>
			</div>
		);
	}
}

ReactDOM.render(
	<VideoAppScreen />,
	document.getElementById('app')
);