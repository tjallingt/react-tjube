import React from 'react';
import styles from './VideoCard.css';

function VideoCard({ id, video, thumbnail }) {
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
		<div id={id} className={styles.card}>
			{image}
			<div className={styles.wrapper}>
				<div>{video.title}</div>
				<small>{video.channelTitle}</small>
			</div>
		</div>
	);
}

VideoCard.propTypes = {
	id: React.PropTypes.string,
	video: React.PropTypes.object,
	thumbnail: React.PropTypes.string,
};

export default VideoCard;
