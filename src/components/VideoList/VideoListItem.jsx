import React from 'react';

export default class VideoListItem extends React.Component {
	static propTypes = {
		style: React.PropTypes.object,
		video: React.PropTypes.object,
		showThumbnail: React.PropTypes.bool,
		thumbnailQuality: React.PropTypes.string,
		onClickVideo: React.PropTypes.func,
		children: React.PropTypes.node,
	};

	static defaultProps = {
		videoId: {},
		showThumbnail: true,
		thumbnailQuality: 'medium',
		onClickVideo: () => {},
	};

	constructor(props) {
		super(props);
	}

	handleClickVideo() {
		this.props.onClickVideo(this.props.video);
	}

	infectClick(element) {
		if (element.props.onClick) {
			return React.cloneElement(element, {onClick: () => element.props.onClick(this.props.video)});
		}
		return element;
	}

	render() {
		const styles = {
			item: {
				textOverflow: 'ellipsis',
				whiteSpace: 'nowrap',
				overflow: 'hidden',
			},
		};

		if (this.props.showThumbnail === true) {
			Object.assign(styles.item, {
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center',
				backgroundSize: 'cover',
				backgroundImage: `url( ${this.props.video.thumbnails[this.props.thumbnailQuality].url} )`,
			});
		}

		Object.assign(styles.item, this.props.style);

		const children = React.Children.map(this.props.children, ::this.infectClick);

		return (
			<li className="video-list-item" style={styles.item} onClick={::this.handleClickVideo}>
				{this.props.video.title}<br />
				by {this.props.video.channelTitle}
				{children}
			</li>
		);
	}
}
