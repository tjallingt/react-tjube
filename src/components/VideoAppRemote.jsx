import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { deleteVideo, sendVideo } from '../actions';

import Search from './Search/Search';
import Alert from './Alert/Alert';
import VideoCard from './VideoCard/VideoCard';

function VideoAppRemote({ video, disconnected, ...props }) {
	let alert;
	if (video) {
		alert = (
			<Alert
				id="alert"
				key={video.id}
				onConfirm={() => props.sendVideo(video)}
				onClose={props.deleteVideo}
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
	video: React.PropTypes.object,
	disconnected: React.PropTypes.bool,
	sendVideo: React.PropTypes.func,
	deleteVideo: React.PropTypes.func,
};

const mapStateToProps = (state) => ({
	video: state.video,
	disconnected: !state.connected,
});

const mapDispatchToProps = {
	deleteVideo,
	sendVideo,
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoAppRemote);
