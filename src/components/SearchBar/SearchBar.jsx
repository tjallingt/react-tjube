import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import debounce from 'lodash.debounce';

import styles from './SearchBar.css';

class SearchBar extends React.Component {
	state = {
		text: '',
	};

	componentWillMount() {
		this.handleSearch = debounce(this.handleSearch, 500);
	}

	handleChange = (event) => {
		this.props.onChange(event);
		this.setState({
			text: event.target.value,
		});
		this.handleSearch();
	};

	handleClear = () => {
		this.setState({
			text: '',
		});
		this.props.onClear();
	};

	handleSearch = () => {
		this.props.onSearch(this.state.text);
	};

	render() {
		return (
			<div id={this.props.id} className={classNames(styles.searchbar, this.props.className)}>
				<label
					htmlFor="search-input"
					className={styles.label}
				>
					<i className="fa fa-search" />
				</label>
				<input
					id="search-input"
					type="text"
					className={styles.input}
					onChange={this.handleChange}
					value={this.state.text}
					placeholder={this.props.placeholder}
				/>
				<div
					type="button"
					className={styles.button}
					onClick={this.handleClear}
				>
					<i className="fa fa-times-circle" />
				</div>
			</div>
		);
	}
}

SearchBar.propTypes = {
	id: PropTypes.string,
	className: PropTypes.string,
	onChange: PropTypes.func,
	onClear: PropTypes.func,
	onSearch: PropTypes.func,
	placeholder: PropTypes.string,
};

SearchBar.defaultProps = {
	onChange: () => null,
	onClear: () => null,
	onSearch: () => null,
};

export default SearchBar;
