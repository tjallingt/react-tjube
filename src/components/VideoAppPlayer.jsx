/* global room, YT */
import React from 'react';
import { connect } from 'react-redux';
import { deleteVideo, toggleFill, setYoutube } from '../actions';
import classNames from 'classnames';
import YouTube from 'react-youtube';
import ProgressBar from './ProgressBar/ProgressBar';
import PlayList from './PlayList/PlayList';
import Search from './Search/Search';

function VideoAppPlayer(props) {
	const {
		fill,
		videoId,
		title,
		subtitle,
		playNextVideo,
		togglePlayerFill,
		setYoutubePlayer,
	} = props;

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
		fill,
	});
	const fillBtnClass = classNames({
		pointer: true,
		fa: true,
		'fa-compress': fill,
		'fa-expand': !fill,
	});
	const subtitleClass = classNames({
		'skip-video': subtitle !== VideoAppPlayer.defaultProps.subtitle,
	});

	return (
		<div>
			<YouTube
				id="player"
				className={playerClass}
				videoId={videoId}
				opts={opts}
				onReady={setYoutubePlayer}
				onEnd={playNextVideo}
			/>

			<ProgressBar
				id="progress-bar"
			/>

			<div id="title-wrapper">
				<div id="title">
					{title}
				</div>

				<div
					id="subtitle"
					className={subtitleClass}
					onClick={playNextVideo}
				>
					{subtitle}
				</div>
			</div>

			<PlayList
				id="playlist"
			/>

			<Search
				id="search"
			/>

			<div id="player-button-wrapper">
				<i
					className={fillBtnClass}
					onClick={togglePlayerFill}
				/>

				<a
					href="/about"
					target="_blank"
				>
					<i className="fa fa-question-circle" />
				</a>

				<span>
					{room}
				</span>
			</div>
		</div>
	);
}

VideoAppPlayer.propTypes = {
	fill: React.PropTypes.bool,
	videoId: React.PropTypes.string,
	title: React.PropTypes.string,
	subtitle: React.PropTypes.string,
	playNextVideo: React.PropTypes.func,
	togglePlayerFill: React.PropTypes.func,
	setYoutubePlayer: React.PropTypes.func,
};

VideoAppPlayer.defaultProps = {
	fill: false,
	title: 'Add videos to the playlist to begin watching!',
	subtitle: `Add videos remotely at ${location.host}/${room}`,
	playNextVideo: () => null,
	togglePlayerFill: () => null,
	setYoutubePlayer: () => null,
};

const mapStateToProps = (state) => ({
	fill: state.player.fill,
	videoId: state.playlist[0] ? state.playlist[0].id : undefined,
	title: state.playlist[0] ? state.playlist[0].title : undefined,
	subtitle: state.playlist[1] ? state.playlist[1].title : undefined,
});

const mapDispatchToProps = (dispatch) => ({
	playNextVideo: () => dispatch(deleteVideo(0)),
	togglePlayerFill: () => dispatch(toggleFill()),
	setYoutubePlayer: (event) => dispatch(setYoutube(event.target)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoAppPlayer);
