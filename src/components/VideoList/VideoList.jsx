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
		transitionName: React.PropTypes.string,
		children: React.PropTypes.node,
	};

	static defaultProps = {
		onClickVideo: () => null,
	};

	render() {
		const styles = {
			list: {
				listStyleType: 'none',
			},
		};

		Object.assign(styles.list, this.props.style);

		let list = this.props.list.map((video, index) => (
			<VideoListItem
				key={video.key}
				index={index}
				video={video}
				onClickVideo={this.props.onClickVideo}
				thumbnailQuality={this.props.thumbnailQuality}
			>
				{this.props.children}
			</VideoListItem>
		));

		if (this.props.transitionName) {
			list = (
				<ReactCSSTransitionGroup
					transitionName={this.props.transitionName}
					transitionAppear
					transitionAppearTimeout={500}
					transitionEnterTimeout={500}
					transitionLeaveTimeout={500}
				>
					{list}
				</ReactCSSTransitionGroup>
			);
		}

		return (
			<ul
				id={this.props.id}
				style={styles.list}
			>
				{list}
			</ul>
		);
	}
}
