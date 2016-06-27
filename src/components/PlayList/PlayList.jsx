/* eslint new-cap: "off", react/prefer-stateless-function: "off" */
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { moveVideo, deleteVideo } from '../../actions';
import PlayListItem from './PlayListItem';

@DragDropContext(HTML5Backend)
class PlayList extends React.Component {
	render() {
		const { id, playlist } = this.props;
		const styles = {
			list: {
				listStyleType: 'none',
			},
		};

		return (
			<div
				id={id}
				style={styles.list}
			>
				<ReactCSSTransitionGroup
					transitionName="fade"
					transitionAppear
					transitionAppearTimeout={500}
					transitionEnterTimeout={500}
					transitionLeaveTimeout={500}
				>
					{playlist.map((video, index) => (
						<PlayListItem
							key={video.key}
							index={index}
							video={video}
							moveVideo={this.props.moveVideo}
							onDelete={() => this.props.deleteVideo(index)}
						/>
					))}
				</ReactCSSTransitionGroup>
			</div>
		);
	}
}

PlayList.propTypes = {
	id: React.PropTypes.string,
	playlist: React.PropTypes.array.isRequired,
	moveVideo: React.PropTypes.func,
	deleteVideo: React.PropTypes.func,
};

PlayList.defaultProps = {
	playlist: [],
	moveVideo: () => null,
	deleteVideo: () => null,
};

const mapStateToProps = (state) => ({
	playlist: state.playlist,
});

const mapDispatchToProps = {
	moveVideo,
	deleteVideo,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayList);
