<template>
  <v-dialog scrollable
            max-width="480px"
            v-model="showDialog"
            :fullscreen="$vuetify.breakpoint.xsOnly"
            transition="dialog-transition"
  >
    <v-card tile>
      <v-card-text class="px-4">
        <v-text-field outline
                      persistent
                      persistent-hint
                      label="Password"
                      hint="Enter your password to confirm changes"
                      :disabled="loading"
                      :rules="[validation.required, validation.confirmPass]"
                      v-model.trim="password"
                      :append-icon="show ? 'visibility_off' : 'visibility'"
                      :type="show ? 'text' : 'password'"
                      @click:append="show = !show"
        >
        </v-text-field>

        <v-btn  flat
                color="primary"
                class="ma-0"
                :style="{ float: 'right' }"
                @click.stop.prevent="confirm()"
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
  data(vm) {
    return {
      password: '',
      validation: {
        required: value => !!value || 'This field is required',
        confirmPass: value => vm.User.password === value || 'Passwords do not match',
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
  methods: {
    confirm() {
      const { User } = this.$FeathersVuex;
      const user = new User(this.user);
      user.save()
        .then(() => {
          this.$router.push('/'); // need to change later
        });
    },
  },
};
</script>

<style>
</style>
