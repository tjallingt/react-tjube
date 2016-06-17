import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import PlayListItem from './PlayListItem';

function PlayList({ id, playlist, onClickDelete, onClickNext }) {
	const styles = {
		list: {
			listStyleType: 'none',
		},
	};

	let list = playlist.map((video, index) => {
		let boundClickNext = onClickNext.bind(this, video, index);
		let boundClickDelete = onClickDelete.bind(this, video, index);
		return (
			<PlayListItem
				key={video.key}
				index={index}
				video={video}
				onClickNext={boundClickNext}
				onClickDelete={boundClickDelete}
			/>
		);
	});

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
				{list}
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
	onClickNext: () => null,
	onClickDelete: () => null,
};

export default PlayList;
