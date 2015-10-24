import React from 'react';
 
export default class VideoListItem extends React.Component {
	static propTypes = {
		style: React.PropTypes.object,
		video: React.PropTypes.object,
		onClick: React.PropTypes.func
	};

	static defaultProps = {
		style: {},
		videoId: {},
		onClick: () => {}
	};

	constructor( props ) {
		super( props );
	}

	handleClick() {
		this.props.onClick( this.props.video );
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
				{this.props.video.snippet.title}<br />
				by {this.props.video.snippet.channelTitle}
			</li>
		);
	}
}