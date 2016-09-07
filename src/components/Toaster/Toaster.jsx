import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Toast from './Toast';

function Toaster({ id, className, toasts }) {
	return (
		<div id={id} className={className}>
			<ReactCSSTransitionGroup
				transitionName="toaster"
				transitionEnterTimeout={500}
				transitionLeaveTimeout={500}
			>
				{toasts.map((toast) => (
					<Toast key={toast.key}>
						{toast.message}
					</Toast>
				))}
			</ReactCSSTransitionGroup>
		</div>
	);
}

Toaster.propTypes = {
	toasts: React.PropTypes.array,
	id: React.PropTypes.string,
	className: React.PropTypes.string,
};

Toaster.defaultProps = {
	toasts: [],
};

export default Toaster;
