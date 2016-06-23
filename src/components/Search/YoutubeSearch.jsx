import { connect } from 'react-redux';
import { setSearchResults, setSearchQuery } from '../../actions';
import 'whatwg-fetch'; // fetch API polyfill

import config from '../../Config';
import { serialize, checkStatus, parseJSON } from '../../utils/fetchUtils';
import filterYoutubeData from '../../utils/FilterYoutubeData';

import Search from './Search';

let searchTimeout;
const youtubeApiUrl = 'https://www.googleapis.com/youtube/v3/search';
const search = (query, cb) => {
	const parameters = serialize({
		videoEmbeddable: true,
		part: 'snippet',
		type: 'video',
		maxResults: 20,
		key: config.youtubeApiKey,
		q: query,
	});

	fetch(`${youtubeApiUrl}?${parameters}`)
		.then(checkStatus)
		.then(parseJSON)
		.then((json) => {
			cb(json.items.map(filterYoutubeData));
		})
		.catch((error) => {
			console.log('request failed', error);
		});
};

const mapStateToProps = (state) => ({
	query: state.search.query,
});

const mapDispatchToProps = (dispatch) => ({
	setQuery: (event) => {
		const query = event.target.value;
		dispatch(setSearchQuery(query));
		clearTimeout(searchTimeout);
		if (query.length > 3) {
			searchTimeout = setTimeout(() => {
				search(query, (results) => dispatch(setSearchResults(results)));
			}, 500);
		}
	},
	clearSearch: () => {
		dispatch(setSearchQuery(''));
		dispatch(setSearchResults([]));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
