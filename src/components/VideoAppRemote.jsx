import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { deleteVideo, sendVideo } from '../actions';

import Search from './Search/Search';
import Dialog from './Dialog/Dialog';
import Toast from './Toast/Toast';
import VideoCard from './VideoCard/VideoCard';

import styles from './VideoAppRemote.css';

function VideoAppRemote({ video, disconnected, toasts, ...props }) {
	let dialog;
	if (video) {
		dialog = (
			<Dialog
				id="dialog"
				key={video.id}
				onConfirm={() => props.sendVideo(video)}
				onClose={props.deleteVideo}
			>
				<h3>Do you want to add this video to the playlist?</h3>
				<VideoCard
					video={video}
					thumbnail="medium"
				/>
			</Dialog>
		);
	}
	if (disconnected) {
		dialog = (
			<Dialog
				id="dialog"
				key="disconnected"
				onClose={() => location.reload()}
			>
				<h3>You are disconnected, please reload the page.</h3>
			</Dialog>
		);
	}
	return (
		<div>
			<Search
				id="search"
				withToast={false}
			/>
			<div className={styles.toastWrapper}>
				<ReactCSSTransitionGroup
					transitionName="fade"
					transitionEnterTimeout={500}
					transitionLeaveTimeout={500}
				>
					{toasts.map((toast) => (
						<Toast key={toast.key}>
							{toast.message}
						</Toast>
					))}
				</ReactCSSTransitionGroup>
			</div>
			<ReactCSSTransitionGroup
				transitionName="scale"
				transitionEnterTimeout={250}
				transitionLeaveTimeout={250}
			>
				{dialog}
			</ReactCSSTransitionGroup>
		</div>
	);
}

VideoAppRemote.propTypes = {
	video: React.PropTypes.object,
	toasts: React.PropTypes.array,
	disconnected: React.PropTypes.bool,
	sendVideo: React.PropTypes.func,
	deleteVideo: React.PropTypes.func,
};

const mapStateToProps = (state) => ({
	video: state.video,
	toasts: state.toasts,
	disconnected: !state.connected,
});

const mapDispatchToProps = {
	deleteVideo,
	sendVideo,
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoAppRemote);
