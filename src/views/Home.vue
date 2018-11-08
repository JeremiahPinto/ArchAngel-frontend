<template>
  <div>
    <Toolbar/>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
const Toolbar = import('../modules/Toolbar');
const Footer = import('../modules/Footer');

export default {
  name: 'Index',
  components: {
    Toolbar: () => ({
      component: Toolbar,
      delay: 50,
      setTimeout: 3000,
    }),
    Footer: () => ({
      component: Footer,
      delay: 50,
      setTimeout: 3000,
    }),
  },
  data() {
    return {
      //
    };
  },
};
</script>
