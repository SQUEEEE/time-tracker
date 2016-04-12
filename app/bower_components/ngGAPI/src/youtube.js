'use strict';

angular.module('gapi')
  .factory('Youtube', function (GAPI) {
    var Youtube = new GAPI('youtube', 'v3', {
      activities:       ['list', 'insert'],
      channels:         ['list', 'update'],
      guideCategories:  ['list'],
      liveBroadcasts:   ['list', 'insert', 'update', 'delete'],
      liveStreams:      ['list', 'insert', 'update', 'delete'],
      playlistItems:    ['list', 'insert', 'update', 'delete'],
      playlists:        ['list', 'insert', 'update', 'delete'],
      subscriptions:    ['list', 'insert', 'delete'],
      thumbnails:       ['set'],
      videoCategories:  ['list'],
      videos:           ['list', 'insert', 'update', 'delete'],
      watermarks:       ['set', 'unset'],
      search:           ['list']
    });

    // Some methods don't fit the pattern
    // Define them explicitly here
    Youtube.insertChannelBanners = function () {};

    Youtube.bindLiveBroadcasts = function () {};
    Youtube.controlLiveBroadcasts = function () {};
    Youtube.transitionLiveBroadcasts = function () {};

    Youtube.rateVideos = function (params) {
      return Youtube.post('videos', 'rate', undefined, params);
    };

    Youtube.getVideoRating = function (params) {
      return Youtube.get('videos', 'getRating', params);     
    };


    return Youtube;
  });



