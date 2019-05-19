import * as WaveformPlaylist from 'waveform-playlist'
const fs = require('fs')

var Player = function() {
  this.playlist = WaveformPlaylist.init({
    samplesPerPixel: 1280,
    waveHeight: 60,
    container: document.getElementById("playlist"),
    timescale: true,
    mono: true,
    exclSolo: false,
    state: 'cursor',
    colors: {
      waveOutlineColor: '#090909',
      fadeColor: 'black'
    },
    controls: {
      show: true, //whether or not to include the track controls
      width: 160 //width of controls in pixels
    },
    zoomLevels: [1280]
  });
}

Player.prototype.loadTargets = function(trackurls) {
  this.playlist.getEventEmitter().emit('stop')
  this.playlist.tracks = []
  var tracksToLoad = []
  for (let track of trackurls) {
    var buffer = fs.readFileSync(track.file)
    var blob = new Blob([buffer], { type: track.type });
    tracksToLoad.push(
      {
        "src": blob,
        "name": track.name,
        "muted": track.mute,
        "customClass": track.customClass,
        "soloed": track.solo,
      }
    );
  }
  this.playlist.load(tracksToLoad);
}

Player.prototype.addTrack = function(track) {
  var buffer = fs.readFileSync(track.file)
  var blob = new Blob([buffer], { type: track.type });

  this.playlist.load([
    {
      "src": blob,
      "name": track.name, 
      "muted": track.mute,
      "customClass": track.customClass,
      "soloed": track.solo,
    }
  ])
}

export default Player
