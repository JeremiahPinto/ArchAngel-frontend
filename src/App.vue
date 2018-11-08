<template>
  <v-app>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
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
