import React from 'react';
import SearchBar from './SearchBar';
import VideoList from '../VideoList/VideoList';
 
export default class Search extends React.Component {
	static propTypes = {
		onClickVideo: React.PropTypes.func
	};

	static defaultProps = {
		onClickVideo: () => {}
	};

	state = { 
		searchText: "",
		searchResults: []
	};

	constructor( props ) {
		super( props );
		
		this.apiKey = "AIzaSyC-lsLJ5p1Iegs3xOtY1C-N5-qB6mlaKEI";
		this.apiUrl = "https://www.googleapis.com/youtube/v3/";
		this.searchTimeout = null;
	}

	handleClick( video ) {		
		this.props.onClickVideo( video, () => this.removeVideo( video ) );
	}

	removeVideo( video ) {
		this.setState({ 
			searchResults: this.state.searchResults.filter( ( item ) => item.id.videoId !== video.id.videoId )
		});
	}

	handleChange( value ) {
		clearTimeout( this.searchTimeout );

		this.setState({
			searchText: value
		});

		if( value === "" ) {
			this.setState({
				searchResults: []
			});
		}
		else if( value.length > 2 ) {
			this.searchTimeout = setTimeout( ::this.search, 300 );
		}
	}

	search() {
		$.getJSON( this.apiUrl + "search?videoEmbeddable=true&part=snippet&type=video&maxResults=20&key=" + this.apiKey + "&q=" + this.state.searchText , ( json ) => {
			this.setState({
				searchResults: json.items
			});
		});
	}
	
	render() {
		return (
			<div id={this.props.id}>
				<SearchBar id="search-bar" onChange={::this.handleChange} searchText={this.state.searchText} />
				<VideoList id="search-results" onClickVideo={::this.handleClick} list={this.state.searchResults} />
			</div>
		);
	}
}