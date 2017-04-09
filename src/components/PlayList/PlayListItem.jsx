import React from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import classNames from 'classnames';
import styles from './PlayListItem.css';

const videoSource = {
	canDrag: props => props.index !== 0,
	beginDrag: props => ({ index: props.index }),
};

const videoTarget = {
	hover: (props, monitor, component) => {
		const dragIndex = monitor.getItem().index;
		const hoverIndex = props.index;

		// Don't replace items with themselves and don't replace currently playing video
		if (dragIndex === hoverIndex || hoverIndex === 0) {
			return;
		}

		// avoid findDOMNode(component) by accessing the decorated components ref
		const hoverBoundingRect = component.decoratedComponentInstance.ref.getBoundingClientRect();
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

		const clientOffset = monitor.getClientOffset();
		const hoverClientY = clientOffset.y - hoverBoundingRect.top;

		// Only perform the move when the mouse has crossed half of the items height
		// When dragging downwards, only move when the cursor is below 50%
		// When dragging upwards, only move when the cursor is above 50%

		// Dragging downwards
		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			return;
		}

		// Dragging upwards
		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			return;
		}

		// Time to actually perform the action
		props.moveVideo(dragIndex, hoverIndex);

		// Note: we're mutating the monitor item here!
		// Generally it's better to avoid mutations,
		// but it's good here for the sake of performance
		// to avoid expensive index searches.
		monitor.getItem().index = hoverIndex; // eslint-disable-line no-param-reassign
	},
};

@DropTarget('play-list-item', videoTarget, connect => ({
	connectDropTarget: connect.dropTarget(),
}))
@DragSource('play-list-item', videoSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging(),
}))
class PlayListItem extends React.Component { // eslint-disable-line react/prefer-stateless-function
	render() {
		const {
			video,
			index,
			onDelete,
			connectDragSource,
			connectDropTarget,
			isDragging,
		} = this.props;

		const itemStyle = classNames('play-list-item', styles.item, {
			[styles.isDragging]: isDragging,
		});

		const iconStyle = classNames(styles.icon, {
			[styles.canMove]: index !== 0,
		});

		return connectDragSource(connectDropTarget(
			<div
				ref={(item) => { this.ref = item; }}
				className={itemStyle}
				style={{ backgroundImage: `url( ${video.thumbnails.medium.url} )` }}
			>
				<div className={styles.title}>{video.title}</div>
				<div className={styles.channelTitle}>{video.channelTitle}</div>
				<div
					className={styles.buttonWrapper}
				>
					<span
						className={iconStyle}
					>
						<i className={index === 0 ? 'fa fa-play' : 'fa fa-bars'} />
					</span>
					<span
						className={styles.button}
						onClick={onDelete}
					>
						<i className={index === 0 ? 'fa fa-step-forward' : 'fa fa-times'} />
					</span>
				</div>
			</div>
		));
	}
}

PlayListItem.propTypes = {
	video: PropTypes.object.isRequired,
	index: PropTypes.number,
	onDelete: PropTypes.func,
	moveVideo: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
	connectDragSource: PropTypes.func,
	connectDropTarget: PropTypes.func,
	isDragging: PropTypes.bool,
};

export default PlayListItem;
