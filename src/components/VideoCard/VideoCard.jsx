import React from 'react';
import classNames from 'classnames';

import styles from './VideoCard.css';

function VideoCard({ video, thumbnailQuality, thumbnailWidth, noWrap, className, onClick }) {
	let image;
	if (thumbnailQuality) {
		image = (
			<img
				className={styles.thumbnail}
				src={video.thumbnails[thumbnailQuality].url}
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
	className: React.PropTypes.string,
	onClick: React.PropTypes.func,
	video: React.PropTypes.object,
	thumbnailQuality: React.PropTypes.string,
	thumbnailWidth: React.PropTypes.number,
	noWrap: React.PropTypes.bool,
};

VideoCard.defaultProps = {
	thumbnailWidth: 130,
	noWrap: false,
};

export default VideoCard;
