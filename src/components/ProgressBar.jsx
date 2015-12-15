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
		let position = event.clientX - this.wrapper.offsetLeft;
		let percentage = position / this.wrapper.offsetWidth;
		let time = this.props.youtube.getDuration() * percentage;
		this.props.youtube.seekTo(time, true);
	}

	render() {
		const styles = {
			wrapper: {},
			progress: {
				backgroundColor: '#F00',
				width: '0%',
				height: 5,
			},
		};

		Object.assign(styles.wrapper, this.props.style);

		return (
			<div id={this.props.id} style={styles.wrapper} ref={(ref) => this.wrapper = ref} onClick={::this.handleClick}>
				<div ref={(ref) => this.progress = ref} style={styles.progress}></div>
			</div>
		);
	}
}
