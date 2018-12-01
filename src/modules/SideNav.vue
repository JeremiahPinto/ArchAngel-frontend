<template>
  <v-navigation-drawer  persistent
                        fixed
                        app
                        disable-resize-watcher
                        style="background-color: var(--v-magnolia-base); padding: 64px 0 77px;"
                        v-if="user"
                        v-model="panel"
  >
    <v-toolbar fixed flat color="transparent">
      <span class="headline primary--text"> {{ projectName }} </span>
    </v-toolbar>
    <v-autocomplete solo-inverted
                    flat
                    single-line
                    hide-details
                    dark
                    cache-items
                    height="48"
                    class="mb-2"
                    label="Search for Projects"
                    prepend-inner-icon="search"
                    v-model.trim="search"
                    :items="projects"
                    item.text="name"
                    item.value="_id"
                    :loading="loadProjects"
    ></v-autocomplete>

    <v-btn  round
            large
            depressed
            color="primary"
            class="mx-4"
            v-show="isAdmin"
            :to="{ name: 'AdminDash' }"
    >
      <v-icon large dark class="magnolia--text"> supervisor_account </v-icon>
      <span style="margin: 2px 5px 0 magnolia--text"> Admin Dashboard </span>
    </v-btn>

    <v-list>
      <v-list-group no-action
                    v-for="item in items"
                    :key="item.title"
                    :prepend-icon="item.icon"
      >
        <v-list-tile slot="activator">
          <v-list-tile-content>
            <v-list-tile-title> {{ item.title }} </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <div v-if="subItem.icon === 'add'">
          <v-list-tile  v-for="subItem in item.items"
                        :key="subItem.title"
                        @click="subItem.checklistDialog = true"
          >
            <v-list-tile-action>
              <v-icon> {{ subItem.icon }} </v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title> {{ subItem.title }} </v-list-tile-title>
            </v-list-tile-content>

            <!-- <NewChecklistModal  @close="subItem.checklistDialog = false"
                                :popup="subItem.checklistDialog"
            /> -->
          </v-list-tile>
        </div>

        <div v-else>
          <v-list-tile  v-for="subItem in item.items"
                        :key="subItem.title"
                        :to="subItem.to"
          >
            <v-list-tile-action>
              <v-icon> {{ subItem.icon }} </v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title> {{ subItem.title }} </v-list-tile-title>
            </v-list-tile-content>

          </v-list-tile>
        </div>
      </v-list-group>
    </v-list>

    <v-footer fixed height=77 class="foot">
      <v-list two-line class="pa-0 foot-list">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <v-avatar
              size=40
              color="primary"
            >
              <span class="white--text title"> {{ disAvatar }} </span>
            </v-avatar>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title> {{ disName }} </v-list-tile-title>
            <v-list-tile-sub-title class="text-capitalize"> {{ disRole }} </v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn icon ripple :to="{ name: 'UserSettings' }">
              <v-icon color="primary"> settings </v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-footer>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

// const NewChecklistModal = import('@/components/Forms/Checklist/Modals/NewChecklistModal');

