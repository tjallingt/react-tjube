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
		const { id, playlist, handleClickDelete, handleMoveVideo } = this.props;
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
							moveVideo={handleMoveVideo}
							onClickDelete={() => handleClickDelete(index)}
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
	handleMoveVideo: React.PropTypes.func,
	handleClickDelete: React.PropTypes.func,
};

PlayList.defaultProps = {
	playlist: [],
	handleMoveVideo: () => null,
	handleClickDelete: () => null,
};

const mapStateToProps = (state) => ({
	playlist: state.playlist,
});

const mapDispatchToProps = (dispatch) => ({
	handleMoveVideo: (fromIndex, toIndex) => {
		dispatch(moveVideo(fromIndex, toIndex));
	},
	handleClickDelete: (index) => {
		dispatch(deleteVideo(index));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayList);
