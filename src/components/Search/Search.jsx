/* global $ */
import React from 'react';

import config from '../../Config.js';
import filterYoutubeData from '../../FilterYoutubeData.js';

import SearchBar from './SearchBar';
import VideoList from '../VideoList/VideoList';

export default class Search extends React.Component {
	static propTypes = {
		id: React.PropTypes.string,
		onClickVideo: React.PropTypes.func,
	};

	static defaultProps = {
		onClickVideo: () => {},
	};

	constructor(props) {
		super(props);
		this.searchTimeout = null;
	}

	state = {
		searchText: '',
		searchResults: [],
	};

	handleChange(value) {
		clearTimeout(this.searchTimeout);

		this.setState({
			searchText: value,
		});

		if (value.length === 0) {
			this.setState({
				searchResults: [],
			});
		} else if (value.length > 2) {
			this.searchTimeout = setTimeout(::this.search, 500);
		}
	}

	handleEnter() {
		clearTimeout(this.searchTimeout);
		this.search();
	}

	search() {
		$.getJSON(config.youtubeApi.url + 'search?videoEmbeddable=true&part=snippet&type=video&maxResults=20&key=' + config.youtubeApi.key + '&q=' + this.state.searchText, (json) => {
			const videos = json.items.map((item) => {
				return filterYoutubeData(item);
			});
			this.setState({
				searchResults: videos,
			});
		});
	}

	render() {
		return (
			<div id={this.props.id}>
				<SearchBar id="search-bar" onChange={::this.handleChange} onEnter={::this.handleEnter} searchText={this.state.searchText} />
				<VideoList id="search-results" onClickVideo={this.props.onClickVideo} list={this.state.searchResults} showThumbnails={false}/>
			</div>
		);
	}
}
