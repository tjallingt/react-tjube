'use strict';

const Config = {
	youtubeApi: {
		url: 'https://www.googleapis.com/youtube/v3/',
		key: 'AIzaSyCIPY7lwNyrTFIQmvMPsFHWh54IA2gMvHY',
	},
};

if (typeof module !== 'undefined' && module.exports) {
	module.exports = Config;
} else {
	window.Config = Config;
}
