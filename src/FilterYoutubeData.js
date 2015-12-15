'use strict';

const YTTYPE = {
	VIDEO: 'youtube#video',
	SEARCHRESULT: 'youtube#searchResult',
};

function filterYoutubeData(data) {
	if (data.kind === YTTYPE.VIDEO || (data.kind === YTTYPE.SEARCHRESULT && data.id.kind === YTTYPE.VIDEO)) {
		const newData = {
			key: data.id,
			id: data.id,
			title: data.snippet.title,
			channelTitle: data.snippet.channelTitle,
			thumbnails: data.snippet.thumbnails,
		};
		if (data.kind === YTTYPE.SEARCHRESULT) { // id for searchresult is wrapped in id object
			newData.key = newData.id.videoId;
			newData.id = newData.id.videoId;
		}
		return newData;
	}
	return false;
}

if (typeof module !== 'undefined' && module.exports) {
	module.exports = filterYoutubeData;
} else {
	window.filterYoutubeData = filterYoutubeData;
}
