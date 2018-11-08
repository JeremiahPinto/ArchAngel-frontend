<template>
  <v-toolbar app flat color="white">
    <v-toolbar-side-icon  flat
                          v-show="user"
                          color="secondary"
                          @click="$emit('panel')"
    ></v-toolbar-side-icon>

    <v-divider  inset
                vertical
                class="mx-2"
                v-show="user"
    />

    <v-toolbar-items>
      <v-btn  flat
              exact
              color="secondary"
              style="font-size: 17px;"
              :to="{ name: 'Index' }"
      >
        Arch Angel
      </v-btn>
    </v-toolbar-items>

    <v-spacer/>

    <v-toolbar-items v-show="user">
      <v-btn flat color="secondary" @click="logout"> Logout </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: ['drawer', 'user'],
  methods: {
    ...mapActions('auth', { authLogout: 'logout' }),
    logout() {
      this.authLogout()
        .then(() => {
          this.$router.push('/');
        });
    },
  },
};
</script>

<style scoped>
.v-toolbar >>> .v-toolbar__content {
  border-bottom: 1px solid #e8eaed;
}
</style>
