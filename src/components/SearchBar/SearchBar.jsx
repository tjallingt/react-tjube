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
				<input
					className={styles.input}
					type="text"
					onChange={this.handleChange}
					value={this.state.text}
					placeholder="Search for videos"
				/>
				<button
					type="button"
					className={styles.button}
					onClick={this.handleClear}
				>
					<i className="fa fa-times"></i>
				</button>
			</div>
		);
	}
}

SearchBar.propTypes = {
	id: React.PropTypes.string,
	value: React.PropTypes.string,
	onChange: React.PropTypes.func,
	onClear: React.PropTypes.func,
};

export default SearchBar;
