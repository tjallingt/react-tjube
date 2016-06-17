import React from 'react';
import SearchResultsItem from './SearchResultsItem';

function SearchResults({ id, results, onClickItem }) {
	const styles = {
		list: {
			listStyleType: 'none',
		},
	};

	let list = results.map((video, index) => {
		let boundOnClick = onClickItem.bind(this, video, index);
		return (
			<SearchResultsItem
				key={video.key}
				index={index}
				video={video}
				onClick={boundOnClick}
			/>
		);
	});

	return (
		<ul
			id={id}
			style={styles.list}
		>
			{list}
		</ul>
	);
}

SearchResults.propTypes = {
	id: React.PropTypes.string,
	results: React.PropTypes.array.isRequired,
	onClickItem: React.PropTypes.func,
};

SearchResults.defaultProps = {
	onClickItem: () => null,
};

export default SearchResults;
