import React from 'react';
import VideoCard from '../VideoCard/VideoCard';
import styles from './SearchResults.css';

function SearchResults({ id, className, results, isFetching, addVideo }) {
	let loader;
	if (isFetching) {
		loader = (
			<div className={styles.loader}>
				<span />
				<span />
				<span />
			</div>
		);
	}
	return (
		<div id={id} className={className}>
			{loader}
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
