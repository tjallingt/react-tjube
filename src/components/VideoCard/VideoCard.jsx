import React from 'react';
import styles from './VideoCard.css';

function VideoCard({ video, thumbnail, className, ...other }) {
	let image;
	if (thumbnail) {
		image = (
			<img
				className={styles.thumbnail}
				src={video.thumbnails[thumbnail].url}
				alt="thumbnail"
			/>
		);
	}

	return (
		<div {...other} className={`${styles.card} ${className}`}>
			{image}
			<div className={styles.wrapper}>
				<div className={styles.title}>{video.title}</div>
				<div className={styles.channelTitle}>{video.channelTitle}</div>
			</div>
		</div>
	);
}

VideoCard.propTypes = {
	video: React.PropTypes.object,
	thumbnail: React.PropTypes.string,
	className: React.PropTypes.string,
};

export default VideoCard;
