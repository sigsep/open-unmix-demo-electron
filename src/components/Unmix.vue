<template>
  <section>
      <div class="columns is-centered">
        <div class="column is-narrow">
          <div class="control-label">
            <label id='track-label' class="label">Select Track</label>
          </div>
          <p class="control has-addons has-addons-centered">
            <span class="select">
              <select v-model="selectedTrack">
                <option v-for="track in tracks" v-bind:value="track.path" v-bind:key="track.name">
                  {{ track.name }}
                </option>
              </select>
            </span>
          </p>
        </div>
    </div>
    <div>
      <div class="column is-narrow">
        <transition name="slide-fade">
          <div v-if="tracklist.length > 0">
              <div>
                <player :urls="tracklist" :title="selectedTrack"></player>
                  <div class="keyboard">
                  <b>Keyboard Shortcuts</b>: Play/Pause: <kbd>Space</kbd> – Solo/Unsolo Sources: <kbd>1</kbd> <kbd>2</kbd> <kbd>3</kbd> <kbd>4</kbd> – Mute/Unmute Sources: <kbd>Ctrl</kbd> + <kbd>1</kbd> <kbd>2</kbd> <kbd>3</kbd> <kbd>4</kbd>
                </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>

<script>
import Player from './player/Player.vue'

const fs = require('fs')
const path = require('path')
const config_raw = fs.readFileSync(path.join(__static, 'config.json'), 'utf8')
let config = JSON.parse(config_raw); 

export default {
  name: 'unmix',
  components: {
    Player
  },
  data: function () {
    return {
      data: [],
      tracks: [],
      selectedMethod: 'popular',
      selectedTrack: '',
      isLoading: true,
      loaderColor: 'orange',
      loaderHeight: '26px'
    }
  },
  created: function () {
    this.isLoading = true
    this.selectedMethod = "popular"
    this.selectedTrack = ''
  },
  updated: function () {
    this.isLoading = false
  },
  mounted: function () {
    this.tracks = config.tracks
  },
  computed: {
    tracklist: function () {
      var trackstoload = []
      if (this.selectedTrack === '') {
        return trackstoload
      } else {
        for (let target of config.targets) {
          trackstoload.push(
            { 'name': target,
              'customClass': target,
              'solo': false,
              'mute': false,
              'file': [
                this.selectedMethod, this.selectedTrack, this.selectedTrack + '_' + target,
              ].join('/') + '.wav'
            }
          )
        }
      return trackstoload
      }
    }
  },
}
</script>

<style lang="scss">
@import "~bulmaswatch/darkly/_variables.scss";
@import "~bulma";
@import "~bulmaswatch/darkly/_overrides.scss";
</style>

<style>

#player {
  margin-bottom: 10px;
}

.keyboard {
  font-size: 0.8em;
}

kbd {
    color: black;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0.1em 0.5em;
    margin: 0 0.2em;
    box-shadow: 0 1px 0px rgba(0, 0, 0, 0.2), 0 0 0 2px #fff inset;
    background-color: #f7f7f7;
}

#title {
  margin-top: 20px;
}

#d3container {
  margin-top: -1em;
}

.hide {
  opacity: 0;
}

text.method_label.active {
  fill: orange;
}

.grid text.track_label.active {
  fill: red;
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-active {
  opacity: 0;
}

</style>
