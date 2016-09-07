/* eslint new-cap: "off", react/prefer-stateless-function: "off" */
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import PlayListItem from './PlayListItem';

@DragDropContext(HTML5Backend)
class PlayList extends React.Component {
	render() {
		const { id, className, playlist, ...props } = this.props;

		return (
			<div id={id} className={className}>
				<ReactCSSTransitionGroup
					transitionName="playlist"
					transitionAppear
					transitionAppearTimeout={500}
					transitionEnterTimeout={500}
					transitionLeaveTimeout={500}
				>
					{playlist.map((video, index) => (
						<PlayListItem
							key={video.key}
							index={index}
							video={video}
							moveVideo={props.moveVideo}
							onDelete={() => props.deleteVideo(index)}
						/>
					))}
				</ReactCSSTransitionGroup>
			</div>
		);
	}
}

PlayList.propTypes = {
	id: React.PropTypes.string,
	className: React.PropTypes.string,
	playlist: React.PropTypes.array.isRequired,
	moveVideo: React.PropTypes.func,
	deleteVideo: React.PropTypes.func,
};

PlayList.defaultProps = {
	playlist: [],
	moveVideo: () => null,
	deleteVideo: () => null,
};

export default PlayList;
