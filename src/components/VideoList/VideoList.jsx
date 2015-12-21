import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import VideoListItem from './VideoListItem';

export default class VideoList extends React.Component {
	static propTypes = {
		id: React.PropTypes.string,
		style: React.PropTypes.object,
		list: React.PropTypes.array.isRequired,
		onClickVideo: React.PropTypes.func,
		thumbnailQuality: React.PropTypes.string,
		animate: React.PropTypes.bool,
		children: React.PropTypes.node,
	};

	static defaultProps = {
		onClickVideo: () => {},
		animate: false,
	};

	constructor(props) {
		super(props);
	}

	render() {
		const styles = {
			list: {
				listStyleType: 'none',
			},
		};

		Object.assign(styles.list, this.props.style);

		let list = this.props.list.map((video, index) => {
			return (
				<VideoListItem
					key={video.key}
					index={index}
					video={video}
					onClickVideo={this.props.onClickVideo}
					showThumbnail={this.props.showThumbnails}
					thumbnailQuality={this.props.thumbnailQuality}
				>
					{this.props.children}
				</VideoListItem>
			);
		});

		if (this.props.animate) {
			list = <ReactCSSTransitionGroup
					transitionName="fade"
					transitionAppear={true}
					transitionAppearTimeout={500}
					transitionEnterTimeout={500}
					transitionLeaveTimeout={500}
					>
						{list}
					</ReactCSSTransitionGroup>;
		}

		return (
			<ul id={this.props.id} style={styles.list}>
				{list}
			</ul>
		);
	}
}
