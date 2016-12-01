import React from 'react';
import classNames from 'classnames';

import styles from './Spinner.css';

function SearchResults({ className, show }) {
	if (!show) return null;
	return (
		<div className={classNames(styles.spinner, className)}>
			<span />
			<span />
			<span />
		</div>
	);
}

SearchResults.propTypes = {
	className: React.PropTypes.string,
	show: React.PropTypes.bool,
};

export default SearchResults;
