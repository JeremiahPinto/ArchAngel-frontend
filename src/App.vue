<template>
  <v-app>
    <Toolbar/>
    <v-content>
      <router-view/>
    </v-content>
    <Footer/>
  </v-app>
</template>

<script>
const Toolbar = import('./modules/Toolbar');
const Footer = import('./modules/Footer');

export default {
  name: 'App',
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

<style>
@font-face {
  font-family: "Calibri Light", Roboto, sans-serif,
                "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  src: local("Calibri Light"), url("assets/fonts/ateneSCiAnDIsTaTEwimeNSto.woff") format("woff");
  font-weight: normal;
  font-style: normal;
}
</style>
