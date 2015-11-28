import React from 'react';
 
export default class SearchBar extends React.Component {
	static propTypes = {
		searchText: React.PropTypes.string,
		onChange: React.PropTypes.func
	};

	static defaultProps = {
		searchText: "",
		onChange: () => {}
	};

	constructor( props ) {
		super( props );
	}

	handleChange( e ) {
		this.props.onChange( e.target.value );
	}

	clearSearch() {
		this.props.onChange( "" );
	}

	render() {
		const styles = {
			searchbar: {
				position: "relative"
			},
			input: {
				width: "100%",
				border: "none",
				height: "100%",
				fontSize: "inherit",
				padding: "0px 5px 0px 5px",
				boxSizing: "border-box"
			},
			button: {
				width: "5%",
				minWidth: "15px",
				background: "white",
				color: "black",
				height: "100%",
				border: "none",
				position: "absolute",
				top: "0px",
				bottom: "0px",
				right: "0px"
			}
		};

		Object.assign( styles.searchbar, this.props.style );

		return (
			<div id={this.props.id} style={styles.searchbar}>
				<input style={styles.input} type="text" onChange={::this.handleChange} value={this.props.searchText} />
				<button type="button" style={styles.button} onClick={::this.clearSearch}>X</button>
			</div>
		);
	}
}