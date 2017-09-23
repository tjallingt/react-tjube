import React from 'react';
import PropTypes from 'prop-types';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTransition from 'react-transition-group/CSSTransition';

import Toast from './Toast';

function Toaster({ id, className, toasts }) {
	return (
		<div id={id} className={className}>
			<TransitionGroup>
				{toasts.map(toast => (
					<CSSTransition
						key={toast.key}
						timeout={500}
						classNames="fade"
					>
						<Toast>
							{toast.message}
						</Toast>
					</CSSTransition>
				))}
			</TransitionGroup>
		</div>
	);
}

Toaster.propTypes = {
	toasts: PropTypes.array,
	id: PropTypes.string,
	className: PropTypes.string,
};

Toaster.defaultProps = {
	toasts: [],
};

export default Toaster;
