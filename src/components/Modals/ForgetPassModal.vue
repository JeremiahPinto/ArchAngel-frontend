<template>
  <v-dialog scrollable
            max-width=520
            v-model="showDialog"
            :fullscreen="$vuetify.breakpoint.xsOnly"
            transition="dialog-transition"
  >
    <v-card tile>
      <v-toolbar flat color="white">
        <h3 class="headline secondary--text"> Forgot Password? </h3>
        <v-spacer/>
        <v-btn flat icon color="secondary" @click="$emit('close')">
          <v-icon> close </v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text class="px-4">
        <v-text-field outline
                      persistent-hint
                      label="Email Address"
                      hint="Enter your registered email address"
                      v-model.trim="email"
        >
        </v-text-field>

        <v-btn  flat
                color="primary"
                class="ma-0"
                style="float: right"
                @click.stop.prevent=""
        >
          Submit
        </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['popup'],
  data() {
    return {
      email: '',
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
};
</script>
