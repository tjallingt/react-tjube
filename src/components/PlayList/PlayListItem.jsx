/* eslint new-cap: "off", react/prefer-stateless-function: "off" */
import React from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';

const videoSource = {
	canDrag: (props) => props.index !== 0,
	beginDrag: (props) => ({ index: props.index }),
};

const videoTarget = {
	hover: (props, monitor, component) => {
		const dragIndex = monitor.getItem().index;
		const hoverIndex = props.index;

		// Don't replace items with themselves
		if (dragIndex === hoverIndex) {
			return;
		}
		// Don't replace currently playing video
		if (hoverIndex === 0) {
			return;
		}

		const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
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
		monitor.getItem().index = hoverIndex;
	},
};

@DropTarget('play-list-item', videoTarget, connect => ({
	connectDropTarget: connect.dropTarget(),
}))
@DragSource('play-list-item', videoSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging(),
}))
class PlayListItem extends React.Component {
	render() {
		const {
			video,
			index,
			onDelete,
			connectDragSource,
			connectDropTarget,
			isDragging,
		} = this.props;
		const styles = {
			item: {
				position: 'relative',
				backgroundColor: 'hsl(0, 0%, 90%)',
				backgroundImage: `url( ${video.thumbnails.medium.url} )`,
				backgroundBlendMode: 'multiply',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center',
				backgroundSize: 'cover',
				opacity: isDragging ? 0.5 : null,
			},
			text: {
				overflow: 'hidden',
				whiteSpace: 'nowrap',
				textOverflow: 'ellipsis',
				padding: '0px 30px',
			},
			buttonWrapper: {
				position: 'absolute',
				top: 15,
				left: 0,
				right: 0,
			},
			icon: {
				position: 'absolute',
				left: 10,
				cursor: index !== 0 ? 'move' : null,
			},
			deleteButton: {
				position: 'absolute',
				right: 10,
				cursor: 'pointer',
			},
		};

		return connectDragSource(connectDropTarget(
			<div
				className="play-list-item"
				style={styles.item}
			>
				<div style={styles.text}>{video.title}</div>
				<small style={styles.text}>{video.channelTitle}</small>
				<div
					style={styles.buttonWrapper}
				>
					<span
						style={styles.icon}
					>
						<i className={index === 0 ? 'fa fa-play' : 'fa fa-bars'} />
					</span>
					<span
						style={styles.deleteButton}
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
	video: React.PropTypes.object.isRequired,
	index: React.PropTypes.number,
	onDelete: React.PropTypes.func,
	moveVideo: React.PropTypes.func,
	connectDragSource: React.PropTypes.func,
	connectDropTarget: React.PropTypes.func,
	isDragging: React.PropTypes.bool,
};

export default PlayListItem;
