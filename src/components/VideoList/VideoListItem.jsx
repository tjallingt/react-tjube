import React from 'react';

export default class VideoListItem extends React.Component {
	static propTypes = {
		style: React.PropTypes.object,
		index: React.PropTypes.number.isRequired,
		video: React.PropTypes.object.isRequired,
		thumbnailQuality: React.PropTypes.string,
		onClickVideo: React.PropTypes.func,
		children: React.PropTypes.node,
	};

	static defaultProps = {
		onClickVideo: () => null,
	};

	handleClickVideo = (event) => {
		this.props.onClickVideo({ ...this.props.video }, this.props.index, event);
	};

	cloneButton = (element) => {
		if (element.props.onClick) {
			return React.cloneElement(element, {
				style: {
					cursor: 'pointer',
					marginRight: '10px',
				},
				onClick: (event) => element.props.onClick({ ...this.props.video }, this.props.index, event),
			});
		}
		return element;
	};

	render() {
		const styles = {
			item: {
				position: 'relative',
				textOverflow: 'ellipsis',
				whiteSpace: 'nowrap',
				overflow: 'hidden',
			},
			buttonWrapper: {
				position: 'absolute',
			},
		};

		if (this.props.thumbnailQuality) {
			Object.assign(styles.item, {
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center',
				backgroundSize: 'cover',
				backgroundImage: `url( ${this.props.video.thumbnails[this.props.thumbnailQuality].url} )`,
			});
		}

		Object.assign(styles.item, this.props.style);

		let children;
		if (React.Children.count(this.props.children) > 0) {
			children = (
				<div
					className="button-wrapper"
					style={styles.buttonWrapper}
				>
					{React.Children.map(this.props.children, this.cloneButton)}
				</div>
			);
		}

		return (
			<li
				className="video-list-item"
				style={styles.item}
				onClick={this.handleClickVideo}
			>
				{this.props.video.title}<br />
				by {this.props.video.channelTitle}
				{children}
			</li>
		);
	}
}
