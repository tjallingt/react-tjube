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

	constructor(props) {
		super(props);
	}

	handleClickVideo() {
		this.props.onClickVideo(this.props.video);
	}

	handleClickDelete() {
		this.props.onClickDelete(this.props.video);
	}

	render() {
		let deleteButton;
		if (this.props.onClickDelete) {
			deleteButton = <div className="delete-button" onClick={::this.handleClickDelete}><i className="fa fa-times"></i></div>;
		}

		const styles = {
			item: {
				textOverflow: "ellipsis",
				whiteSpace: "nowrap",
				overflow: "hidden"
			}
		};

		if (this.props.showThumbnail === true) {
			Object.assign(styles.item, {
				"backgroundRepeat": "no-repeat",
				"backgroundPosition": "center",
				"backgroundSize": "cover",
				"backgroundImage": `url( ${this.props.video.thumbnails[this.props.thumbnailQuality].url} )`
			});
		}

		Object.assign(styles.item, this.props.style);

		return (
			<li className='video-list-item' style={styles.item} onClick={::this.handleClickVideo}>
				{this.props.video.title}<br />
				by {this.props.video.channelTitle}
				{deleteButton}
			</li>
		);
	}
}