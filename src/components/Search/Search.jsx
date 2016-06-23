import React from 'react';


import SearchBar from './SearchBar';
import SearchResults from './SearchResults';


function Search({ id, query, setQuery, clearSearch }) {
	return (
		<div id={id}>
			<SearchBar
				id="search-bar"
				value={query}
				onChange={setQuery}
				onClear={clearSearch}
			/>
			<SearchResults
				id="search-results"
			/>
		</div>
	);
}

Search.propTypes = {
	id: React.PropTypes.string,
	query: React.PropTypes.string,
	setQuery: React.PropTypes.func,
	clearSearch: React.PropTypes.func,
};

Search.defaultProps = {
	setQuery: () => null,
	clearSearch: () => null,
};

export default Search;
