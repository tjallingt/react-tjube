/* eslint no-console: 0 */ // while in dev mode...
/* global room, YT */
import React from 'react';
import ReactDOM from 'react-dom';

import update from 'react-addons-update';
import classNames from 'classnames';
import io from 'socket.io-client';

import YouTube from 'react-youtube';
import ProgressBar from './components/ProgressBar';
import VideoList from './components/VideoList/VideoList';
import Search from './components/Search/Search';

export default class VideoAppScreen extends React.Component {
	constructor(props) {
		super(props);
		this.socket = io.connect(window.location.origin);
		this.socket.emit('registerRoom', room);
		this.socket.on('cueVideo', ::this.addVideo);
		this.youtube = {};
		this.state.playlist = this.getSessionPlaylist();
	}

	state = {
		playlist: [],
		fill: false,
		progress: 0,
	};

	onReady(event) {
		console.log('onReady', event, this.state);
		this.youtube = event.target;
	}

	onPlay(event) {
		console.log('onPlay', event, this.state);
		this.updateProgressBar();
	}

	onPause(event) {
		console.log('onPause', event, this.state);
	}

	onEnd(event) {
		console.log('onEnd', event, this.state);
		this.nextVideo();
	}

	onError(event) {
		console.log('onError', event, this.state);
	}

	getSessionPlaylist() {
		const playlist = JSON.parse(sessionStorage.getItem(room));
		if (playlist) {
			return playlist;
		}
		return [];
	}

	setSessionPlaylist() {
		sessionStorage.setItem(room, JSON.stringify(this.state.playlist));
	}

	addVideo(video) {
		console.log('addVideo', video, this.state);
		// check if video is not already in the playlist (react doesn't like children with the same key)
		if (this.state.playlist.indexOf(video) === -1) {
			this.setState(
				update(this.state, {
					playlist: {
						$push: [video],
					},
				}),
				::this.setSessionPlaylist
			);
		}
	}

	deleteVideo(video, index) {
		console.log('deleteVideo', video, this.state);
		this.setState(
			update(this.state, {
				playlist: {
					$splice: [[index, 1]],
				},
			}),
			::this.setSessionPlaylist
		);
	}

	nextVideo() {
		console.log('nextVideo');
		this.deleteVideo({}, 0);
	}

	updateProgressBar() {
		// don't know if this is any good (repeatedly calling setState...)
		this.setState({ progress: (this.youtube.getCurrentTime() / this.youtube.getDuration()) * 100 });
		if (this.youtube.getPlayerState() === YT.PlayerState.PLAYING) {
			setTimeout(::this.updateProgressBar, 250);
		}
	}

	scaleVideo() {
		this.setState({ fill: !this.state.fill });
	}

	render() {
		// set default values
		let videoId = '';
		let title = 'Add videos to the playlist to begin watching!';
		let subtitle = 'Add videos remotely at ' + location.host + '/add/' + room;

		// alter variables
		if (this.state.playlist.length > 0) {
			videoId = this.state.playlist[0].id;
			title = this.state.playlist[0].title;
			if (this.state.playlist.length > 1) {
				subtitle = this.state.playlist[1].title;
			}
		}

		// youtube player options
		const opts = {
			height: '100%',
			width: '100%',
			playerVars: {
				autoplay: 1,
				controls: 0,
				cc_load_policy: 0,
				iv_load_policy: 3,
				modestbranding: 1,
				rel: 0,
				showinfo: 0,
				fs: 0,
			},
		};

		// calculate component classes
		const playerClass = classNames({
			fill: this.state.fill,
		});
		const scaleBtnClass = classNames({
			'pointer': true,
			'fa': true,
			'fa-compress': this.state.fill,
			'fa-expand': !this.state.fill,
		});

		return (
			<div>
				<YouTube
					id="player"
					className={playerClass}
					videoId={videoId}
					opts={opts}
					onReady={::this.onReady}
					onPlay={::this.onPlay}
					onPause={::this.onPause}
					onEnd={::this.onEnd}
					onError={::this.onError}
				/>
				<ProgressBar id="progress-bar" now={this.state.progress} />

				<div id="title-wrapper">
					<div id="title">{title}</div>
					<div id="subtitle">{subtitle}</div>
				</div>

				<VideoList id="playlist" list={this.state.playlist}>
					<div className="delete-button" onClick={::this.deleteVideo}><i className="fa fa-times"></i></div>
				</VideoList>
				<Search id="search" onClickVideo={::this.addVideo} />

				<div id="button-wrapper">
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
