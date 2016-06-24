import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { moveVideo, deleteVideo } from '../../actions';
import PlayListItem from './PlayListItem';

function PlayList({ id, playlist, handleClickDelete, handleClickNext }) {
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
						onClickNext={() => handleClickNext(video, index)}
						onClickDelete={() => handleClickDelete(index)}
					/>
				))}
			</ReactCSSTransitionGroup>
		</div>
	);
}

PlayList.propTypes = {
	id: React.PropTypes.string,
	playlist: React.PropTypes.array.isRequired,
	handleClickNext: React.PropTypes.func,
	handleClickDelete: React.PropTypes.func,
};

PlayList.defaultProps = {
	playlist: [],
	handleClickNext: () => null,
	handleClickDelete: () => null,
};

const mapStateToProps = (state) => ({
	playlist: state.playlist,
});

const mapDispatchToProps = (dispatch) => ({
	handleClickNext: (video, index) => {
		dispatch(moveVideo(video, index, 1));
	},
	handleClickDelete: (index) => {
		dispatch(deleteVideo(index));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayList);
