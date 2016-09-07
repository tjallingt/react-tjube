import React from 'react';

class ProgressBar extends React.Component {
	static propTypes = {
		id: React.PropTypes.string,
		className: React.PropTypes.string,
		youtube: React.PropTypes.object,
	};

	componentDidUpdate() {
		// kick off the progressbar
		cancelAnimationFrame(this.request);
		if (this.props.youtube) {
			this.request = requestAnimationFrame(this.updateProgressBar);
		}
	}

	setWrapperRef = (ref) => {
		this.wrapper = ref;
	};

	setProgressRef = (ref) => {
		this.progress = ref;
	};

	updateProgressBar = () => {
		if (this.props.youtube) {
			// calculate percentage width from youtube player progress and request next frame
			const currentTime = this.props.youtube.getCurrentTime();
			const duration = this.props.youtube.getDuration();
			const progress = (currentTime / duration) * 100;
			this.progress.style.width = `${progress}%`;
			this.request = requestAnimationFrame(this.updateProgressBar);
		}
	};

	handleClick = (event) => {
		const position = event.clientX - this.wrapper.offsetLeft;
		const percentage = position / this.wrapper.offsetWidth;
		const time = this.props.youtube.getDuration() * percentage;
		this.props.youtube.seekTo(time, true);
	};

	render() {
		return (
			<div
				id={this.props.id}
				className={this.props.className}
				ref={this.setWrapperRef}
				onClick={this.handleClick}
			>
				<div
					className="progress"
					ref={this.setProgressRef}
				/>
			</div>
		);
	}
}

export default ProgressBar;
