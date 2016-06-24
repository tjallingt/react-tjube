import React from 'react';

function SearchResultsItem({ video, onClick }) {
	const styles = {
		item: {
			position: 'relative',
		},
		text: {
			textOverflow: 'ellipsis',
			whiteSpace: 'nowrap',
			overflow: 'hidden',
		},
	};

	return (
		<li
			className="search-results-item"
			style={styles.item}
			onClick={onClick}
		>
			<div style={styles.text}>{video.title}</div>
			<small style={styles.text}>{video.channelTitle}</small>
		</li>
	);
}

SearchResultsItem.propTypes = {
	video: React.PropTypes.object.isRequired,
	onClick: React.PropTypes.func,
};

export default SearchResultsItem;
