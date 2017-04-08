import React from 'react';
import PropTypes from 'prop-types';
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
	className: PropTypes.string,
	children: PropTypes.node,
};

export default Toast;
