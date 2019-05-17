<template>
  <div id='player'>
    <div>
      <div class="column is-narrow" ref="playbutton">
        <span class="icon">
          <i class="fa fa-keyboard"></i>
        </span>

        <span class="buttons">
          <a class="button is-success"
            v-bind:class="{ 'is-active': isPlaying, 'is-disabled': isLoading }"
            v-on:click='playpause'><span v-bind:class="isPlaying ? 'fa fa-pause' : 'fa fa-play' "></span>
          </a>
          <a class="button is-danger"
            v-bind:class="{ 'is-disabled': isLoading }"
            v-on:click='stop'><span class="fa fa-stop"></span></a>
        </span>
      </div>
    </div>
    <transition name="slide-fade">
      <div id="playlist"
      ></div>
    </transition>
  </div>
</template>

<script>
const fs = require('fs')
const path = require('path')
const headers_raw = fs.readFileSync(path.join(__static, 'headers.json'), 'utf8')
let headers = JSON.parse(headers_raw); 
import Mousetrap from 'mousetrap'
import player from './player.js'


export default {
  components: {},
  props: {
    urls: Array,
    title: String,
  },
  data: function () {
    return {
      isPlaying: false,
      isLoading: false,
      player: Object,
      headers: Array,
      loaderColor: 'orange',
      loaderHeight: '26px',
      playbackPosition: 0,
      lastplaybackPosition: 0
    }
  },
  beforeMount: function () {
    this.headers = headers;
  },
  mounted: function () {
    Mousetrap.bind('space', this.playpause )
    this.player = new player();
    this.player.playlist.getEventEmitter().on('audiosourcesloaded', this.audioLoaded);
    this.player.playlist.getEventEmitter().on('timeupdate', this.updateTime);
    this.update_tracks();
  },
  beforeDestroy: function () {
    Mousetrap.unbind('space');
    for (var i = 0; i < this.player.playlist.tracks.length; ++i) {
      (function (i) {
      Mousetrap.unbind(String(i + 1));
      })(i);
    }
    this.stop();
    delete this.player;
  },
  methods: {
    update_tracks: function () {
      if(this.isLoading != true) {
        this.saveState()
        this.stop()
        this.isLoading = true
        this.player.loadTargets(this.urls)
        for (var i = 0; i < this.urls.length; ++i) {
            (function (i, e) {
                Mousetrap.bind(String(i + 1), function () {
                  e.player.playlist.getEventEmitter().emit('solo', e.player.playlist.tracks[i])
                });
                Mousetrap.bind(['ctrl+' + String(i + 1), 'meta+' + String(i + 1)], function () {
                  e.player.playlist.getEventEmitter().emit('mute', e.player.playlist.tracks[i])
                });
            })(i, this)
          }
        }
    },
    addTrack: function (url) {
      this.isLoading = true
      this.player.addTrack(url)
    },
    saveState: function () {
      this.lastplaybackPosition = this.playbackPosition
    },
    playpause: function (event) {
      if (this.isPlaying) {
        this.player.playlist.getEventEmitter().emit('pause')
      }
      else {
        this.player.playlist.getEventEmitter().emit('play')
        this.player.playlist.getEventEmitter().on('finished', this.stop);
      }
      this.isPlaying = ! this.isPlaying
      event.stopPropagation();
      return false;
    },
    stop: function () {
      this.player.playlist.getEventEmitter().emit('stop')
      this.isPlaying = false
    },
    toggleMode: function () {
      this.$emit('toggleMode', "foo")
    },
    audioLoaded: function () {
      this.$nextTick(() => this.$refs.playbutton.focus())
      this.isLoading = false
    },
    updateTime: function (playbackPosition) {
      this.playbackPosition = playbackPosition
    },

  },
  watch: {
    urls: {
      handler: 'update_tracks',
      deep: true
    },
  }
}
</script>

<style lang="scss">
@import "~bulmaswatch/darkly/_variables.scss";
@import "~bulma";
@import "~bulmaswatch/darkly/_overrides.scss";
</style>

<style media="screen">
#player {
  padding-top: 0px;
  margin-top:  0px;
}

#player .columns.hide{
  display: none;
}

#playlist.hide{
  display: none;
}

