import React from 'react';
 
export default class PlayList extends React.Component {
	static propTypes = {
		style: React.PropTypes.object,
		playlist: React.PropTypes.array.isRequired
	};

	static defaultProps = {
		style: {}
	};

	constructor( props ) {
		super( props );
	}

	render() {
		let list = [];
		const styles = {
			playlist: {
				listStyleType: "none"
			},
			item: {
				textOverflow: "ellipsis",
				whiteSpace: "nowrap",
				overflow: "hidden"
			}
		};

		Object.assign( styles.playlist, this.props.style );

		this.props.playlist.forEach( ( item ) => {
			list.push( 
				<li style={styles.item} title={item.title} key={item.id}>{item.title}</li>
			);
		});

		return(
			<ul style={styles.playlist}>
				{list}
			</ul>
		);
	}
}