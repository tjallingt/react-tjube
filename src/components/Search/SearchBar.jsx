import React from 'react';

function SearchBar({ id, value, onChange, onClear }) {
	const styles = {
		searchbar: {
			position: 'relative',
		},
		input: {
			width: '100%',
			border: 'solid white',
			height: '100%',
			fontSize: 'inherit',
			padding: '5px',
			boxSizing: 'border-box',
		},
		button: {
			position: 'absolute',
			top: '0px',
			bottom: '0px',
			right: '0px',
			width: '5%',
			minWidth: '20px',
			height: '100%',
			background: 'white',
			color: 'black',
			fontSize: 'inherit',
			border: 'none',
			cursor: 'pointer',
		},
	};
	return (
		<div id={id} style={styles.searchbar}>
			<input
				style={styles.input}
				type="text"
				onChange={onChange}
				value={value}
				placeholder="Search for videos"
			/>
			<button
				type="button"
				style={styles.button}
				onClick={onClear}
			>
				<i className="fa fa-times"></i>
			</button>
		</div>
	);
}

SearchBar.propTypes = {
	id: React.PropTypes.string,
	value: React.PropTypes.string,
	onChange: React.PropTypes.func,
	onClear: React.PropTypes.func,
};

export default SearchBar;
