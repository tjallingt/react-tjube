var YTTYPE = {
	VIDEO: "youtube#video",
	SEARCHRESULT: "youtube#searchResult"
};

var FilterYoutubeData = function(data) {
	if (data.kind === YTTYPE.VIDEO || (data.kind === YTTYPE.SEARCHRESULT && data.id.kind === YTTYPE.VIDEO)) {
		var newData = {
			id: data.id,
			title: data.snippet.title,
			channelTitle: data.snippet.channelTitle,
			thumbnails: data.snippet.thumbnails
		}
		if (data.kind === YTTYPE.SEARCHRESULT) {
			newData.id = newData.id.videoId; // id for searchresult is wrapped in id object
		}
		return newData;
	}
	else {
		return false;
	}
};

if(typeof module !== 'undefined' && module.exports) {
	module.exports = FilterYoutubeData;
} else {
	window.FilterYoutubeData = FilterYoutubeData;
}