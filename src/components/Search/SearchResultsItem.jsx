import React from 'react';
 
export default class SearchResultsItem extends React.Component {
	static propTypes = {
		style: React.PropTypes.object,
		videoId: React.PropTypes.string,
		title: React.PropTypes.string,
		channelTitle: React.PropTypes.string,
		thumbnails: React.PropTypes.object,
		onClick: React.PropTypes.func
	};

	static defaultProps = {
		style: {},
		videoId: "",
		title: "",
		channelTitle: "",
		thumbnails: {default: ""},
		onClick: () => {}
	};

	constructor( props ) {
		super( props );
	}

	handleClick() {
		this.props.onClick({
			id: this.props.videoId,
			title: this.props.title,
			thumbnails: this.props.thumbnails
		});
	}

	render() {
		const styles = {
			item: {
				textOverflow: "ellipsis",
				whiteSpace: "nowrap",
				overflow: "hidden"
			}
		};

		Object.assign( styles.item, this.props.style );

		return (
			<li style={styles.item} onClick={::this.handleClick}>
				{this.props.title}<br />
				by {this.props.channelTitle}
			</li>
		);
	}
}