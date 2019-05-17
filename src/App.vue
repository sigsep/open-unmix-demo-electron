<template>
  <div>
    <section class="hero is-default is-bold">
     <div class="hero-head">
       <div class="container">
         <nav class="navbar" role="navigation" >
              <div class="navbar-brand">
                <a class="navbar-item" href="/">
                  <img src="./assets/favicon.png" alt="SISEC"><h1 class="title is-5">open.unmix.app</h1>
                </a>
              </div>
              <div class="navbar-end">
              <div class="navbar-item">
                <span class="select">
                  <select v-model="selectedTrack">
                    <option v-for="track in tracks" v-bind:value="track.path" v-bind:key="track.name">
                      {{ track.name }}
                    </option>
                  </select>
                </span>
              </div>
              <div class="navbar-item">
                <main-menu></main-menu>
              </div>
            </div>
         </nav>
       </div>
     </div>
   </section>
   <section>
      <div>
       <div class="container">
           <section>
            <div>
              <div class="column is-narrow">
                  <div v-if="tracklist.length > 0">
                      <div>
                        <player :urls="tracklist" :title="selectedTrack"></player>
                          <div class="keyboard">
                          <b>Keyboard Shortcuts</b>: Play/Pause: <kbd>Space</kbd> – Solo/Unsolo Sources: <kbd>1</kbd> <kbd>2</kbd> <kbd>3</kbd> <kbd>4</kbd> – Mute/Unmute Sources: <kbd>Ctrl</kbd> + <kbd>1</kbd> <kbd>2</kbd> <kbd>3</kbd> <kbd>4</kbd>                         
                        </div>
                    </div>
                  </div>
              </div>
            </div>
          </section>
            

       </div>
     </div>

   </section>
   <footer class="footer">
   <div class="container">
     <div class="content has-text-centered">
        <p><i>Open Unmix</i>: an open source music separation baseline for PyTorch, Tensorflow and NNabla.</p>
     </div>
   </div>
  </footer>
</div>
</template>

<script>
import Player from './components/player/Player.vue'
import MainMenu from './components/Menu.vue'

const fs = require('fs')
const path = require('path')
import { remote } from 'electron'
const config_raw = fs.readFileSync(path.join(remote.app.getAppPath(), 'config.json'), 'utf8')
let config = JSON.parse(config_raw); 

export default {
  components: { MainMenu, Player },
  data: function () {
    return {
      data: [],
      tracks: [],
      selectedTrack: '',
      isLoading: true,
      loaderColor: 'orange',
      loaderHeight: '26px'

    }
  },
  created: function () {
    this.isLoading = true
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
                this.selectedTrack, this.selectedTrack + '_' + target,
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
$widescreen-enabled: false;
$fullhd-enabled: false;
$navbar-breakpoint: 414px;

@mixin my-touch {
  @media screen and (max-width: $navbar-breakpoint - 1px) {
    @content;
  }
}

@mixin my-desktop {
  @media screen and (min-width: $navbar-breakpoint) {
    @content;
  }
}
@import "~bulmaswatch/darkly/_variables.scss";
@import "~bulma";
@import "~bulmaswatch/darkly/_overrides.scss";
</style>

<style>
#player {
  margin-bottom: 10px;
}

.keyboard {
  opacity: 0.5;
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

.inria {
  padding-bottom: 2em;
}

.footerdesc {
  position: absolute;
  font-size: 9px;
}

.container {
  margin-top: 0;
}

footer.footer {
  padding: 0;
  padding-top: 1em;
  height: 3.5em;
  background-color: #000000!important;
}

.footer {
  position: absolute;
  bottom: 0px;
  width: 100%;
  z-index: 1000;
}

.footer .container .content{
  font-size: 1.2em;
}
.logo {
  margin-right: 2em; 
}

.hero {
  height: 5.5em;
}

.navbar-brand img {
  margin-right: 1em;
}
.navbar-brand {
  padding-left: 1em;
}

</style>
