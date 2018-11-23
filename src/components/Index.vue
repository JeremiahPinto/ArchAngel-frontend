<template>
  <v-container fluid fill-height style="background: linear-gradient(0deg, #6000ff, #8075ff);">
    <v-layout align-center justify-center fill-height>
      <v-card tile
              width="500"
              max-height="675"
              class="py-5 elevation-10"
      >
        <v-img  contain
                height="250"
                :src="require('@/assets/ArchAngelLogo.png')"
        ></v-img>
        <v-card-text class="px-4">
          <v-form ref="form" v-model="valid" @keyup.native.enter="valid && login($event)">
            <v-text-field outline
                          color="primary"
                          label="Email"
                          :disabled="loading"
                          :rules="[validation.required, validation.email]"
                          v-model.trim="user.email"
                          class="mb-2"
            ></v-text-field>

            <v-text-field outline
                          color="primary"
                          label="Password"
                          :disabled="loading"
                          :rules="[validation.required, validation.min]"
                          v-model="user.password"
                          :append-icon="show ? 'visibility_off' : 'visibility'"
                          :type="show ? 'text' : 'password'"
                          @click:append="show = !show"
                          class="mb-2"
            ></v-text-field>

            <v-alert  dismissible
                      outline
                      color="error"
                      icon="warning"
                      v-model="showDismissibleAlert"
            >
              {{ error }}
            </v-alert>
            <div class="mt-2">
              <v-btn  flat
                      color="secondary"
                      :disabled="loading"
                      style="float: left; padding: 0 7px; margin: 0"
                      @click.stop.prevent="forgetPassDialog = true"
              >
                Forgot Your Password?
              </v-btn>
              <ForgetPassModal @close="forgetPassDialog = false" :popup="forgetPassDialog"/>
              <v-btn  depressed
                      color="primary"
                      class="white--text ma-0"
                      :disabled="!valid || loading"
                      :loading="loading"
                      style="float: right;"
                      @click.stop.prevent="login"
              >
                Login
              </v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

const ForgetPassModal = import('./Modals/ForgetPassModal');

export default {
  components: {
    ForgetPassModal: () => ({
      component: ForgetPassModal,
      delay: 50,
      setTimeout: 3000,
    }),
  },
  data() {
    return {
      showDismissibleAlert: false,
      forgetPassDialog: false,
      user: {
        email: '',
        password: '',
      },
      error: '',
      show: false,
      valid: false,
      validation: {
        required: value => !!value || 'This field is required',
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || 'Invalid email';
        },
        min: value => value.length >= 8 || 'Must be at least 8 characters',
      },
    };
  },
  computed: {
    ...mapState('auth', { loading: 'isAuthenticatePending' }),
  },
  methods: {
    ...mapActions('auth', ['authenticate']),
    async login() {
      if (this.valid) {
        await this.authenticate({
          strategy: 'local',
          ...this.user,
        }).then(async () => {
          await this.authenticate();
          // logged in
          this.$router.push({ name: 'Dashboard' }); // eslint-disable-line
        }).catch(async (e) => {
          // Error on page
          this.showDismissibleAlert = true;
          this.error = e.message;
        });
      }
    },
  },
};
</script>

<style scoped>
.v-card {
  border-radius: 4%;
}
</style>
