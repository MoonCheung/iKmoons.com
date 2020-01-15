<template>
  <div id="particles-bg"
       class="hero">
    <v-navbar class="hero-head" />
    <main class="hero-body">
      <article class="container">
        <!-- TODO: 切换其他页面时候有存在Bug,待处理 -->
        <!-- <nuxt keep-alive /> -->
        <nuxt />
        <v-aside v-if="!noAsidePage" />
      </article>
    </main>
    <v-footer class="hero-foot" />
  </div>
</template>

<script>
import VNavbar from './Navbar/index';
import VFooter from './Footer/index';
import VAside from './Sidebar/index';

export default {
  name: 'PcIndex',
  components: {
    VNavbar,
    VFooter,
    VAside
  },
  computed: {
    noAsidePage () {
      return ['about'].includes(this.$route.name);
    }
  },
  mounted () {
    this.getGranules();
  },
  methods: {
    getGranules () {
      particlesJS('particles-bg', {
        "particles": {
          "number": {
            "value": 160,
            "density": {
              "enable": true,
              "value_area": 800
            }
          },
          "color": {
            "value": "#bfbfbf"
          },
          "shape": {
            "type": "circle",
            "stroke": {
              "width": 0,
              "color": "#000000"
            },
            "polygon": {
              "nb_sides": 6
            },
            "image": {
              "src": "img/github.svg",
              "width": 100,
              "height": 100
            }
          },
          "opacity": {
            "value": 1,
            "random": true,
            "anim": {
              "enable": true,
              "speed": 1,
              "opacity_min": 0,
              "sync": false
            }
          },
          "size": {
            "value": 8,
            "random": true,
            "anim": {
              "enable": false,
              "speed": 0.4,
              "size_min": 0.3,
              "sync": false
            }
          },
          "line_linked": {
            "enable": false,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 1,
            "direction": "none",
            "random": true,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
              "enable": false,
              "rotateX": 600,
              "rotateY": 600
            }
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": false,
              "mode": "repulse"
            },
            "onclick": {
              "enable": false,
              "mode": "repulse"
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 400,
              "line_linked": {
                "opacity": 1
              }
            },
            "bubble": {
              "distance": 250,
              "size": 0,
              "duration": 2,
              "opacity": 0,
              "speed": 3
            },
            "repulse": {
              "distance": 400,
              "duration": 0.4
            },
            "push": {
              "particles_nb": 4
            },
            "remove": {
              "particles_nb": 2
            }
          }
        },
        "retina_detect": true
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.hero {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;

  &-head,
  &-foot {
    width: 100%;
  }

  &-body {
    flex: 1 0 58em;
    margin-top: 3.25rem;
    padding: 1.429rem 0;

    & > .container {
      display: flex;
      margin: 0 auto;
      position: relative;
      width: $width-size;
      justify-content: flex-start;

      .about {
        & + .aside {
          display: none;
        }
      }
    }
  }
}
</style>
