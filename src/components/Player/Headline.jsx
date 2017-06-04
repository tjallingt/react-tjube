import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Headline.css';

function Headline({ id, className, canSkip, title, subtitle, onSkip }) {
	const subtitleStyle = classNames(styles.subtitle, {
		[styles.skipVideo]: canSkip,
	});

	return (
		<div id={id} className={classNames(styles.headline, className)}>
			<h1 className={styles.title}>
				{title}
			</h1>

			<h2
				className={subtitleStyle}
			>
				<a onClick={(canSkip) ? onSkip : undefined}>
					{subtitle}
				</a>
			</h2>
		</div>
	);
}

Headline.propTypes = {
	id: PropTypes.string,
	className: PropTypes.string,
	title: PropTypes.string,
	subtitle: PropTypes.string,
	onSkip: PropTypes.func,
	canSkip: PropTypes.bool,
};

Headline.defaultProps = {
	skipVideo: () => null,
	subtitle: `Add videos remotely at ${location.host}/${window.room}`,
	title: 'Add videos to the playlist to begin watching!',
};

export default Headline;
