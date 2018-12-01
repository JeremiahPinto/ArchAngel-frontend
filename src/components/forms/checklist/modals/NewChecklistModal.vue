<template>
  <v-dialog scrollable
            max-width="500px"
            v-model="showDialog"
            :fullscreen="$vuetify.breakpoint.xsOnly"
            transition="dialog-transition"
  >
    <v-card tile>
      <v-toolbar flat color="magnolia">
        <strong class="headline primary--text"> Create New Checklist </strong>
        <v-spacer/>
        <v-btn icon @click="$emit('close')">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text class="px-4">
        <v-form ref="form" v-model="valid">
          <v-container grid-list-sm class="pa-0 pt-4">
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field outline
                              class="mb-4"
                              label="Checklist Title"
                              :rules="[validation.required]"
                              v-model.trim="list.title"
                ></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field outline
                              label="Checklist Subtitle"
                              :rules="[validation.required]"
                              v-model.trim="list.checklist"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>

          <v-btn  flat
                  color="primary"
                  class="white--text ma-0"
                  :disabled="!valid"
                  style="float: right;"
                  @click.stop.prevent="login"
          >
            Create
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  props: ['popup'],
  data() {
    return {
      list: {
        title: '',
        checklist: '',
      },
      valid: false,
      validation: {
        required: value => !!value || 'Required.',
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
