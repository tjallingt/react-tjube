import React from 'react';
import PropTypes from 'prop-types';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTransition from 'react-transition-group/Transition';

import Dialog from '../Dialog/Dialog';
import VideoCard from '../VideoCard/VideoCard';

import config from '../../Config';

// TODO: all this dialog logic is pretty creaky, needs to be cleaned up
// TODO: use react-boostrap fade component?
function RemoteDialogs({ className, video, socket, sendVideo, deleteVideo, ...props }) {
	if (!socket.connected) {
		let message;
		if (socket.reconnect.failed) {
			message = 'Reconnecting failed. Please reload the page to connect again.';
		} else {
			message = 'Attempting to reconnect. Please wait or reload the page.';
			message += ` Attempt ${socket.reconnect.attempt} of ${config.reconnectionAttempts}`;
		}
		return (
			<CSSTransition
				key="disconnected"
				timeout={250}
				classNames="fade"
				{...props}
			>
				<Dialog
					className={className}
					onClose={() => location.reload()}
					confirmText="reload"
				>
					<h3>You have been disconnected</h3>
					{message}
				</Dialog>
			</CSSTransition>
		);
	}
	if (video) {
		return (
			<CSSTransition
				key={video.id}
				timeout={250}
				classNames="fade"
				{...props}
			>
				<Dialog
					className={className}
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
			</CSSTransition>
		);
	}
	return null;
}

function Dialogs(props) {
	// Dont render dialogs using jsx, it will break the exit animation
	// as the TransitionGroup is looking for any direct decendents that
	// of the Transition type when its children are getting removed
	// See todo above...
	return (
		<TransitionGroup>
			{ RemoteDialogs(props) }
		</TransitionGroup>
	);
}

RemoteDialogs.propTypes = {
	className: PropTypes.string,
	video: PropTypes.object,
	socket: PropTypes.object,
	sendVideo: PropTypes.func,
	deleteVideo: PropTypes.func,
};

export default Dialogs;
