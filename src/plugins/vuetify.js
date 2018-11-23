import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify, {
  theme: {
    primary: '#6000FF',
    secondary: '#211A1D',
    accent: '#CAD5CA',
    error: '#D11149',
    info: '#1A8FE3',
    success: '#48A9A6',
    warning: '#E6C229',
    magnolia: '#F8F0FB',
  },
  customProperties: true,
  iconfont: 'md',
});
