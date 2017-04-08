import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Dialog.css';

function Dialog({ className, closeText, confirmText, onConfirm, onClose, children }) {
	let close = <button onClick={onClose} className={styles.confirm}>{confirmText}</button>;
	let confirm;
	if (onConfirm) {
		close = <button onClick={onClose} className={styles.close}>{closeText}</button>;
		confirm = <button onClick={onConfirm} className={styles.confirm}>{confirmText}</button>;
	}

	return (
		<div>
			<div className={styles.backdrop} />
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
	className: PropTypes.string,
	confirmText: PropTypes.string,
	closeText: PropTypes.string,
	onConfirm: PropTypes.func,
	onClose: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired,
};

Dialog.defaultProps = {
	confirmText: 'ok',
	closeText: 'cancel',
};

export default Dialog;
