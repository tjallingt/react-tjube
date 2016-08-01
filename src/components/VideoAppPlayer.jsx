/* global room, YT */
import React from 'react';
import { connect } from 'react-redux';
import { deleteVideo, toggleFill, setYoutube } from '../actions';
import classNames from 'classnames';
import YouTube from 'react-youtube';
import ProgressBar from './ProgressBar/ProgressBar';
import PlayList from './PlayList/PlayList';
import Search from './Search/Search';
import styles from './VideoAppPlayer.css';

function VideoAppPlayer({
	fill,
	videoId,
	title,
	subtitle,
	canSkip,
	playNextVideo,
	togglePlayerFill,
	setYoutubePlayer,
}) {
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
	const playerStyle = classNames(styles.player, {
		[styles.fill]: fill,
	});
	const fillBtnStyle = classNames(styles.fillButton, 'fa', {
		'fa-compress': fill,
		'fa-expand': !fill,
	});
	const subtitleStyle = classNames(styles.subtitle, {
		[styles.skipVideo]: canSkip,
	});

	return (
		<div>
			<YouTube
				className={playerStyle}
				videoId={videoId}
				opts={opts}
				onReady={setYoutubePlayer}
				onEnd={playNextVideo}
			/>

			<ProgressBar
				id="progress-bar"
			/>

			<div className={styles.titleWrapper}>
				<h1
					className={styles.title}
				>
					{title}
				</h1>

				<h2
					className={subtitleStyle}
					onClick={playNextVideo}
				>
					{subtitle}
				</h2>
			</div>

			<PlayList
				id="playlist"
			/>

			<Search
				id="search"
			/>

			<div className={styles.buttonWrapper}>
				<i
					className={fillBtnStyle}
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
	canSkip: React.PropTypes.bool,
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
	canSkip: !!state.playlist[1],
});

const mapDispatchToProps = (dispatch) => ({
	playNextVideo: () => dispatch(deleteVideo(0)),
	togglePlayerFill: () => dispatch(toggleFill()),
	setYoutubePlayer: (event) => dispatch(setYoutube(event.target)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoAppPlayer);
