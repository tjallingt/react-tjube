import React from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';
import { addVideo, addVideoWithToast, fetchSearchResults, clearSearch } from '../../actions';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from './SearchResults';


function Search({ id, results, search, handleClear, handleAddVideo, withToast }) {
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
				addVideo={handleAddVideo(withToast)}
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
	withToast: React.PropTypes.bool,
};

Search.defaultProps = {
	search: () => null,
	handleClear: () => null,
	withToast: true,
};

const mapStateToProps = (state) => ({
	results: state.results,
});

const mapDispatchToProps = (dispatch) => ({
	search: debounce((query) => dispatch(fetchSearchResults(query)), 500),
	handleClear: () => dispatch(clearSearch()),
	handleAddVideo: (withToast) => (video) => {
		if (withToast) {
			dispatch(addVideoWithToast(video));
		} else {
			dispatch(addVideo(video));
		}
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
