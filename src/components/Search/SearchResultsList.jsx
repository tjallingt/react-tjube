import React from 'react';
import SearchResultsItem from './SearchResultsItem';
 
export default class SearchResultsList extends React.Component {
	static propTypes = {
		searchResults: React.PropTypes.array.isRequired,
		onClick: React.PropTypes.func
	};

	static defaultProps = {
		onClick: () => {}
	};

	constructor( props ) {
		super( props );
	}

	render() {
		let list = [];
		const styles = {
			list: {
				listStyleType: "none"
			}
		};

		this.props.searchResults.forEach( ( item ) => {
			list.push(
				<SearchResultsItem 
					key={item.id.videoId}
					videoId={item.id.videoId}
					title={item.snippet.title}
					channelTitle={item.snippet.channelTitle}
					thumbnails={item.snippet.thumbnails}
					onClick={this.props.onClick}
				/> 
			);
		});

		return(
			<ul style={styles.list}>
				{list}
			</ul>
		);
	}
}

