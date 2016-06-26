import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { deleteVideo, sendVideo } from '../actions';

import Search from './Search/Search';
import Alert from './Alert/Alert';
import VideoCard from './VideoCard/VideoCard';

function VideoAppRemote({ acceptVideo, video, declineVideo, disconnected }) {
	let alert;
	if (video) {
		alert = (
			<Alert
				id="alert"
				key={video.id}
				onConfirm={() => acceptVideo(video)}
				onClose={declineVideo}
			>
				<b>Do you want to add this video to the playlist?</b>
				<VideoCard video={video} />
			</Alert>
		);
	}
	if (disconnected) {
		alert = (
			<Alert
				id="alert"
				key="disconnected"
				onClose={() => location.reload()}
			>
				<b>You are disconnected, please reload the page.</b>
			</Alert>
		);
	}
	return (
		<div>
			<Search
				id="search"
			/>
			<ReactCSSTransitionGroup
				transitionName="scale"
				transitionEnterTimeout={250}
				transitionLeaveTimeout={250}
			>
				{alert}
			</ReactCSSTransitionGroup>
		</div>
	);
}

VideoAppRemote.propTypes = {
	acceptVideo: React.PropTypes.func,
	video: React.PropTypes.object,
	declineVideo: React.PropTypes.func,
	disconnected: React.PropTypes.bool,
};

const mapStateToProps = (state) => ({
	video: state.video,
	disconnected: !state.connected,
});

const mapDispatchToProps = (dispatch) => ({
	declineVideo: () => dispatch(deleteVideo()),
	acceptVideo: (video) => dispatch(sendVideo(video)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoAppRemote);
