<template>
  <span>
    <a
    v-on:click="toggleCite"
    >
    <span class="icon has-text-info info-icon">
      <i class="fa fa-question"></i>
    </span>
    </a>
   <div class="modal" v-bind:class="{ 'is-active': showCite }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Open Unmix</p>
        <button class="delete" v-on:click="toggleCite"></button>
      </header>
      <section class="modal-card-body" >
        <div class="content">
          <h3>A reference implementation for music separation</h3>
          <ul>
            <li>MIT-license</li>
            <li>pytorch, tensorflow, NNabla</li>
            <li>state-of-the-art DNN model [1]</li>
          </ul>

          <h4>Features:</h4>
          
          <ul>
            <li>clean & modular python code</li>
            <li>dataloaders for <i>musdb</i> & arbitrary wav/mp3 folders</li>
            <li>standard pre-post processing: STFT, multichannel Wiener filters, etc.</li>
            <li>pretrained baseline model trained on [2]</li>
            <li>design your net, compare with state of the art easily</li>
          </ul>

          <p>
          [1] Uhlich, Stefan, et al. "Improving music source separation based on deep neural networks through data augmentation and network blending." 2017 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP). IEEE, 2017.
          </p>
          <p>
          [2] Z. Rafii, A. Liutkus, F.-R. Stöter, S.I.  Mimilakis & R. Bittner (2017). The MUSDB18 corpus for music separation.
          </p>
        </div>
      </section>
    </div>
  </div>
    </span>
</template>

<script>
export default {
  props: {
    isActive: Boolean
  },
  data: function () {
    return {
      showCite: false,
      showBibtex: false,
    }
  },
  methods: {
    toggleCite: function() {
      this.showCite = !this.showCite
    },
    toggleBibtex: function() {
      this.showBibtex = !this.showBibtex
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

.info-icon {
  margin-top: 0.2em;
  margin-left: 4em;
  font-size: 2.5em;
}

.navbar {
    margin-top: 10px;
    z-index: 1000;
}

.modal-card-body pre {
  text-align: left;
}

.modal {
  z-index: 100000;
}

.modal-card {
  z-index: 9999;
}

.bibtex {
  background-color: #ff3860;
  color: white;
}

.bibtex pre {
  background-color: #ff3860;
  color: white;
}

</style>
