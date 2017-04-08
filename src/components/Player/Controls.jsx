import React from 'react';
import classNames from 'classnames';

import styles from './Controls.css';

function Controls({ id, className, fill, startTutorial, toggleFill }) {
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
				onClick={startTutorial}
			/>

			<a href="https://github.com/tjallingt/react-tjube">
				<i className="fa fa-github" />
			</a>
		</div>
	);
}

Controls.propTypes = {
	id: React.PropTypes.string,
	className: React.PropTypes.string,
	fill: React.PropTypes.bool,
	startTutorial: React.PropTypes.func,
	toggleFill: React.PropTypes.func,
};

export default Controls;
