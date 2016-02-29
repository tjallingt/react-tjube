import React from 'react';

export default class SearchBar extends React.Component {
	static propTypes = {
		id: React.PropTypes.string,
		style: React.PropTypes.object,
		searchText: React.PropTypes.string,
		onChange: React.PropTypes.func,
		onEnter: React.PropTypes.func,
	};

	static defaultProps = {
		searchText: '',
		onChange: () => null,
		onEnter: () => null,
	};

	setSearchInputRef = (ref) => {
		this.searchInput = ref;
	};

	handleChange = (event) => {
		this.props.onChange(event.target.value);
	};

	handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			this.searchInput.blur();
			this.props.onEnter(event);
		}
	};

	clearSearch = () => {
		this.props.onChange('');
		this.searchInput.focus();
	};

	render() {
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
		let button;

		if (this.props.searchText !== '') {
			button = (
				<button
					type="button"
					style={styles.button}
					onClick={this.clearSearch}
				>
					<i className="fa fa-times"></i>
				</button>
			);
		}

		Object.assign(styles.searchbar, this.props.style);

		return (
			<div id={this.props.id} style={styles.searchbar}>
				<input
					style={styles.input}
					type="text"
					ref={this.setSearchInputRef}
					onChange={this.handleChange}
					onKeyPress={this.handleKeyPress}
					value={this.props.searchText}
					placeholder="Search for videos"
				/>
				{button}
			</div>
		);
	}
}
