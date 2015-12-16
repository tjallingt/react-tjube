'use strict';

const Config = {
	youtubeApi: {
		url: 'https://www.googleapis.com/youtube/v3/',
		key: 'AIzaSyC-lsLJ5p1Iegs3xOtY1C-N5-qB6mlaKEI',
	},
};

if (typeof module !== 'undefined' && module.exports) {
	module.exports = Config;
} else {
	window.Config = Config;
}
