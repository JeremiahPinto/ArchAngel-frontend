<template>
  <v-container fill-height fluid class="background">
    <v-layout align-center justify-center fill-height>
      <v-flex xs10 md8 lg6>
        <v-card flat tile max-height="250" color="rgba(255, 255, 255, 0.8)" class="pa-5">
          <v-img  contain
                  max-height="125"
                  class="ma-3"
                  transition="slide-x-transition"
                  :src="require('@/assets/actusLogo.png')"
          ></v-img>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style scoped>
.background {
  background-image: url("../assets/Dash_Background.jpg"); /* The image used */
  background-color: #fff; /* Used if the image is unavailable */
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */
}
</style>
