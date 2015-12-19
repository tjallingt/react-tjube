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
		youtube: {},
		playlist: [],
		fill: false,
		progress: 0,
	};

	onReady(event) {
		console.log('onReady', event, this.state);
		this.setState({ youtube: event.target });
	}

	onPlay(event) {
		console.log('onPlay', event, this.state);
	}

	onPause(event) {
		console.log('onPause', event, this.state);
	}

	onEnd(event) {
		console.log('onEnd', event, this.state);
		this.playNextVideo();
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

	setNextVideo(video, index) {
		this.setState(
			update(this.state, {
				playlist: {
					$splice: [
						[index, 1],
						[1, 0, video],
					],
				},
			}),
			::this.setSessionPlaylist
		);
	}

	addVideo(video) {
		video.key += Date.now(); // make key unique (unless added multiple times in 1 millisecond)
		this.setState(
			update(this.state, {
				playlist: {
					$push: [video],
				},
			}),
			::this.setSessionPlaylist
		);
	}

	deleteVideo(video, index) {
		this.setState(
			update(this.state, {
				playlist: {
					$splice: [
						[index, 1],
					],
				},
			}),
			::this.setSessionPlaylist
		);
	}

	playNextVideo() {
		this.deleteVideo(this.state.playlist[0], 0);
	}

	togglePlayerFill() {
		this.setState({ fill: !this.state.fill });
	}

	render() {
		// set default values
		let videoId = '';
		let title = 'Add videos to the playlist to begin watching!';
		let subtitle = 'Add videos remotely at ' + location.host + '/' + room;

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
		const fillBtnClass = classNames({
			'pointer': true,
			'fa': true,
			'fa-compress': this.state.fill,
			'fa-expand': !this.state.fill,
		});
		const subtitleClass = classNames({
			'skip-video': (this.state.playlist.length > 0),
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
				<ProgressBar id="progress-bar" youtube={this.state.youtube} />

				<div id="title-wrapper">
					<div id="title">{title}</div>
					<div id="subtitle" className={subtitleClass} onClick={::this.playNextVideo}>{subtitle}</div>
				</div>

				<VideoList id="playlist" list={this.state.playlist}>
					<span className="play-next-button" onClick={::this.setNextVideo}><i className="fa fa-rotate-270 fa-step-forward"></i></span>
					<span className="delete-button" onClick={::this.deleteVideo}><i className="fa fa-times"></i></span>
				</VideoList>
				<Search id="search" onClickVideo={::this.addVideo} />

				<div id="player-button-wrapper">
					<i className={fillBtnClass} onClick={::this.togglePlayerFill}></i>
					<a href="/about" target="_blank">
						<i className="fa fa-question-circle"></i>
					</a>
					<span>{room}</span>
				</div>
			</div>
		);
	}
}

ReactDOM.render(
	<VideoAppScreen />,
	document.getElementById('app')
);
