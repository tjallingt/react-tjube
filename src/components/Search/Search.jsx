import React from 'react';
import { connect } from 'react-redux';
import { fetchSearchResults, setSearchQuery, clearSearch } from '../../actions';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';


function Search({ id, query, search, handleClear }) {
	return (
		<div id={id}>
			<SearchBar
				id="search-bar"
				value={query}
				onChange={(event) => search(event.target.value)}
				onClear={handleClear}
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
	search: React.PropTypes.func,
	handleClear: React.PropTypes.func,
};

Search.defaultProps = {
	search: () => null,
	handleClear: () => null,
};

const mapStateToProps = (state) => ({
	query: state.search.query,
});

let searchTimeout;
const mapDispatchToProps = (dispatch) => ({
	search: (query) => {
		dispatch(setSearchQuery(query));
		clearTimeout(searchTimeout);
		if (query.length > 3) {
			searchTimeout = setTimeout(() => dispatch(fetchSearchResults(query)), 500);
		}
	},
	handleClear: () => {
		dispatch(clearSearch());
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
