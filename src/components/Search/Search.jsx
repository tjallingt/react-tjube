import React from 'react';
import SearchBar from './SearchBar';
import SearchResultsList from './SearchResultsList';
 
export default class Search extends React.Component {
	static propTypes = {
		style: React.PropTypes.object,
		addVideo: React.PropTypes.func
	};

	static defaultProps = {
		style: {},
		addVideo: () => {}
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
		this.setState({ 
			searchResults: this.state.searchResults.filter( ( item ) => item.id.videoId !== video.id )
		});
		this.props.addVideo( video );
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
		const styles = {
			search: {}
		};

		Object.assign( styles.search, this.props.style );

		return (
			<div style={styles.search}>
				<SearchBar onChange={::this.handleChange} searchText={this.state.searchText} />
				<SearchResultsList onClick={::this.handleClick} searchResults={this.state.searchResults} />
			</div>
		);
	}
}