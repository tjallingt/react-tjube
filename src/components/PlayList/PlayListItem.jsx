import React from 'react';

function PlayListItem({ video, index, onClickDelete, onClickNext }) {
	const styles = {
		item: {
			position: 'relative',
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center',
			backgroundSize: 'cover',
			backgroundImage: `url( ${video.thumbnails.medium.url} )`,
		},
		text: {
			overflow: 'hidden',
			whiteSpace: 'nowrap',
			textOverflow: 'ellipsis',
			paddingRight: '40px',
		},
		buttonWrapper: {
			position: 'absolute',
		},
		button: {
			cursor: 'pointer',
			marginRight: '10px',
		},
	};

	let nextButton;
	if (index > 1) {
		nextButton = (
			<span
				className="play-next-button"
				style={styles.button}
				onClick={onClickNext}
			>
				<i className="fa fa-rotate-270 fa-step-forward" />
			</span>
		);
	}
	const deleteButton = (
		<span
			className="delete-button"
			style={styles.button}
			onClick={onClickDelete}
		>
			<i className={index === 0 ? 'fa fa-times' : 'fa fa-step-forward'} />
		</span>
	);

	return (
		<div
			className="play-list-item"
			style={styles.item}
		>
			<div style={styles.text}>{video.title}</div>
			<small style={styles.text}>{video.channelTitle}</small>
			<div
				className="button-wrapper"
				style={styles.buttonWrapper}
			>
				{nextButton}
				{deleteButton}
			</div>
		</div>
	);
}

PlayListItem.propTypes = {
	video: React.PropTypes.object.isRequired,
	index: React.PropTypes.number,
	onClickDelete: React.PropTypes.func,
	onClickNext: React.PropTypes.func,
};

export default PlayListItem;
