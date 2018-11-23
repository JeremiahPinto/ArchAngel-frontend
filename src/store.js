import Vue from 'vue';
import Vuex from 'vuex';
// import router from '@/router/index';
import feathersVuex from 'feathers-vuex';
import feathersClient from './feathers-client';

const { service, auth, FeathersVuex } = feathersVuex(feathersClient, { idField: '_id' });

Vue.use(Vuex);
Vue.use(FeathersVuex);

export default new Vuex.Store({
  strict: true, // remove when in prod
  plugins: [
    service('users', {
      instanceDefaults: {
        name: {
          first: '',
          last: '',
        },
        email: '',
        password: '',
        role: 'user',
        occupation: '',
      },
    }),
    service('projects', {
      instanceDefaults: {
        projectID: '',
        name: '',
        company: 'Actus Associates',
        assignees: '',
      },
    }),
    auth({
      userService: 'users',
    }),
  ],
});