#playlist .playlist-tracks .mix header {
  background-color: white;
  border-left: 1px solid gray;
  /* border-top: 1px solid gray; */
  border-bottom: 1px solid gray;
  color: black;
}

#playlist .playlist-tracks  header {
  font-size: 14px;
}


#playlist .playlist-tracks .vocals header {
  color: white;
  background-color: #56B4E9;
}

#playlist .playlist-tracks .accompaniment header {
  color: white;
  background-color: #818181;
}

#playlist .playlist-tracks .drums header {
  color: white;
  background-color: #009E73;
}

#playlist .playlist-tracks .bass header {
  color: white;
  background-color: #D55E00;
}

#playlist .playlist-tracks .other header {
  color: white;
  background-color: #CC79A7;
}


.playlist .channel-wrapper .controls label {
    display: none !important;
}

.playlist .channel-wrapper .controls .btn {
    margin-left: 4px;
}

.playlist .channel-wrapper .controls .btn-solo.active {
    background-color: #375a7f!important;
    border-color: #375a7f!important;
    color:white;
}

/* .playlist .channel-wrapper .controls .btn-mute {
    display: none !important;
} */

.playlist {
  overflow: hidden;
  margin: 0em 0;
  width: 100%;
}
  .playlist .playlist-time-scale {
    overflow: hidden!important;
    height: 30px; }
  .playlist .playlist-tracks {
    overflow-x: hidden!important;
    background: transparent; }
  .playlist .channel {
    background: #b4b4b4; }
  .playlist .channel-progress.silent {
    background: white; }
  .playlist .cursor {
    background: white; }
  .playlist .wp-fade {
    background-color: rgba(0, 0, 0, 0.1); }
  .playlist .state-cursor,
  .playlist .state-select {
    cursor: text; }
  .playlist .state-fadein {
    cursor: w-resize; }
  .playlist .state-fadeout {
    cursor: e-resize; }
  .playlist .state-shift {
    cursor: ew-resize; }
  .playlist .selection.point {
    background: #00d1b2; }
  .playlist .selection.segment {
    background: rgba(0, 0, 0, 0.1); }
  .playlist .channel-wrapper.silent .channel {
      background: #313131;
  }
  .playlist .channel-wrapper.silent .channel {
    opacity: 0.9; }
  .playlist .controls {
    background: black;
    text-align: center; }
    .playlist .controls header {
      overflow: hidden;
      color: black;
      background-color: #00d1b2;
      margin-bottom: 0.5em;
      height: 20px; }
    .playlist .controls label {
      margin: 0.5em auto;
      width: 80%;
      display: inline-block;
      font: normal normal normal 14px/1 FontAwesome;
      font-size: inherit;
      text-rendering: auto;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      transform: translate(0, 0); }
    .playlist .controls label:before {
      content: "\f027";
      color: black;
      font-size: 13px;
      padding-right: 5px;
      -moz-osx-font-smoothing: grayscale; }
    .playlist .controls label:after {
      content: "\f028";
      color: black;
      font-size: 13px;
      padding-left: 5px; }
    .playlist .controls input[type=range] {
      display: inline-block;
      width: 75%; }
    .playlist .controls input[type=range]::-webkit-slider-runnable-track {
      height: 8px;
      background: #303030;
      border: none;
      border-radius: 3px;
      padding: 1px; }
    .playlist .controls input[type=range]::-moz-range-track {
      height: 8px;
      background: #303030;
      border: none;
      border-radius: 3px;
      padding: 1px; }
    .playlist .controls input[type=range]::-webkit-slider-thumb {
      border: none;
      height: 10px;
      width: 10px;
      border-radius: 50%;
      background: #909090;
      margin-top: -5px;
      cursor: ew-resize; }
    .playlist .controls input[type=range]::-moz-range-thumb {
      border: none;
      height: 10px;
      width: 10px;
      border-radius: 50%;
      background: #909090;
      margin-top: -5px;
      cursor: ew-resize; }
    .playlist .controls input[type=range]:focus {
      outline: none; }

      .btn {
        display: inline-block;
        margin-bottom: 0;
        font-weight: normal;
        text-align: center;
        vertical-align: middle;
        -ms-touch-action: manipulation;
            touch-action: manipulation;
        cursor: pointer;
        background-image: none;
        border: 1px solid transparent;
        white-space: nowrap;
        padding: 6px 12px;
        font-size: 14px;
        line-height: 1.42857143;
        border-radius: 0px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
      .btn:focus,
      .btn:active:focus,
      .btn.active:focus,
      .btn.focus,
      .btn:active.focus,
      .btn.active.focus {
        outline: 5px auto -webkit-focus-ring-color;
        outline-offset: -2px;
      }
      .btn:hover,
      .btn:focus,
      .btn.focus {
        color: #333333;
        text-decoration: none;
      }
      .btn:active,
      .btn.active {
        outline: 0;
        background-image: none;
      }
      .btn.disabled,
      .btn[disabled],
      fieldset[disabled] .btn {
        cursor: not-allowed;
        opacity: 0.65;
        filter: alpha(opacity=65);
        -webkit-box-shadow: none;
        box-shadow: none;
      }
      a.btn.disabled,
      fieldset[disabled] a.btn {
        pointer-events: none;
      }
      .btn-default {
        color: #909090;
        background-color: #232323;
        border-color: #232323;
      }
      .btn-default:focus,
      .btn-default.focus {
        color: #909090;
        background-color: #232323;
        border-color: #232323;
      }
      .btn-default:hover {
        color: white;
        background-color: #606060;
        border-color: #606060;
      }
      .btn-default:active,
      .btn-default.active,
      .open > .dropdown-toggle.btn-default {
        color: #333333;
        background-color: #e6e6e6;
        border-color: #e6e6e6;
      }
      .btn-default:active:hover,
      .btn-default.active:hover,
      .open > .dropdown-toggle.btn-default:hover,
      .btn-default:active:focus,
      .btn-default.active:focus,
      .open > .dropdown-toggle.btn-default:focus,
      .btn-default:active.focus,
      .btn-default.active.focus,
      .open > .dropdown-toggle.btn-default.focus {
        color: #333333;
        background-color: #d4d4d4;
        border-color: #d4d4d4;
      }
      .btn-default:active,
      .btn-default.active,
      .open > .dropdown-toggle.btn-default {
        background-image: none;
      }
      .btn-default.disabled:hover,
      .btn-default[disabled]:hover,
      fieldset[disabled] .btn-default:hover,
      .btn-default.disabled:focus,
      .btn-default[disabled]:focus,
      fieldset[disabled] .btn-default:focus,
      .btn-default.disabled.focus,
      .btn-default[disabled].focus,
      fieldset[disabled] .btn-default.focus {
        background-color: #ffffff;
        border-color: #cccccc;
      }
      .btn-default .badge {
        color: #ffffff;
        background-color: #333333;
      }
      .btn-primary {
        color: #ffffff;
        background-color: #337ab7;
        border-color: #2e6da4;
      }
      .btn-primary:focus,
      .btn-primary.focus {
        color: #ffffff;
        background-color: #286090;
        border-color: #122b40;
      }
      .btn-primary:hover {
        color: #ffffff;
        background-color: #286090;
        border-color: #204d74;
      }
      .btn-primary:active,
      .btn-primary.active,
      .open > .dropdown-toggle.btn-primary {
        color: #ffffff;
        background-color: #286090;
        border-color: #204d74;
      }
      .btn-primary:active:hover,
      .btn-primary.active:hover,
      .open > .dropdown-toggle.btn-primary:hover,
      .btn-primary:active:focus,
      .btn-primary.active:focus,
      .open > .dropdown-toggle.btn-primary:focus,
      .btn-primary:active.focus,
      .btn-primary.active.focus,
      .open > .dropdown-toggle.btn-primary.focus {
        color: #ffffff;
        background-color: #204d74;
        border-color: #122b40;
      }
      .btn-primary:active,
      .btn-primary.active,
      .open > .dropdown-toggle.btn-primary {
        background-image: none;
      }
      .btn-primary.disabled:hover,
      .btn-primary[disabled]:hover,
      fieldset[disabled] .btn-primary:hover,
      .btn-primary.disabled:focus,
      .btn-primary[disabled]:focus,
      fieldset[disabled] .btn-primary:focus,
      .btn-primary.disabled.focus,
      .btn-primary[disabled].focus,
      fieldset[disabled] .btn-primary.focus {
        background-color: #337ab7;
        border-color: #2e6da4;
      }
      .btn-primary .badge {
        color: #337ab7;
        background-color: #ffffff;
      }
      .btn-success {
        color: #ffffff;
        background-color: #5cb85c;
        border-color: #4cae4c;
      }
      .btn-success:focus,
      .btn-success.focus {
        color: #ffffff;
        background-color: #449d44;
        border-color: #255625;
      }
      .btn-success:hover {
        color: #ffffff;
        background-color: #449d44;
        border-color: #398439;
      }
      .btn-success:active,
      .btn-success.active,
      .open > .dropdown-toggle.btn-success {
        color: #ffffff;
        background-color: #449d44;
        border-color: #398439;
      }
      .btn-success:active:hover,
      .btn-success.active:hover,
      .open > .dropdown-toggle.btn-success:hover,
      .btn-success:active:focus,
      .btn-success.active:focus,
      .open > .dropdown-toggle.btn-success:focus,
      .btn-success:active.focus,
      .btn-success.active.focus,
      .open > .dropdown-toggle.btn-success.focus {
        color: #ffffff;
        background-color: #398439;
        border-color: #255625;
      }
      .btn-success:active,
      .btn-success.active,
      .open > .dropdown-toggle.btn-success {
        background-image: none;
      }
      .btn-success.disabled:hover,
      .btn-success[disabled]:hover,
      fieldset[disabled] .btn-success:hover,
      .btn-success.disabled:focus,
      .btn-success[disabled]:focus,
      fieldset[disabled] .btn-success:focus,
      .btn-success.disabled.focus,
      .btn-success[disabled].focus,
      fieldset[disabled] .btn-success.focus {
        background-color: #5cb85c;
        border-color: #4cae4c;
      }
      .btn-success .badge {
        color: #5cb85c;
        background-color: #ffffff;
      }
      .btn-info {
        color: #ffffff;
        background-color: #5bc0de;
        border-color: #46b8da;
      }
      .btn-info:focus,
      .btn-info.focus {
        color: #ffffff;
        background-color: #31b0d5;
        border-color: #1b6d85;
      }
      .btn-info:hover {
        color: #ffffff;
        background-color: #31b0d5;
        border-color: #269abc;
      }
      .btn-info:active,
      .btn-info.active,
      .open > .dropdown-toggle.btn-info {
        color: #ffffff;
        background-color: #31b0d5;
        border-color: #269abc;
      }
      .btn-info:active:hover,
      .btn-info.active:hover,
      .open > .dropdown-toggle.btn-info:hover,
      .btn-info:active:focus,
      .btn-info.active:focus,
      .open > .dropdown-toggle.btn-info:focus,
      .btn-info:active.focus,
      .btn-info.active.focus,
      .open > .dropdown-toggle.btn-info.focus {
        color: #ffffff;
        background-color: #269abc;
        border-color: #1b6d85;
      }
      .btn-info:active,
      .btn-info.active,
      .open > .dropdown-toggle.btn-info {
        background-image: none;
      }
      .btn-info.disabled:hover,
      .btn-info[disabled]:hover,
      fieldset[disabled] .btn-info:hover,
      .btn-info.disabled:focus,
      .btn-info[disabled]:focus,
      fieldset[disabled] .btn-info:focus,
      .btn-info.disabled.focus,
      .btn-info[disabled].focus,
      fieldset[disabled] .btn-info.focus {
        background-color: #5bc0de;
        border-color: #46b8da;
      }
      .btn-info .badge {
        color: #5bc0de;
        background-color: #ffffff;
      }
      .btn-warning {
        color: #ffffff;
        background-color: #f0ad4e;
        border-color: #eea236;
      }
      .btn-warning:focus,
      .btn-warning.focus {
        color: #ffffff;
        background-color: #ec971f;
        border-color: #985f0d;
      }
      .btn-warning:hover {
        color: #ffffff;
        background-color: #ec971f;
        border-color: #d58512;
      }
      .btn-warning:active,
      .btn-warning.active,
      .open > .dropdown-toggle.btn-warning {
        color: #ffffff;
        background-color: #ec971f;
        border-color: #d58512;
      }
      .btn-warning:active:hover,
      .btn-warning.active:hover,
      .open > .dropdown-toggle.btn-warning:hover,
      .btn-warning:active:focus,
      .btn-warning.active:focus,
      .open > .dropdown-toggle.btn-warning:focus,
      .btn-warning:active.focus,
      .btn-warning.active.focus,
      .open > .dropdown-toggle.btn-warning.focus {
        color: #ffffff;
        background-color: #d58512;
        border-color: #985f0d;
      }
      .btn-warning:active,
      .btn-warning.active,
      .open > .dropdown-toggle.btn-warning {
        background-image: none;
      }
      .btn-warning.disabled:hover,
      .btn-warning[disabled]:hover,
      fieldset[disabled] .btn-warning:hover,
      .btn-warning.disabled:focus,
      .btn-warning[disabled]:focus,
      fieldset[disabled] .btn-warning:focus,
      .btn-warning.disabled.focus,
      .btn-warning[disabled].focus,
      fieldset[disabled] .btn-warning.focus {
        background-color: #f0ad4e;
        border-color: #eea236;
      }
      .btn-warning .badge {
        color: #f0ad4e;
        background-color: #ffffff;
      }
      .btn-danger {
        color: #ffffff;
        background-color: #d9534f;
        border-color: #d43f3a;
      }
      .btn-danger:focus,
      .btn-danger.focus {
        color: #ffffff;
        background-color: #c9302c;
        border-color: #761c19;
      }
      .btn-danger:hover {
        color: #ffffff;
        background-color: #c9302c;
        border-color: #ac2925;
      }
      .btn-danger:active,
      .btn-danger.active,
      .open > .dropdown-toggle.btn-danger {
        color: #ffffff;
        background-color: #c9302c;
        border-color: #ac2925;
      }
      .btn-danger:active:hover,
      .btn-danger.active:hover,
      .open > .dropdown-toggle.btn-danger:hover,
      .btn-danger:active:focus,
      .btn-danger.active:focus,
      .open > .dropdown-toggle.btn-danger:focus,
      .btn-danger:active.focus,
      .btn-danger.active.focus,
      .open > .dropdown-toggle.btn-danger.focus {
        color: #ffffff;
        background-color: #ac2925;
        border-color: #761c19;
      }
      .btn-danger:active,
      .btn-danger.active,
      .open > .dropdown-toggle.btn-danger {
        background-image: none;
      }
      .btn-danger.disabled:hover,
      .btn-danger[disabled]:hover,
      fieldset[disabled] .btn-danger:hover,
      .btn-danger.disabled:focus,
      .btn-danger[disabled]:focus,
      fieldset[disabled] .btn-danger:focus,
      .btn-danger.disabled.focus,
      .btn-danger[disabled].focus,
      fieldset[disabled] .btn-danger.focus {
        background-color: #d9534f;
        border-color: #d43f3a;
      }
      .btn-danger .badge {
        color: #d9534f;
        background-color: #ffffff;
      }
      .btn-link {
        color: #337ab7;
        font-weight: normal;
        border-radius: 0;
      }
      .btn-link,
      .btn-link:active,
      .btn-link.active,
      .btn-link[disabled],
      fieldset[disabled] .btn-link {
        background-color: transparent;
        -webkit-box-shadow: none;
        box-shadow: none;
      }
      .btn-link,
      .btn-link:hover,
      .btn-link:focus,
      .btn-link:active {
        border-color: transparent;
      }
      .btn-link:hover,
      .btn-link:focus {
        color: #23527c;
        text-decoration: underline;
        background-color: transparent;
      }
      .btn-link[disabled]:hover,
      fieldset[disabled] .btn-link:hover,
      .btn-link[disabled]:focus,
      fieldset[disabled] .btn-link:focus {
        color: #777777;
        text-decoration: none;
      }
      .btn-lg {
        padding: 10px 16px;
        font-size: 18px;
        line-height: 1.3333333;
        border-radius: 6px;
      }
      .btn-sm {
        padding: 5px 10px;
        font-size: 12px;
        line-height: 1.5;
        border-radius: 3px;
      }
      .btn-xs {
        padding: 1px 5px;
        font-size: 12px;
        line-height: 1.5;
        border-radius: 3px;
      }
      .btn-block {
        display: block;
        width: 100%;
      }
      .btn-block + .btn-block {
        margin-top: 5px;
      }
</style>
