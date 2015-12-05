import React from 'react';
 
export default class VideoListItem extends React.Component {
	static propTypes = {
		video: React.PropTypes.object,
		showThumbnail: React.PropTypes.bool,
		thumbnailQuality: React.PropTypes.string,
		onClickVideo: React.PropTypes.func

	};

	static defaultProps = {
		videoId: {},
		showThumbnail: true,
		thumbnailQuality: "medium",
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
				backgroundColor: "#000"
			}
		};

		if( this.props.showThumbnail == true ) {
			Object.assign( styles.item, {
				"backgroundRepeat": "no-repeat",
				"backgroundPosition": "center",
				"backgroundSize": "cover",
				"backgroundImage": `url( ${this.props.video.snippet.thumbnails[this.props.thumbnailQuality].url} )`
			});
		}

		Object.assign( styles.item, this.props.style );

		return (
			<li className='video-list-item' style={styles.item} onClick={::this.handleClick}>
				{this.props.video.snippet.title}<br />
				by {this.props.video.snippet.channelTitle}
			</li>
		);
	}
}