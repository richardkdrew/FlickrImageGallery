(function() {
    'use strict';

    angular
        .module('app.core')
        .constant('flickrApi', {
			'url': 'https://api.flickr.com/services/rest',
			'key': '36862b3eb779f31ad749a8b561b730b6',
			'galleriesMethod': 'flickr.photosets.getList',
			'photoExtras': 'url_sq, url_q, url_t, url_m, url_c, url_b, url_o',
			'userId': '19632847@N00'
		});
})();