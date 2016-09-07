/* global room */
import React from 'react';
import classNames from 'classnames';

import styles from './Headline.css';

function Headline({ className, canSkip, title, subtitle, onSkip }) {
	const subtitleStyle = classNames(styles.subtitle, {
		[styles.skipVideo]: canSkip,
	});

	return (
		<div className={classNames(styles.headline, className)}>
			<h1 className={styles.title}>
				{title}
			</h1>

			<h2
				className={subtitleStyle}
				onClick={(canSkip) ? onSkip : undefined}
			>
				{subtitle}
			</h2>
		</div>
	);
}

Headline.propTypes = {
	className: React.PropTypes.string,
	title: React.PropTypes.string,
	subtitle: React.PropTypes.string,
	onSkip: React.PropTypes.func,
	canSkip: React.PropTypes.bool,
};

Headline.defaultProps = {
	skipVideo: () => null,
	subtitle: `Add videos remotely at ${location.host}/${room}`,
	title: 'Add videos to the playlist to begin watching!',
};

export default Headline;
