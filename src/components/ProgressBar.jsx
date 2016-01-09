import React from 'react';

export default class ProgressBar extends React.Component {
	static propTypes = {
		id: React.PropTypes.string,
		style: React.PropTypes.object,
		youtube: React.PropTypes.object.isRequired,
	};

	constructor(props) {
		super(props);
	}

	componentDidUpdate() {
		// kick off the progressbar
		requestAnimationFrame(::this.updateProgressBar);
	}

	updateProgressBar() {
		// calculate percentage width from youtube player progress and request next frame
		const progress = (this.props.youtube.getCurrentTime() / this.props.youtube.getDuration()) * 100;
		this.progress.style.width = `${progress}%`;
		requestAnimationFrame(::this.updateProgressBar);
	}

	handleClick(event) {
		const position = event.clientX - this.wrapper.offsetLeft;
		const percentage = position / this.wrapper.offsetWidth;
		const time = this.props.youtube.getDuration() * percentage;
		this.props.youtube.seekTo(time, true);
	}

	render() {
		return (
			<div
				id={this.props.id}
				style={this.props.style}
				ref={(ref) => this.wrapper = ref}
				onClick={::this.handleClick}
			>
				<div
					className="progress"
					ref={(ref) => this.progress = ref}
				/>
			</div>
		);
	}
}
