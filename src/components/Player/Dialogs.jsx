import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Dialog from '../Dialog/Dialog';

import config from '../../Config';

function Dialogs({ className, socket }) {
	let dialog;
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
				<p>Your playlist will remain available if you choose to reload.</p>
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
	socket: React.PropTypes.object,
};

export default Dialogs;
