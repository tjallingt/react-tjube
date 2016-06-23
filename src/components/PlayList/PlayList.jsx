import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { moveVideo, deleteVideo } from '../../actions';
import PlayListItem from './PlayListItem';

function PlayList({ id, playlist, onClickDelete, onClickNext }) {
	const styles = {
		list: {
			listStyleType: 'none',
		},
	};

	return (
		<ul
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
						onClickNext={() => onClickNext(video, index)}
						onClickDelete={() => onClickDelete(index)}
					/>
				))}
			</ReactCSSTransitionGroup>
		</ul>
	);
}

PlayList.propTypes = {
	id: React.PropTypes.string,
	playlist: React.PropTypes.array.isRequired,
	onClickNext: React.PropTypes.func,
	onClickDelete: React.PropTypes.func,
};

PlayList.defaultProps = {
	playlist: [],
	onClickNext: () => null,
	onClickDelete: () => null,
};

const mapStateToProps = (state) => ({
	playlist: state.playlist,
});

const mapDispatchToProps = (dispatch) => ({
	onClickNext: (video, index) => {
		dispatch(moveVideo(video, index, 1));
	},
	onClickDelete: (index) => {
		dispatch(deleteVideo(index));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayList);
