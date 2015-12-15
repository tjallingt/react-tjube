import React from 'react';

export default class VideoListItem extends React.Component {
	static propTypes = {
		style: React.PropTypes.object,
		index: React.PropTypes.number.isRequired,
		video: React.PropTypes.object.isRequired,
		showThumbnail: React.PropTypes.bool,
		thumbnailQuality: React.PropTypes.string,
		onClickVideo: React.PropTypes.func,
		children: React.PropTypes.node,
	};

	static defaultProps = {
		showThumbnail: true,
		thumbnailQuality: 'medium',
		onClickVideo: () => {},
	};

	constructor(props) {
		super(props);
	}

	handleClickVideo(event) {
		this.props.onClickVideo({ ...this.props.video }, this.props.index, event);
	}

	infectClick(element) {
		if (element.props.onClick) {
			return React.cloneElement(element, {
				onClick: (event) => element.props.onClick({ ...this.props.video }, this.props.index, event),
			});
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
				<div className="button-wrapper">
					{children}
				</div>
			</li>
		);
	}
}
