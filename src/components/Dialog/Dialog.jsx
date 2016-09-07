import React from 'react';
import classNames from 'classnames';

import styles from './Dialog.css';

function Dialog({ className, onConfirm, onClose, children }) {
	let close = <button onClick={onClose} className={styles.button}>OK</button>;
	let confirm;
	if (onConfirm) {
		close = <button onClick={onClose} className={styles.button}>Cancel</button>;
		confirm = <button onClick={onConfirm} className={styles.button}>OK</button>;
	}

	return (
		<div>
			<div className={styles.backdrop}></div>
			<div className={classNames(styles.dialog, className)}>
				<div>
					{children}
				</div>
				<div className={styles.options}>
					{close}
					{confirm}
				</div>
			</div>
		</div>
	);
}

Dialog.propTypes = {
	className: React.PropTypes.string,
	onConfirm: React.PropTypes.func,
	onClose: React.PropTypes.func.isRequired,
	children: React.PropTypes.node.isRequired,
};

export default Dialog;
