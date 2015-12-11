import React from 'react';

export default class ProgressBar extends React.Component {
	static propTypes = {
		id: React.PropTypes.string,
		style: React.PropTypes.object,
		now: React.PropTypes.number.isRequired,
	};

	static defaultProps = {
		now: 0,
	};

	constructor(props) {
		super(props);
	}

	render() {
		const styles = {
			wrapper: {},
			progress: {
				backgroundColor: '#F00',
				width: `${this.props.now}%`,
				height: 5,
				transition: 'width 250ms',
			},
		};

		Object.assign(styles.wrapper, this.props.style);

		return (
			<div id={this.props.id} style={styles.wrapper}>
				<div style={styles.progress}></div>
			</div>
		);
	}
}
