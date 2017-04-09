import React from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import Dialog from '../Dialog/Dialog';
import Tutorial from './Tutorial';

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

function Dialogs({ className, socket, tutorial, nextTutorial, endTutorial }) {
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
				<p>No need to worry; your playlist will be here when you return.</p>
				{message}
			</Dialog>
		);
	}
	if (tutorial) {
		return wrapDialog(
			<Tutorial
				className={className}
				step={tutorial}
				next={nextTutorial}
				end={endTutorial}
			/>
		);
	}
	return wrapDialog();
}

Dialogs.propTypes = {
	className: PropTypes.string,
	socket: PropTypes.object,
	tutorial: PropTypes.number,
	nextTutorial: PropTypes.func,
	endTutorial: PropTypes.func,
};

export default Dialogs;
