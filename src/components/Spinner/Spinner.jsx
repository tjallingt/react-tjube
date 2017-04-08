import React from 'react';
import PropTypes from 'prop-types';
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
	className: PropTypes.string,
	show: PropTypes.bool,
};

export default SearchResults;
