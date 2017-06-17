import React from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import Dialog from '../Dialog/Dialog';
import VideoCard from '../VideoCard/VideoCard';

import config from '../../Config';

const wrapDialog = dialog => (
	<ReactCSSTransitionGroup
		transitionName="dialogs"
		transitionEnterTimeout={250}
		transitionLeaveTimeout={250}
	>
		{dialog}
	</ReactCSSTransitionGroup>
);

function Dialogs({ className, video, socket, sendVideo, deleteVideo }) {
	if (!socket.connected) {
		let message;
		if (socket.reconnect.failed) {
			message = 'Reconnecting failed. Please reload the page to connect again.';
		} else {
			message = 'Attempting to reconnect. Please wait or reload the page.';
			message += ` Attempt ${socket.reconnect.attempt} of ${config.reconnectionAttempts}`;
		}
		return wrapDialog(
			<Dialog
				className={className}
				key="disconnected"
				onClose={() => location.reload()}
				confirmText="reload"
			>
				<h3>You have been disconnected</h3>
				{message}
			</Dialog>
		);
	}
	if (video) {
		return wrapDialog(
			<Dialog
				className={className}
				key={video.id}
				onConfirm={() => sendVideo(video)}
				onClose={deleteVideo}
				confirmText="add video"
			>
				<h3>Do you want to add this video to the playlist?</h3>
				<VideoCard
					video={video}
					showThumbnail
				/>
			</Dialog>
		);
	}
	return wrapDialog();
}

Dialogs.propTypes = {
	className: PropTypes.string,
	video: PropTypes.object,
	socket: PropTypes.object,
	sendVideo: PropTypes.func,
	deleteVideo: PropTypes.func,
};

export default Dialogs;
