import React from 'react';

import SearchBar from '../containers/SearchBar';
import { withoutToast as SearchResults } from '../containers/SearchResults';
import Dialogs from '../containers/RemoteDialogs';
import Toaster from '../containers/Toaster';

import styles from './VideoAppRemote.css';
import './animations.css';

function VideoAppRemote() {
	return (
		<div>
			<SearchBar
				className={styles.searchBar}
				placeholder="Search YouTube"
			/>

			<SearchResults className={styles.searchResults} />

			<Toaster className={styles.toaster} />

			<Dialogs className={styles.dialogs} />
		</div>
	);
}

export default VideoAppRemote;
