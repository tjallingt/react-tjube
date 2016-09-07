import React from 'react';

import Player from '../containers/Player';
import ProgressBar from '../containers/ProgressBar';
import PlayList from '../containers/PlayList';
import SearchBar from '../containers/SearchBar';
import SearchResults from '../containers/SearchResults';
import Toaster from '../containers/Toaster';
import Controls from '../containers/Controls';
import Headline from '../containers/Headline';
import Dialogs from '../containers/PlayerDialogs';

import styles from './VideoAppPlayer.css';
import './animations.css';

function VideoAppPlayer() {
	return (
		<div>
			<Player
				className={styles.player}
				fillStyle={styles.fill}
			/>

			<Headline className={styles.headline} />

			<PlayList id="playlist" />

			<div id="search">
				<SearchBar
					id="search-bar"
					placeholder="Search YouTube"
				/>
				<SearchResults id="search-results" />
			</div>

			<Controls className={styles.controls} />

			<Toaster className={styles.toaster} />

			<ProgressBar id="progress-bar" />

			<Dialogs className={styles.dialogs} />
		</div>
	);
}

export default VideoAppPlayer;
