import React from 'react';
import VideoCard from '../VideoCard/VideoCard';
import Spinner from '../Spinner/Spinner';
import styles from './SearchResults.css';

function SearchResults({ id, className, results, isFetching, addVideo }) {
	return (
		<div id={id} className={className}>
			<Spinner
				className={styles.spinner}
				show={isFetching}
			/>
			{results.map(video => (
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
	isFetching: React.PropTypes.bool,
	results: React.PropTypes.array.isRequired,
	addVideo: React.PropTypes.func,
};

SearchResults.defaultProps = {
	addVideo: () => null,
};

export default SearchResults;
