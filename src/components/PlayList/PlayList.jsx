import React from 'react';
import PropTypes from 'prop-types';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTransition from 'react-transition-group/CSSTransition';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import PlayListItem from './PlayListItem';

@DragDropContext(HTML5Backend)
class PlayList extends React.Component { // eslint-disable-line react/prefer-stateless-function
	render() {
		const { id, className, playlist, ...props } = this.props;

		return (
			<div id={id} className={className}>
				<TransitionGroup>
					{playlist.map((video, index) => (
						<CSSTransition
							key={video.key}
							classNames="playlist"
							timeout={500}
							appear
						>
							<PlayListItem
								index={index}
								video={video}
								moveVideo={props.moveVideo}
								onDelete={() => props.deleteVideo(index)}
							/>
						</CSSTransition>
					))}
				</TransitionGroup>
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
