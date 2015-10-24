import React from 'react';
import VideoListItem from './VideoListItem';
 
export default class VideoList extends React.Component {
	static propTypes = {
		style: React.PropTypes.object,
		list: React.PropTypes.array.isRequired,
		onClick: React.PropTypes.func
	};

	static defaultProps = {
		style: {},
		onClick: () => {}
	};

	constructor( props ) {
		super( props );
	}

	render() {
		let list = [];
		const styles = {
			list: {
				listStyleType: "none"
			}
		};

		Object.assign( styles.list, this.props.style );

		this.props.list.forEach( ( item ) => {
			list.push(
				<VideoListItem 
					key={item.id.videoId}
					video={item}
					onClick={this.props.onClick}
				/> 
			);
		});

		return(
			<ul style={styles.list}>
				{list}
			</ul>
		);
	}
}

