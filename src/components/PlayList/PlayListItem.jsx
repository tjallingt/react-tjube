import React from 'react';

function PlayListItem({ video, onClickDelete, onClickNext }) {
	const styles = {
		item: {
			position: 'relative',
			textOverflow: 'ellipsis',
			whiteSpace: 'nowrap',
			overflow: 'hidden',
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center',
			backgroundSize: 'cover',
			backgroundImage: `url( ${video.thumbnails.medium.url} )`,
		},
		buttonWrapper: {
			position: 'absolute',
		},
		button: {
			cursor: 'pointer',
			marginRight: '10px',
		},
	};

	return (
		<li
			className="video-list-item"
			style={styles.item}
		>
			{video.title}<br />
			by {video.channelTitle}

			<div
				className="button-wrapper"
				style={styles.buttonWrapper}
			>
				<span
					className="play-next-button"
					style={styles.button}
					onClick={onClickNext}
				>
					<i className="fa fa-rotate-270 fa-step-forward" />
				</span>

				<span
					className="delete-button"
					style={styles.button}
					onClick={onClickDelete}
				>
					<i className="fa fa-times" />
				</span>
			</div>
		</li>
	);
}

PlayListItem.propTypes = {
	video: React.PropTypes.object.isRequired,
	onClickDelete: React.PropTypes.func,
	onClickNext: React.PropTypes.func,
};

export default PlayListItem;
