import React from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';
import { fetchSearchResults, clearSearch } from '../../actions';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';


function Search({ id, search, handleClear }) {
	return (
		<div id={id}>
			<SearchBar
				id="search-bar"
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
	search: React.PropTypes.func,
	handleClear: React.PropTypes.func,
};

Search.defaultProps = {
	search: () => null,
	handleClear: () => null,
};

const mapDispatchToProps = (dispatch) => ({
	search: debounce((query) => dispatch(fetchSearchResults(query)), 500),
	handleClear: () => dispatch(clearSearch()),
});

export default connect(null, mapDispatchToProps)(Search);
