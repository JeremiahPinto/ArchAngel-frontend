<template>
  <v-navigation-drawer  persistent
                        fixed
                        app
                        disable-resize-watcher
                        v-show="user"
                        v-model="panel"
                        class="panel"
  >
    <v-toolbar flat color="transparent">
      <span class="headline primary--text"> {{ projectName }} </span>
    </v-toolbar>

    <v-autocomplete solo-inverted
                    flat
                    single-line
                    hide-details
                    dark
                    cache-items
                    return-object
                    height="48"
                    class="mb-1"
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
            class="adminBtn"
            v-show="isAdmin"
            :to="{ name: 'AdminDash' }"
    >
      <v-icon large dark class="magnolia--text"> supervisor_account </v-icon>
      <span style="margin: 2px 5px 0 magnolia--text"> Admin Dashboard </span>
    </v-btn>

    <v-list class="pb-0">
      <v-list-group no-action
                    v-for="form in forms"
                    :key="form.title"
                    :prepend-icon="form.icon"
      >
        <v-list-tile slot="activator">
          <v-list-tile-content>
            <v-list-tile-title> {{ form.title }} </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile  @click="form.items[0].dialog = true"
        >
          <v-list-tile-action>
            <v-icon> {{ form.items[0].icon }} </v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title> {{ form.items[0].title }} </v-list-tile-title>
          </v-list-tile-content>

          <NewChecklistModal  @close="form.items[0].dialog = false"
                              :popup="form.items[0].dialog"
          />
        </v-list-tile>

        <v-list-tile  :to="form.items[1].to"
        >
          <v-list-tile-action>
            <v-icon> {{ form.items[1].icon }} </v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title> {{ form.items[1].title }} </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      </v-list-group>
    </v-list>

    <v-footer height=77 class="foot">
      <v-list two-line class="pa-0 foot-list">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <v-avatar size=40 color="primary">
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

const NewChecklistModal = import('@/components/forms/checklist/modals/NewChecklistModal');

export default {
  props: ['drawer', 'user'],
  components: {
    NewChecklistModal: () => ({
      component: NewChecklistModal,
      delay: 50,
      setTimeout: 3000,
    }),
  },
  data() {
    return {
      Project: {
        id: '18-001',
        name: 'Sample Project',
      },
      forms: [
        {
          icon: '',
          title: 'Addenda Form',
          items: [
            {
              icon: 'add',
              title: 'New Addenda Form',
              dialog: false,
            },
            {
              icon: 'view_list',
              title: 'All Addenda Forms',
              to: '/forms/addenda_form',
            },
          ],
        },
        {
          icon: 'card_membership',
          title: 'Certificate of Completion',
          items: [
            {
              icon: 'add',
              title: 'New Certificate',
              dialog: false,
            },
            {
              icon: 'view_list',
              title: 'All Certificates',
              to: '/forms/certificate_of_completion',
            },
          ],
        },
        {
          icon: 'check',
          title: 'Checklist',
          items: [
            {
              icon: 'add',
              title: 'New Checklist',
              dialog: false,
            },
            {
              icon: 'view_list',
              title: 'All Checklists',
              to: '/forms/checklists',
            },
          ],
        },
        {
          icon: '',
          title: 'Client Meeting Minutes',
          items: [
            {
              icon: 'add',
              title: 'New Client Meeting Minutes',
              dialog: false,
            },
            {
              icon: 'view_list',
              title: 'All Client Meeting Minutes',
              to: '/forms/Client_Meeting_Minutes',
            },
          ],
        },
        {
          icon: 'check',
          title: 'Defect List',
          items: [
            {
              icon: 'add',
              title: 'New Defect List',
              dialog: false,
            },
            {
              icon: 'view_list',
              title: 'All Defect Lists',
              to: '/forms/defect_list_form',
            },
          ],
        },
        {
          icon: 'star',
          title: 'Feedback Form',
          items: [
            {
              icon: 'add',
              title: 'New Feedback Form',
              dialog: false,
            },
            {
              icon: 'view_list',
              title: 'All Feedback Forms',
              to: '/forms/feedback_form',
            },
          ],
        },
        {
          icon: 'compare_arrows',
          title: 'Handover Manual',
          items: [
            {
              icon: 'add',
              title: 'New Handover Manual',
              dialog: false,
            },
            {
              icon: 'view_list',
              title: 'Handover Manual',
              to: '/forms/handover_manual',
            },
          ],
        },
        {
          icon: 'check',
          title: 'Letter of Acceptance',
          items: [
            {
              icon: 'add',
              title: 'New Letter of Acceptance',
              dialog: false,
            },
            {
              icon: 'view_list',
              title: 'All Letters of Acceptance',
              to: '/forms/Letter_of_Acceptance_Template',
            },
          ],
        },
        {
          icon: 'description',
          title: 'Report Template',
          items: [
            {
              icon: 'add',
              title: 'New Handover Manual',
              dialog: false,
            },
            {
              icon: 'view_list',
              title: 'Report Template',
              to: '/forms/report_template',
            },
          ],
        },
        {
          icon: 'trending_up',
          title: 'Subcontract Prog. ',
          items: [
            {
              icon: 'add',
              title: 'New Handover Manual',
              dialog: false,
            },
            {
              icon: 'view_list',
              title: 'Subcontract Progress Claim',
              to: '/forms/subcontract_progress_claim',
            },
          ],
        },
        {
          icon: 'check',
          title: 'Superintendent',
          items: [
            {
              icon: 'add',
              title: 'New Handover Manual',
              dialog: false,
            },
            {
              icon: 'view_list',
              title: 'Superintendent',
              to: '/forms/Superintendent',
            },
          ],
        },
        {
          icon: 'check',
          title: 'Superintendent Variation',
          items: [
            {
              icon: 'add',
              title: 'New Handover Manual',
              dialog: false,
            },
            {
              icon: 'view_list',
              title: 'Superintendent Variation',
              to: '/forms/Superintendent_Variation',
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
      return this.Project.id.concat(' ', this.Project.name);
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
.panel {
  background-color: var(--v-magnolia-base);
}
.adminBtn {
  margin: 12px 24px;
  width: 252px;
  max-width: 300px;
}
.v-toolbar >>> .v-toolbar__content {
  border-bottom: 1px solid #E0E0E0;
  position: sticky;
  top: 0;
}
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
  border-top: 1px solid #E0E0E0;
  border-right: 1px solid #d9d2dc;
  position: sticky;
  bottom: 0;
}
</style>
