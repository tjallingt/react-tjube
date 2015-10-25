import React from 'react';
 
export default class VideoListItem extends React.Component {
	static propTypes = {
		video: React.PropTypes.object,
		onClickVideo: React.PropTypes.func
	};

	static defaultProps = {
		videoId: {},
		onClickVideo: () => {}
	};

	constructor( props ) {
		super( props );
	}

	handleClick() {
		this.props.onClickVideo( this.props.video );
	}

	render() {
		const styles = {
			item: {
				textOverflow: "ellipsis",
				whiteSpace: "nowrap",
				overflow: "hidden",
				"backgroundRepeat": "no-repeat",
				"backgroundPosition": "center",
				"backgroundSize": "cover",
				"backgroundImage": `url( ${this.props.video.snippet.thumbnails.default.url} )`
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