/* global room, YT */
import React from 'react';
import ReactDOM from 'react-dom';
import update from 'react-addons-update';
import YouTube from 'react-youtube';

import io from 'socket.io-client';
import classNames from 'classnames';

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
	}

	state = {
		playlist: [],
		fill: false,
		progress: 0,
	};

	componentDidMount() {
		const playlist = JSON.parse(sessionStorage.getItem(room));
		if (playlist) {
			// this.setState({playlist: playlist});
		}
	}

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
				::this.updateSessionStore
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
			::this.updateSessionStore
		);
	}

	nextVideo() {
		console.log('nextVideo');
		this.deleteVideo({}, 0);
	}

	updateProgressBar() {
		// don't know if this is any good (repeatedly calling setState...)
		this.setState({progress: (this.youtube.getCurrentTime() / this.youtube.getDuration()) * 100});
		if (this.youtube.getPlayerState() === YT.PlayerState.PLAYING) {
			setTimeout(::this.updateProgressBar, 250);
		}
	}

	scaleVideo() {
		this.setState({fill: !this.state.fill});
	}

	updateSessionStore() {
		sessionStorage.setItem(room, JSON.stringify(this.state.playlist));
	}

	render() {
		// set default values
		let url = '';
		let title = 'Add videos to the playlist to begin watching!';
		let subtitle = 'Add videos remotely at ' + location.host + '/add/' + room;

		// alter variables
		if (this.state.playlist.length > 0) {
			url = 'http://youtu.be/' + this.state.playlist[0].id;
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
		const subtitleClass = classNames({
			'pointer': (this.state.playlist.length > 0),
		});
		const nextVideoClass = classNames({
			'fa': true,
			'fa-fast-forward': (this.state.playlist.length > 0),
		});

		return (
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

				<div id="title-wrapper">
					<div id="title">{title}</div>
					<div id="subtitle" className={subtitleClass} onClick={::this.nextVideo}>
						<i className={nextVideoClass}></i> {subtitle}
					</div>
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
