import React from 'react';
import styles from './Dialog.css';

function Dialog({ id, onConfirm, onClose, children }) {
	let confirm;
	let close = <button onClick={onClose} className={styles.button}>OK</button>;
	if (onConfirm) {
		confirm = <button onClick={onConfirm} className={styles.button}>OK</button>;
		close = <button onClick={onClose} className={styles.button}>Cancel</button>;
	}

	return (
		<div id={id} className={styles.dialog}>
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

Dialog.propTypes = {
	id: React.PropTypes.string,
	onConfirm: React.PropTypes.func,
	onClose: React.PropTypes.func,
	children: React.PropTypes.node,
};

export default Dialog;
