import React from 'react';

function Alert({ id, onConfirm, onClose, children }) {
	const styles = {
		alert: {
			position: 'fixed',
			bottom: 0,
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-between',
			boxSizing: 'border-box',
			padding: 10,
			border: '1px solid grey',
			borderRadius: 3,
			background: 'white',
			color: 'black',
		},
		options: {
			textAlign: 'right',
			marginTop: 10,
		},
		button: {
			marginLeft: 5,
			width: 75,
			height: 30,
			background: 'white',
			border: '1px solid grey',
			borderRadius: 1,
		},
	};

	let confirm;
	let close = <button onClick={onClose} style={styles.button}>OK</button>;
	if (onConfirm) {
		confirm = <button onClick={onConfirm} style={styles.button}>OK</button>;
		close = <button onClick={onClose} style={styles.button}>Cancel</button>;
	}

	return (
		<div id={id} style={styles.alert}>
			<div style={styles.children}>
				{children}
			</div>
			<div style={styles.options}>
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
