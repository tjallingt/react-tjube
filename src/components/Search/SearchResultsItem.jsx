import React from 'react';

function SearchResultsItem({ video, onClick }) {
	const styles = {
		item: {
			position: 'relative',
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
			{video.title}<br />
			by {video.channelTitle}
		</li>
	);
}

SearchResultsItem.propTypes = {
	video: React.PropTypes.object.isRequired,
	onClick: React.PropTypes.func,
};

export default SearchResultsItem;
