import React from 'react';
import styles from './SearchResultsItem.css';

function SearchResultsItem({ video, onClick }) {
	return (
		<div
			className={styles.item}
			onClick={onClick}
		>
			<div className={styles.text}>{video.title}</div>
			<small className={styles.text}>{video.channelTitle}</small>
		</div>
	);
}

SearchResultsItem.propTypes = {
	video: React.PropTypes.object.isRequired,
	onClick: React.PropTypes.func,
};

export default SearchResultsItem;
