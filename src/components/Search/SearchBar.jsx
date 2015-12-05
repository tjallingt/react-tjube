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
				border: "solid white",
				height: "100%",
				fontSize: "inherit",
				padding: "5px",
				boxSizing: "border-box"
			},
			button: {
				width: "5%",
				minWidth: "20px",
				height: "100%",
				background: "white",
				color: "black",
				"fontSize": "inherit",
				border: "none",
				position: "absolute",
				top: "0px",
				bottom: "0px",
				right: "0px"
			}
		};
		let button;

		if( this.props.searchText !== "" ) {
			button = <button type="button" style={styles.button} onClick={::this.clearSearch}><i className="fa fa-times"></i></button>;
		}

		Object.assign( styles.searchbar, this.props.style );

		return (
			<div id={this.props.id} style={styles.searchbar}>
				<input style={styles.input} type="text" onChange={::this.handleChange} value={this.props.searchText} placeholder="Search for videos" />
				{button}
			</div>
		);
	}
}