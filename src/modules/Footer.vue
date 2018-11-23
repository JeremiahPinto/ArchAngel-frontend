<template>
  <v-footer dark
            inset
            app
            color="primary"
            height="auto"
  >
    <v-layout justify-center
              row
              wrap
    >
      <v-btn  dark
              flat
              round
              v-for="link in links"
              :key="link.name"
              :to="link.to"
      >
        {{ link.name }}
      </v-btn>

      <v-flex xs12
              text-xs-center
              pb-2
      >
        <strong> Actus Associates </strong> &copy; 2018
      </v-flex>
    </v-layout>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          name: 'Terms Of Use',
          to: '/terms_of_use',
        },
        {
          name: 'User Manual',
          to: '/docs',
        },
      ],
    };
  },
};
</script>
