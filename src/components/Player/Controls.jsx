/* global room */
import React from 'react';
import classNames from 'classnames';

import styles from './Controls.css';

function Controls({ className, fill, toggleFill }) {
	const toggleFillStyle = classNames(styles.toggleFill, 'fa', {
		'fa-compress': fill,
		'fa-expand': !fill,
	});

	return (
		<div className={classNames(styles.controls, className)}>
			<i
				className={toggleFillStyle}
				onClick={toggleFill}
			/>

			<a href={`/remote/${room}`}>
				{room}
			</a>

			<a href="/about">
				<i className="fa fa-question-circle" />
			</a>

			<a href="https://github.com/tjallingt/react-tjube">
				<i className="fa fa-github" />
			</a>
		</div>
	);
}

Controls.propTypes = {
	className: React.PropTypes.string,
	fill: React.PropTypes.bool,
	toggleFill: React.PropTypes.func,
};

export default Controls;
