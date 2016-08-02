import React from 'react';
import VideoCard from '../VideoCard/VideoCard';
import styles from './SearchResults.css';

function SearchResults({ id, results, ...props }) {
	return (
		<div
			id={id}
		>
			{results.map((video) => (
				<VideoCard
					key={video.key}
					className={styles.item}
					video={video}
					onClick={() => props.addVideo(video)}
				/>
			))}
		</div>
	);
}

SearchResults.propTypes = {
	id: React.PropTypes.string,
	results: React.PropTypes.array.isRequired,
	addVideo: React.PropTypes.func,
};

SearchResults.defaultProps = {
	addVideo: () => null,
};

export default SearchResults;