export default {
  props: ['drawer', 'user'],
  // components: {
  //   NewChecklistModal: () => ({
  //     component: NewChecklistModal,
  //     delay: 50,
  //     setTimeout: 3000,
  //   }),
  // },
  data() {
    return {
      search: '',
      Project: {
        projectID: '18-001',
        projectName: 'Sample Project',
      },
      items: [
        {
          icon: 'check',
          title: 'Checklist',
          items: [
            {
              icon: 'add',
              title: 'New Checklist',
              checklistDialog: false,
            },
            {
              icon: 'playlist_add_check',
              title: 'Handover Checklist',
              to: '/forms/handover_check',
            },
          ],
        },
        {
          icon: 'star',
          title: 'Feedback Form',
          items: [
            {
              icon: 'star',
              title: 'Feedback Form',
              to: '/forms/feedback_form',
            },
          ],
        },
        {
          icon: 'description',
          title: 'Report Template',
          items: [
            {
              icon: 'description',
              title: 'Report Template',
              to: '/forms/report_template',
            },
          ],
        },
        {
          icon: 'check',
          title: 'Defect List',
          items: [
            {
              icon: 'check',
              title: 'Defect List Form',
              to: '/forms/defect_list_form',
            },
          ],
        },
        {
          icon: 'card_membership',
          title: 'Cert. of Completion',
          items: [
            {
              icon: 'playlist_add_check',
              title: 'Certificate of Completion',
              to: '/forms/certificate_of_completion',
            },
          ],
        },
        {
          icon: 'check',
          title: 'Addenda Form',
          items: [
            {
              icon: 'check',
              title: 'Addenda Form',
              to: '/forms/addenda_form',
            },
          ],
        },
        {
          icon: 'error_outline',
          title: 'Defects List',
          items: [
            {
              icon: 'playlist_add_check',
              title: 'Defects List',
              to: '/forms/defects_list',
            },
          ],
        },
        {
          icon: 'check',
          title: 'Superintendent',
          items: [
            {
              icon: 'check',
              title: 'Superintendent',
              to: '/forms/Superintendent',
            },
          ],
        },
        {
          icon: 'compare_arrows',
          title: 'Handover Manual',
          items: [
            {
              icon: 'playlist_add_check',
              title: 'Handover Manual',
              to: '/forms/handover_manual',
            },
          ],
        },
        {
          icon: 'trending_up',
          title: 'Subcontract Prog. ',
          items: [
            {
              icon: 'playlist_add_check',
              title: 'Subcontract Progress Claim',
              to: '/forms/subcontract_progress_claim',
            },
          ],
        },
        {
          icon: 'check',
          title: 'Superintendent Variation',
          items: [
            {
              icon: 'check',
              title: 'Superintendent Variation',
              to: '/forms/Superintendent_Variation',
            },
          ],
        },
        {
          icon: 'check',
          title: 'Letter of Acceptance',
          items: [
            {
              icon: 'check',
              title: 'Letter of Acceptance',
              to: '/forms/Letter_of_Acceptance_Template',
            },
          ],
        },
        {
          icon: 'check',
          title: 'FFE Form',
          items: [
            {
              icon: 'check',
              title: 'FFE Form',
              to: '/forms/ffe_form',
            },
          ],
        },
        {
          title: 'Client Meeting Minutes',
          items: [
            {
              icon: 'check',
              title: 'Client Meeting Minutes',
              to: '/forms/Client_Meeting_Minutes',
            },
          ],
        },
      ],
    };
  },
  mounted() {
    this.findProjects({ query: {} });
  },
  computed: {
    ...mapState('projects', { loadProjects: 'isFindPending' }),
    ...mapGetters('projects', { findProjectsInStore: 'find' }),
    projects() {
      return this.findProjectsInStore({ query: {} }).data;
    },
    panel: {
      get() {
        return this.drawer;
      },
      set(value) {
        if (!value) {
          this.$emit('panel');
        }
      },
    },
    projectName() {
      return this.Project.projectID.concat(' ', this.Project.projectName);
    },
    isAdmin() {
      return this.user.role === 'admin';
    },
    disName() {
      return `${this.user.name.first} ${this.user.name.last}`;
    },
    disAvatar() {
      return `${this.user.name.first[0]}${this.user.name.last[0]}`;
    },
    disRole() {
      return this.user.occupation;
    },
  },
  methods: {
    ...mapActions('projects', { findProjects: 'find' }),
  },
};
</script>

<style scoped>
.v-input >>> label {
  color: var(--v-secondary-base);
}
.v-input >>> .v-input__icon--prepend-inner i {
  color: var(--v-primary-base);
}
.v-input >>> .v-input__icon--append i {
  color: #f9f3fc;
}
.foot-list {
  width: 100%;
}
.foot {
  background-color: #f8f0fb;
  border-top: 1px solid #CBC5CE;
  border-right: 1px solid #d9d2dc;
}
</style>
