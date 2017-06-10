import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Controls.css';

function Controls({ id, className, fill, startTour, toggleFill }) {
	const toggleFillStyle = classNames(styles.button, 'fa', {
		'fa-compress': fill,
		'fa-expand': !fill,
	});

	return (
		<div id={id} className={classNames(styles.controls, className)}>
			<i
				className={toggleFillStyle}
				onClick={toggleFill}
			/>

			<a href={`/remote/${window.room}`}>
				{window.room}
			</a>

			<i
				className={`fa fa-question-circle ${styles.button} ${styles.shake}`}
				onClick={startTour}
			/>

			<a href="https://github.com/tjallingt/react-tjube">
				<i className="fa fa-github" />
			</a>
		</div>
	);
}

Controls.propTypes = {
	id: PropTypes.string,
	className: PropTypes.string,
	fill: PropTypes.bool,
	startTour: PropTypes.func,
	toggleFill: PropTypes.func,
};

export default Controls;
