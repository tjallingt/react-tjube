import React from 'react';
import styles from './SearchBar.css';

class SearchBar extends React.Component {
	state = {
		text: '',
	};

	handleChange = (event) => {
		this.setState({
			text: event.target.value,
		});
		this.props.onChange(event);
	};

	handleClear = () => {
		this.setState({
			text: '',
		});
		this.props.onClear();
	}

	render() {
		return (
			<div id={this.props.id} className={styles.searchbar}>
				<label
					htmlFor="search-input"
					className={styles.label}
				>
					<i className="fa fa-search"></i>
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
					<i className="fa fa-times-circle"></i>
				</div>
			</div>
		);
	}
}

SearchBar.propTypes = {
	id: React.PropTypes.string,
	value: React.PropTypes.string,
	onChange: React.PropTypes.func,
	onClear: React.PropTypes.func,
	placeholder: React.PropTypes.string,
};

export default SearchBar;
