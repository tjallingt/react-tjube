import React from 'react';
import classNames from 'classnames';

import styles from './Toast.css';

function Toast({ className, children }) {
	return (
		<div className={classNames(styles.toast, className)}>
			{children}
		</div>
	);
}

Toast.propTypes = {
	className: React.PropTypes.string,
	children: React.PropTypes.node,
};

export default Toast;
