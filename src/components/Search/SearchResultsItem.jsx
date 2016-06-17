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
			className="video-list-item"
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

SearchResultsItem.defaultProps = {
	onClickVideo: () => null,
};

export default SearchResultsItem;
