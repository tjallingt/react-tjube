import React from 'react';
import SearchResultsItem from './SearchResultsItem';

function SearchResults({ id, results, ...props }) {
	return (
		<div
			id={id}
		>
			{results.map((video, index) => (
				<SearchResultsItem
					key={video.key}
					index={index}
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
