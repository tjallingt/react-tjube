import React from 'react';
import PropTypes from 'prop-types';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTransition from 'react-transition-group/CSSTransition';

import Dialog from '../Dialog/Dialog';
import Tour from './Tour';

// TODO: all this dialog logic is pretty creaky, needs to be cleaned up
function PlayerDialogs({ className, socket, tour, nextTour, endTour, ...props }) {
	if (!socket.connected) {
		let message;
		if (socket.reconnect.failed) {
			message = 'Reconnecting failed. Please reload the page to connect again.';
		} else {
			message = 'Attempting to reconnect. Please wait or reload the page.';
			message += ` Attempt ${socket.reconnect.attempt} of ${process.env.RECONNECT_ATTEMPTS}`;
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
					onClose={() => window.location.reload()}
					confirmText="reload"
				>
					<h3>You have been disconnected</h3>
					<p>No need to worry; your playlist will be here when you return.</p>
					{message}
				</Dialog>
			</CSSTransition>
		);
	}
	if (tour) {
		return (
			<CSSTransition
				key={`tour-${tour}`}
				timeout={250}
				classNames="fade"
				{...props}
			>
				<Tour
					className={className}
					step={tour}
					next={nextTour}
					end={endTour}
				/>
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
			{ PlayerDialogs(props) }
		</TransitionGroup>
	);
}

PlayerDialogs.propTypes = {
	className: PropTypes.string,
	socket: PropTypes.object,
	tour: PropTypes.number,
	nextTour: PropTypes.func,
	endTour: PropTypes.func,
};

export default Dialogs;
