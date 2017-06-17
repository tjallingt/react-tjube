import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './VideoCard.css';

function VideoCard({ video, showThumbnail, thumbnailWidth, noWrap, className, onClick }) {
	let image;
	if (showThumbnail) {
		image = (
			<img
				className={styles.thumbnail}
				src={video.thumbnail}
				style={{
					width: thumbnailWidth,
					minWidth: thumbnailWidth, // without this images get squashed by the text...
					height: Math.round((thumbnailWidth / 16) * 9),
				}}
				alt=""
			/>
		);
	}

	return (
		<div onClick={onClick} className={classNames(styles.card, className)}>
			{image}
			<div className={classNames(styles.wrapper, { [styles.noWrap]: noWrap })}>
				<div className={styles.title}>{video.title}</div>
				<div className={styles.channelTitle}>{video.channelTitle}</div>
			</div>
		</div>
	);
}

VideoCard.propTypes = {
	className: PropTypes.string,
	onClick: PropTypes.func,
	video: PropTypes.object,
	showThumbnail: PropTypes.bool,
	thumbnailWidth: PropTypes.number,
	noWrap: PropTypes.bool,
};

VideoCard.defaultProps = {
	showThumbnail: false,
	thumbnailWidth: 130,
	noWrap: false,
};

export default VideoCard;
