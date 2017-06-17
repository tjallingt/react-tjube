import React from 'react';
import PropTypes from 'prop-types';
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
					showThumbnail
					thumbnailWidth={80}
					noWrap
				/>
			))}
		</div>
	);
}

SearchResults.propTypes = {
	id: PropTypes.string,
	className: PropTypes.string,
	isFetching: PropTypes.bool,
	results: PropTypes.array.isRequired,
	addVideo: PropTypes.func,
};

SearchResults.defaultProps = {
	addVideo: () => null,
};

export default SearchResults;
