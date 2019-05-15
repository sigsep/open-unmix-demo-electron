<template>
  <div>
    <div class="ribbon ribbon-top-right"><span>Release soon!</span></div>
    <section class="hero is-default is-bold">
     <div class="hero-head">
       <div class="container">
         <nav class="navbar" role="navigation" >
            <div class="navbar-brand">
               <a class="navbar-item" href="/">
                <img src="./assets/favicon.png" alt="SISEC"><h1 class="title is-5">open.unmix.app</h1>
               </a>
               <a role="button" class="navbar-burger" @click="showNav = !showNav" :class="{ 'is-active': showNav }" aria-label="menu" aria-expanded="false">
                 <span aria-hidden="true"></span>
                 <span aria-hidden="true"></span>
                 <span aria-hidden="true"></span>
               </a>
             </div>
            <main-menu :isActive="showNav"></main-menu>
         </nav>
       </div>
     </div>
     <div>
       <div class="container">
         <unmix></unmix>
       </div>
     </div>
   </section>
   <footer class="footer">
   <div class="container">
     <div class="content has-text-centered">
          <p><i>Open Unmix</i>: an open source music separation baseline for PyTorch, Tensorflow and NNabla.</p>
       <p>
         <span class="logo ">
           <a href="http://www.inria.fr">
             <img class='inria' src="./assets/logo_INRIA.png" alt="Inria" height="80px" width="80px">
           </a>
         </span>
         <span class="logo">
           <a href="http://www.sony.com">
             <img src="./assets/sony.jpeg" alt="Sony" width="80px">
           </a>
         </span>

       </p>
     </div>
   </div>
  </footer>
</div>
</template>

<script>
import MainMenu from './components/Menu.vue'
import Unmix from './components/Unmix.vue'

export default {
  components: { MainMenu, Unmix },
  data: function () {
    return {
      showNav: false
    }
  }
}
</script>

<style>

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
  height: 10em;
  background-color: #000000!important;
}

.logo {
  margin-right: 2em; 
}

.navbar-brand img {
  margin-right: 1em;
}
.navbar-brand {
  padding-left: 1em;
}

   @import url(https://fonts.googleapis.com/css?family=Lato:700);

/* common */
.ribbon {
  width: 150px;
  height: 150px;
  overflow: hidden;
  position: absolute;
}
.ribbon::before,
.ribbon::after {
  position: absolute;
  z-index: 1000;
  content: '';
  display: block;
  border: 5px solid #2980b9;
}
.ribbon span {
  position: absolute;
  display: block;
  width: 225px;
  padding: 15px 0;
  background-color: #3498db;
  box-shadow: 0 5px 10px rgba(0,0,0,.1);
  color: #fff;
  font: 700 14px/1 'Lato', sans-serif;
  text-shadow: 0 1px 1px rgba(0,0,0,.2);
  text-transform: uppercase;
  text-align: center;
}

/* top left*/
.ribbon-top-left {
  top: -10px;
  left: -10px;
}
.ribbon-top-left::before,
.ribbon-top-left::after {
  border-top-color: transparent;
  border-left-color: transparent;
}
.ribbon-top-left::before {
  top: 0;
  right: 0;
}
.ribbon-top-left::after {
  bottom: 0;
  left: 0;
}
.ribbon-top-left span {
  right: -25px;
  top: 30px;
  transform: rotate(-45deg);
}

/* top right*/
.ribbon-top-right {
  top: -10px;
  right: -10px;
}
.ribbon-top-right::before,
.ribbon-top-right::after {
  border-top-color: transparent;
  border-right-color: transparent;
}
.ribbon-top-right::before {
  top: 0;
  left: 0;
}
.ribbon-top-right::after {
  bottom: 0;
  right: 0;
}
.ribbon-top-right span {
  left: -25px;
  top: 30px;
  transform: rotate(45deg);
}

/* bottom left*/
.ribbon-bottom-left {
  bottom: -10px;
  left: -10px;
}
.ribbon-bottom-left::before,
.ribbon-bottom-left::after {
  border-bottom-color: transparent;
  border-left-color: transparent;
}
.ribbon-bottom-left::before {
  bottom: 0;
  right: 0;
}
.ribbon-bottom-left::after {
  top: 0;
  left: 0;
}
.ribbon-bottom-left span {
  right: -25px;
  bottom: 30px;
  transform: rotate(225deg);
}

/* bottom right*/
.ribbon-bottom-right {
  bottom: -10px;
  right: -10px;
}
.ribbon-bottom-right::before,
.ribbon-bottom-right::after {
  border-bottom-color: transparent;
  border-right-color: transparent;
}
.ribbon-bottom-right::before {
  bottom: 0;
  left: 0;
}
.ribbon-bottom-right::after {
  top: 0;
  right: 0;
}
.ribbon-bottom-right span {
  left: -25px;
  bottom: 30px;
  transform: rotate(-225deg);
}
</style>
