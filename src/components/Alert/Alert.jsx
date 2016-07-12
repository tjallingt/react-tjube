import React from 'react';
import styles from './Alert.css';

function Alert({ id, onConfirm, onClose, children }) {
	let confirm;
	let close = <button onClick={onClose} className={styles.button}>OK</button>;
	if (onConfirm) {
		confirm = <button onClick={onConfirm} className={styles.button}>OK</button>;
		close = <button onClick={onClose} className={styles.button}>Cancel</button>;
	}

	return (
		<div id={id} className={styles.alert}>
			<div>
				{children}
			</div>
			<div className={styles.options}>
				{confirm}
				{close}
			</div>
		</div>
	);
}

Alert.propTypes = {
	id: React.PropTypes.string,
	onConfirm: React.PropTypes.func,
	onClose: React.PropTypes.func,
	children: React.PropTypes.node,
};

export default Alert;
