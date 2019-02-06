<template>
  <section class="container">
    <div>
      <logo />
      <p>Hello {{ name }}</p>
      <nuxt-link to="/about">
        About-Page
      </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  asyncData(){
    return new Promise((resolve) =>{
      setTimeout(function(){
        resolve({ name: 'world'})
      },1000)
    })
  }
}
</script>




