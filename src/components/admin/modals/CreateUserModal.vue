<template>
  <v-dialog
    scrollable
    max-width="500px"
    v-model="showDialog"
    :fullscreen="$vuetify.breakpoint.xsOnly"
    transition="dialog-transition"
  >
    <v-card tile>
      <v-toolbar flat color="magnolia">
        <strong class="headline primary--text"> Add User </strong>
        <v-spacer/>
        <v-btn icon @click="$emit('close')">
          <v-icon> close </v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text class="px-4">
        <v-form ref="form" v-model="valid">
          <v-container grid-list-sm class="pa-0 pt-4">
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field outline
                              label="Email"
                              :disabled="loading"
                              :rules="[validation.required, validation.email]"
                              v-model.trim="user.email"
                              class="mb-2"
                ></v-text-field>
              </v-flex>

              <v-flex xs6 class="pl-4">
                <v-radio-group  hide-details
                                label="Occupation"
                                class="ml-1"
                                :disabled="loading"
                                v-model="user.occupation"
                >
                  <v-radio  label="Client"
                            color="primary"
                            value="client"
                            class="ml-2"
                  ></v-radio>
                  <v-radio  label="Consultant"
                            color="primary"
                            value="consultant"
                            class="ml-2"
                  ></v-radio>
                  <v-radio  label="Contractor"
                            color="primary"
                            value="contractor"
                            class="ml-2"
                  ></v-radio>
                  <v-radio  label="Staff"
                            color="primary"
                            value="staff"
                            class="ml-2"
                  ></v-radio>
                </v-radio-group>
              </v-flex>

              <v-flex xs6 class="pl-4">
                <v-radio-group  hide-details
                                label="Role"
                                class="ml-1"
                                :disabled="loading"
                                v-model="user.role"
                >
                  <v-radio  label="Administrator"
                            color="primary"
                            value="admin"
                            class="ml-2"
                  ></v-radio>
                  <v-radio  label="User"
                            color="primary"
                            value="user"
                            class="ml-2"
                  ></v-radio>
                </v-radio-group>
              </v-flex>
            </v-layout>
          </v-container>

          <v-alert  dismissible
                    outline
                    color="error"
                    icon="warning"
                    v-model="showDismissibleAlert"
          >
            {{ error }}
          </v-alert>

          <v-btn  flat
                  color="primary"
                  class="white--text ma-0 mt-1"
                  :loading="loading"
                  :disabled="!valid || loading"
                  style="float: right;"
                  @click.stop.prevent="register"
          >
            Send Invite
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: ['popup'],
  data() {
    return {
      showDismissibleAlert: false,
      user: {
        email: '',
        occupation: 'staff',
        role: 'user',
      },
      error: '',
      valid: false,
      validation: {
        required: value => !!value || 'This field is required',
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || 'Invalid email';
        },
      },
    };
  },
  computed: {
    ...mapState('users', { loading: 'isCreatePending' }),
    showDialog: {
      get() {
        return this.popup;
      },
      set(value) {
        if (!value) {
          this.$emit('close');
        }
      },
    },
  },
  methods: {
    register() {
      if (this.valid) {
        const { User } = this.$FeathersVuex;
        const user = new User(this.user);
        user.create()
          .then(() => {
            this.$emit('close');
          })
          .catch((err) => {
            this.error = err.message.charAt(0).toUpperCase().concat(err.message.slice(1));
            this.showDismissibleAlert = true;
          });
      }
    },
  },
};
</script>
