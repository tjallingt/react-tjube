import React from 'react';
import VideoCard from '../VideoCard/VideoCard';
import styles from './SearchResults.css';

function SearchResults({ id, className, results, addVideo }) {
	return (
		<div id={id} className={className}>
			{results.map((video) => (
				<VideoCard
					key={video.key}
					className={styles.item}
					video={video}
					onClick={() => addVideo(video)}
					thumbnailQuality="default"
					thumbnailWidth={80}
					noWrap
				/>
			))}
		</div>
	);
}

SearchResults.propTypes = {
	id: React.PropTypes.string,
	className: React.PropTypes.string,
	results: React.PropTypes.array.isRequired,
	addVideo: React.PropTypes.func,
};

SearchResults.defaultProps = {
	addVideo: () => null,
};

export default SearchResults;
