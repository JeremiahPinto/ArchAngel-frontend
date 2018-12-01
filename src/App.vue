<template>
  <v-app>
    <Toolbar @panel="sidepanel = !sidepanel" :drawer="sidepanel" :user="user"/>
    <Sidebar @panel="sidepanel = false" :drawer="sidepanel" :user="user"/>
    <v-content style="background-color: white;">
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
const Toolbar = import('./modules/Toolbar');
const Sidebar = import('./modules/Sidebar');
// const Footer = import('./modules/Footer');

export default {
  name: 'App',
  components: {
    Toolbar: () => ({
      component: Toolbar,
      delay: 50,
      setTimeout: 3000,
    }),
    Sidebar: () => ({
      component: Sidebar,
      delay: 50,
      setTimeout: 3000,
    }),
    // Footer: () => ({
    //   component: Footer,
    //   delay: 50,
    //   setTimeout: 3000,
    // }),
  },
  data() {
    return {
      sidepanel: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
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
.v-messages__message {
  height: 15px;
}
</style>
