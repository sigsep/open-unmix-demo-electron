<template>
  <div>
    <section class="hero is-default is-bold">
     <div class="hero-head">
       <div class="container">
         <nav class="navbar" role="navigation" >
              <div class="navbar-brand">
                <a class="navbar-item" v-on:click="openFile">
                  <img src="./assets/favicon.png" alt="SISEC"><h1 class="title is-5">{{ title }}</h1>
                </a>
              </div>
              <div class="navbar-end">
              <div class="navbar-item">
                <span class="select">
                  <select v-model="selectedTrack">
                    <option value="" selected hidden="hidden">Select Track </option>
                    <option v-for="track in tracks" v-bind:value="track" v-bind:key="track">
                      {{ track }}
                    </option>
                  </select>
                </span>
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
                <div v-if="tracklist.length == 0" class="content has-text-centered">
                  <img src="./assets/sigsep.svg" width="60%" style="margin-top: 5em" alt="sigsep">
                </div>
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
        <p v-html="tagline"></p>
     </div>
   </div>
  </footer>
</div>
</template>

<script>
import Player from './components/player/Player.vue'
import { constants } from 'crypto';

const fs = require('fs')
const path = require('path')
const { dialog } = require('electron').remote

export default {
  components: { Player },
  data: function () {
    return {
      config: {},
      title: 'no config loaded',
      tagline: 'no config loaded!',
      selectedTrack: '',
      isLoading: true,
      loaderColor: 'orange',
      file: "",
      loaderHeight: '26px'
    }
  },
  created: function () {
    this.isLoading = true
    this.selectedTrack = ''
    this.openFile()
  },
  updated: function () {
    this.isLoading = false
  },
  methods: {
    openFile() {
      let self = this;
      dialog.showOpenDialog(
        { 
          properties: ['openFile'],
          filters: [
            {
              name: "config",
              extensions: ["json"]
            }
          ]
        },
        function(fileNames) {
          if (fileNames === undefined) return;
          
          var fileName = fileNames[0];
          self.file = fileName
          const config_raw = fs.readFileSync(fileName, 'utf8')
          self.config = JSON.parse(config_raw); 
          self.title = self.config.title
          self.tagline = self.config.tagline
        }
      );
    }
  },
  computed: {
    tracks: function () {
      const audio_root = path.join(path.dirname(this.file), this.config.audiopath)
      if (name === undefined) {
        return []
      } else {
        const getDirectories = source =>
          fs.readdirSync(source, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name)
        
        return getDirectories(audio_root)
      }
    },
    tracklist: function () {
      var trackstoload = []
      if (this.selectedTrack === '') {
        return trackstoload
      } else {
        const track_root = path.join(
          path.dirname(this.file), this.config.audiopath, this.selectedTrack
        )
        const getAudios = source =>
          fs.readdirSync(source)
            .filter((dirent) => dirent.match(/\.(wav|m4a|mp4|mp3)(?:\?.*|)$/i))
            .map(dirent => dirent)
        
        const audio_files = getAudios(track_root)
        for (let file of audio_files) {
          trackstoload.push(
            { 'name': path.basename(file, path.extname(file)),
              'customClass': path.basename(file, path.extname(file)),
              'solo': false,
              'mute': false,
              'type': "audio/" + path.extname(file),
              'file': path.join(
                track_root, 
                file
              )
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
  padding-top: 0.3em;
  height: 5.0em;
}

.navbar-brand img {
  margin-right: 1em;
}
.navbar-brand {
  padding-left: 1em;
}

</style>
