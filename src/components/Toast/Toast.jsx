import React from 'react';
import styles from './Toast.css';

function Toast({ id, children }) {
	return (
		<div id={id} className={styles.toast}>
			{children}
		</div>
	);
}

Toast.propTypes = {
	id: React.PropTypes.string,
	children: React.PropTypes.node,
};

export default Toast;
