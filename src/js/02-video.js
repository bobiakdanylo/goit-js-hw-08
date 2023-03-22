import Player from '@vimeo/player';

const trottle = require('lodash.throttle');
const iframe = document.getElementById('vimeo-player');
const player = new Player(iframe);

const onPlay = function (event) {
  try {
    const currentTime = event.seconds;
    const KEY = 'videoplayer-current-time';
    localStorage.setItem(KEY, currentTime);
  } catch (error) {
    console.error('Error:-', error);
  }
};

player.on('play', onPlay);

player.on('timeupdate', trottle(onPlay, 1000));

player.setCurrentTime(localStorage.getItem('videoplayer-current-time') || 0);