import React from 'react';

import config from '../../Config';
import Http from '../../Http';
import filterYoutubeData from '../../FilterYoutubeData';

import SearchBar from './SearchBar';
import VideoList from '../VideoList/VideoList';

export default class Search extends React.Component {
	static propTypes = {
		id: React.PropTypes.string,
		onClickVideo: React.PropTypes.func,
	};

	static defaultProps = {
		onClickVideo: () => null,
	};

	constructor(props) {
		super(props);
		this.searchTimeout = null;
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
		new Http(`${config.youtubeApi.url}/search`)
			.get({
				videoEmbeddable: true,
				part: 'snippet',
				type: 'video',
				maxResults: 20,
				key: config.youtubeApi.key,
				q: this.state.searchText,
			})
			.then((response) => {
				const json = JSON.parse(response);
				const videos = json.items.map((item) => filterYoutubeData(item));
				this.setState({
					searchResults: videos,
				});
			})
			.catch((response) => {
				console.log(response);
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
