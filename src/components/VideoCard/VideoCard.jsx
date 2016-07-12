import React from 'react';
import styles from './VideoCard.css';

function VideoCard({ id, video }) {
	return (
		<div id={id} className={styles.card}>
			<img className={styles.thumbnail} src={video.thumbnails.medium.url} alt="thumbnail" />
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
};

export default VideoCard;
