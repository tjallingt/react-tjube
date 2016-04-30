import React from 'react';
import 'whatwg-fetch'; // fetch API polyfill

import { serialize, checkStatus, parseJSON } from '../../utils/fetchUtils';
import filterYoutubeData from '../../utils/FilterYoutubeData';

import SearchBar from './SearchBar';
import VideoList from '../VideoList/VideoList';

export default class Search extends React.Component {
	static propTypes = {
		id: React.PropTypes.string,
		youtubeApiKey: React.PropTypes.string.isRequired,
		onClickVideo: React.PropTypes.func,
	};

	static defaultProps = {
		onClickVideo: () => null,
	};

	constructor(props) {
		super(props);
		this.searchTimeout = null;
		this.youtubeApiUrl = 'https://www.googleapis.com/youtube/v3/search';
	}

	state = {
		searchText: '',
		searchResults: [],
	};

	handleChange = (value) => {
		clearTimeout(this.searchTimeout);

		this.setState({
			searchText: value,
		});

		if (value.length === 0) {
			this.setState({
				searchResults: [],
			});
		} else if (value.length > 2) {
			this.searchTimeout = setTimeout(this.search, 500);
		}
	};

	handleEnter = () => {
		clearTimeout(this.searchTimeout);
		this.search();
	};

	search = () => {
		const parameters = serialize({
			videoEmbeddable: true,
			part: 'snippet',
			type: 'video',
			maxResults: 20,
			key: this.props.youtubeApiKey,
			q: this.state.searchText,
		});

		fetch(`${this.youtubeApiUrl}?${parameters}`)
			.then(checkStatus)
			.then(parseJSON)
			.then((json) => {
				const videos = json.items.map((item) => filterYoutubeData(item));
				this.setState({
					searchResults: videos,
				});
			})
			.catch((error) => {
				console.log('request failed', error);
			});
	};

	render() {
		return (
			<div id={this.props.id}>
				<SearchBar
					id="search-bar"
					onChange={this.handleChange}
					onEnter={this.handleEnter}
					searchText={this.state.searchText}
				/>

				<VideoList
					id="search-results"
					onClickVideo={this.props.onClickVideo}
					list={this.state.searchResults}
				/>
			</div>
		);
	}
}
