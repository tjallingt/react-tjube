import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Dialog from '../Dialog/Dialog';
import VideoCard from '../VideoCard/VideoCard';

import config from '../../Config';

function Dialogs({ className, video, socket, sendVideo, deleteVideo }) {
	let dialog;
	if (video) {
		dialog = (
			<Dialog
				className={className}
				key={video.id}
				onConfirm={() => sendVideo(video)}
				onClose={deleteVideo}
			>
				<h3>Do you want to add this video to the playlist?</h3>
				<VideoCard
					video={video}
					thumbnailQuality="medium"
				/>
			</Dialog>
		);
	}
	if (!socket.connected) {
		let message;
		if (socket.reconnect.failed) {
			message = 'Reconnecting failed, please reload the page to connect again.';
		} else {
			message = 'Trying to reconnect, please wait or reload the page.';
			message += ` Attempt ${socket.reconnect.attempt} of ${config.reconnectionAttempts}`;
		}
		dialog = (
			<Dialog
				className={className}
				key="disconnected"
				onClose={() => location.reload()}
			>
				<h3>You are disconnected, do you want to reload the page?</h3>
				{message}
			</Dialog>
		);
	}
	return (
		<ReactCSSTransitionGroup
			transitionName="dialogs"
			transitionEnterTimeout={250}
			transitionLeaveTimeout={250}
		>
			{dialog}
		</ReactCSSTransitionGroup>
	);
}

Dialogs.propTypes = {
	className: React.PropTypes.string,
	video: React.PropTypes.object,
	socket: React.PropTypes.object,
	sendVideo: React.PropTypes.func,
	deleteVideo: React.PropTypes.func,
};

export default Dialogs;
