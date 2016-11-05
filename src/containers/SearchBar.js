import { connect } from 'react-redux';
import { fetchSearchResults, clearSearch } from '../actions';

import SearchBar from '../components/SearchBar/SearchBar';

const mapDispatchToProps = dispatch => ({
	onSearch: query => dispatch(fetchSearchResults(query)),
	onClear: () => dispatch(clearSearch()),
});

export default connect(null, mapDispatchToProps)(SearchBar);
