import React from 'react';
import VideoListItem from './VideoListItem';

export default class VideoList extends React.Component {
	static propTypes = {
		id: React.PropTypes.string,
		style: React.PropTypes.object,
		list: React.PropTypes.array.isRequired,
		onClickVideo: React.PropTypes.func,
		showThumbnails: React.PropTypes.bool,
		thumbnailQuality: React.PropTypes.string,
		children: React.PropTypes.node,
	};

	static defaultProps = {
		onClickVideo: () => {},
	};

	constructor(props) {
		super(props);
	}

	render() {
		const list = [];
		const styles = {
			list: {
				listStyleType: 'none',
			},
		};

		Object.assign(styles.list, this.props.style);

		this.props.list.forEach((item, index) => {
			list.push(
				<VideoListItem
					key={item.id}
					index={index}
					video={item}
					onClickVideo={this.props.onClickVideo}
					showThumbnail={this.props.showThumbnails}
					thumbnailQuality={this.props.thumbnailQuality}>
					{this.props.children}
				</VideoListItem>
			);
		});

		return (
			<ul id={this.props.id} style={styles.list}>
				{list}
			</ul>
		);
	}
}
