import React from 'react';

function Alert({ id, video }) {
	const styles = {
		card: {
			display: 'flex',
			padding: 5,
		},
		thumbnail: {
			height: 75,
		},
		wrapper: {
			marginLeft: 10,
		},
	};

	return (
		<div id={id} style={styles.card}>
			<img style={styles.thumbnail} src={video.thumbnails.medium.url} alt="thumbnail" />
			<div style={styles.wrapper}>
				<div>{video.title}</div>
				<small>{video.channelTitle}</small>
			</div>
		</div>
	);
}

Alert.propTypes = {
	id: React.PropTypes.string,
	video: React.PropTypes.object,
};

export default Alert;
