<template>
  <v-container fluid fill-height grid-list-lg>
    <v-card flat width="500"
            class="pt-3 border"
    >
      <v-img  contain
              height="250"
              :src="require('@/assets/ArchAngelLogo.png')"
      >
      </v-img>
      <v-card-text class="px-4">
        <v-form ref="form" v-model="valid">
          <v-layout row wrap>
            <v-flex xs6>
              <v-text-field outline
                            label="First Name"
                            :disabled="loading"
                            :rules="[validation.required]"
                            v-model.trim="user.name.first"
              ></v-text-field>
            </v-flex>

            <v-flex xs6>
              <v-text-field outline
                            label="Last Name"
                            :disabled="loading"
                            :rules="[validation.required]"
                            v-model.trim="user.name.last"
              ></v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-text-field outline
                            label="Password"
                            :disabled="loading"
                            :rules="[validation.required, validation.min,
                            validation.upper, validation.lower, validation.digit]"
                            v-model.trim="user.password"
                            :append-icon="show ? 'visibility_off' : 'visibility'"
                            :type="show ? 'text' : 'password'"
                            @click:append="show = !show"
              ></v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-text-field outline
                            label="Confirm Password"
                            :disabled="loading"
                            :rules="[validation.required, validation.confirmPass]"
                            v-model.trim="conPassword"
                            :append-icon="show ? 'visibility_off' : 'visibility'"
                            :type="show ? 'text' : 'password'"
                            @click:append="show = !show"
              ></v-text-field>
            </v-flex>

            <v-flex xs12 v-show="showDismissibleAlert">
              <v-alert  dismissible
                        outline
                        color="error"
                        icon="warning"
                        v-model="showDismissibleAlert"
              >
                {{ error }}
              </v-alert>
            </v-flex>

            <v-flex xs12>
              <v-btn  color="primary"
                      class="white--text ma-0 mt-1"
                      :disabled="!valid || loading"
                      :loading="loading"
                      :style="{ float: 'right' }"
                      @click.stop.prevent="register"
              >
                Register
              </v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data(vm) {
    return {
      showDismissibleAlert: false,
      user: {
        name: {
          first: '',
          last: '',
        },
        password: '',
      },
      conPassword: '',
      error: '',
      show: false,
      valid: false,
      validation: {
        required: value => !!value || 'This field is required',
        min: value => value.length >= 8 || 'Must be at least 8 characters',
        upper: value => (/[A-Z]/.test(value)) || 'Must contain at least 1 uppercase letter',
        lower: value => (/[a-z]/.test(value)) || 'Must contain at least 1 lowercase letter',
        digit: value => (/\d/.test(value)) || 'Must contain at least 1 digit',
        confirmPass: value => vm.user.password === value || 'Passwords do not match',
      },
    };
  },
  computed: {
    ...mapState('users', { loading: 'isCreatePending' }),
  },
  methods: {
    register() {
      if (this.valid) {
        const { User } = this.$FeathersVuex;
        const user = new User(this.user);
        user.patch()
          .then(() => {
            this.$router.push('/'); // need to change later
          });
      }
    },
  },
};
</script>

<style scoped>
.border {
  border: 1.5px solid #e0e0e0;
  margin: 0 auto;
}
</style>
