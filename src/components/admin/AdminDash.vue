<template>
  <v-container fill-height grid-list-xl fluid class="px-5 pb-5 background">
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1 md8 offset-md2 lg6 offset-lg3 class="my-4 pt-4 pb-5">
        <v-card flat
                tile
                max-height=250
                color="rgba(255, 255, 255, 0.8)"
                class="pa-5"
                style="margin: 0 auto;"
        >
          <v-img  contain
                  max-height="125"
                  class="ma-3"
                  transition="slide-x-transition"
                  :src="require('@/assets/actusLogo.png')"
          ></v-img>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 offset-lg1 lg4>
        <v-card flat class="border">
          <v-card-title primary-title>
            <div style="margin: 0 auto;">
              <h3 class="headline mb-0"> Users </h3>
            </div>
          </v-card-title>

          <v-list three-line class="pb-0">
            <template v-for="(item,index) in UserItems">
              <v-divider  v-if="index < UserItems.length"
                          :key="index"
              >
              </v-divider>
              <v-list-tile  avatar
                            ripple
                            :key="item.name"
                            :to="item.to"
                            @click="dialog = createUser(item.name)"
              >
                <v-list-tile-action>
                  <v-icon large color="primary">
                    {{ item.icon }}
                  </v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                  <v-list-tile-title>
                    {{ item.name }}
                  </v-list-tile-title>

                  <v-list-tile-sub-title>
                    {{ item.subtext }}
                  </v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
        </v-card>
      </v-flex>

      <v-flex xs12 sm6 offset-lg2 lg4 class="text-xs-center">
        <v-card flat class="border">
          <v-card-title primary-title>
            <div style="margin: 0 auto;">
              <h3 class="headline mb-0"> Projects </h3>
            </div>
          </v-card-title>

          <v-list three-line class="pb-0">
            <template v-for="(item,index) in ProjectItems">
              <v-divider  v-if="index < ProjectItems.length"
                          :key="index"
              >
              </v-divider>
              <v-list-tile  avatar
                            ripple
                            :key="item.name"
                            :to="item.to"
              >
                <v-list-tile-action>
                  <v-icon large color="primary">
                    {{ item.icon }}
                  </v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                  <v-list-tile-title>
                    {{ item.name }}
                  </v-list-tile-title>

                  <v-list-tile-sub-title>
                    {{ item.subtext }}
                  </v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
          <CreateUserModal @close="dialog = false" :popup="dialog"/>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
const CreateUserModal = import('./modals/CreateUserModal');

export default {
  components: {
    CreateUserModal: () => ({
      component: CreateUserModal,
      delay: 50,
      setTimeout: 3000,
    }),
  },
  data() {
    return {
      dialog: false,
      UserItems: [{
        name: 'Add User',
        subtext: 'Send invites to new users',
        icon: 'person_add',
      }, {
        name: 'View Users',
        subtext: 'View all our users and the projects assigned to them',
        icon: 'people',
        to: { name: 'ViewUsers' },
      }],
      ProjectItems: [{
        name: 'New Project',
        subtext: 'Create a new project',
        icon: 'add_box',
        to: { name: 'NewProject' },
      }, {
        name: 'View Projects',
        subtext: 'View all our projects and edit a project if needed',
        icon: 'assignment',
        to: 'CreateUser',
      }],
    };
  },
  methods: {
    createUser(name) {
      return name === 'Add User';
    },
  },
};
</script>

<style scoped>
.border {
  border: 1.5px solid #e0e0e0;
}
.background {
  background-image: url("../../assets/Dash_Background.jpg"); /* The image used */
  background-color: #fff; /* Used if the image is unavailable */
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */
}
</style>
