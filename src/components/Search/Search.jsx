import React from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';
import { addVideo, fetchSearchResults, clearSearch } from '../../actions';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from './SearchResults';


function Search({ id, results, search, handleClear, handleAddVideo }) {
	return (
		<div id={id}>
			<SearchBar
				id="search-bar"
				onChange={(event) => search(event.target.value)}
				onClear={handleClear}
			/>
			<SearchResults
				id="search-results"
				results={results}
				addVideo={handleAddVideo}
			/>
		</div>
	);
}

Search.propTypes = {
	id: React.PropTypes.string,
	results: React.PropTypes.array,
	search: React.PropTypes.func,
	handleClear: React.PropTypes.func,
	handleAddVideo: React.PropTypes.func,
};

Search.defaultProps = {
	search: () => null,
	handleClear: () => null,
};

const mapStateToProps = (state) => ({
	results: state.results,
});

const mapDispatchToProps = (dispatch) => ({
	search: debounce((query) => dispatch(fetchSearchResults(query)), 500),
	handleClear: () => dispatch(clearSearch()),
	handleAddVideo: (video) => dispatch(addVideo(video)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
