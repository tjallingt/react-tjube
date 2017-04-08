import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import YouTube from 'react-youtube';

function Player({ className, fill, fillStyle, videoId, setYoutube, skipVideo }) {
	// youtube player options
	const opts = {
		height: '100%',
		width: '100%',
		playerVars: {
			autoplay: 1,
			controls: 0,
			cc_load_policy: 0,
			fs: 0,
			iv_load_policy: 3,
			modestbranding: 1,
			rel: 0,
			showinfo: 0,
		},
	};

	const playerStyle = classNames(className, {
		[fillStyle]: fill,
	});

	return (
		<YouTube
			id="player"
			className={playerStyle}
			videoId={videoId}
			opts={opts}
			onReady={setYoutube}
			onEnd={skipVideo}
		/>
	);
}

Player.propTypes = {
	className: PropTypes.string,
	fill: PropTypes.bool,
	fillStyle: PropTypes.string,
	setYoutube: PropTypes.func,
	skipVideo: PropTypes.func,
	videoId: PropTypes.string,
};

Player.defaultProps = {
	setYoutube: () => null,
	skipVideo: () => null,
};

export default Player;
