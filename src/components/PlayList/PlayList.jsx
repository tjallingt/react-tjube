import React from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import PlayListItem from './PlayListItem';

@DragDropContext(HTML5Backend)
class PlayList extends React.Component { // eslint-disable-line react/prefer-stateless-function
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
	id: PropTypes.string,
	className: PropTypes.string,
	playlist: PropTypes.array.isRequired,
	moveVideo: PropTypes.func,
	deleteVideo: PropTypes.func,
};

PlayList.defaultProps = {
	playlist: [],
	moveVideo: () => null,
	deleteVideo: () => null,
};

export default PlayList;
