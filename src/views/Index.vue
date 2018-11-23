<template>
  <Index/>
</template>

<script>
const Index = import('../components/Index');

export default {
  components: {
    Index: () => ({
      component: Index,
      delay: 50,
      setTimeout: 3000,
    }),
  },
  data() {
    return {
      //
    };
  },
};
</script>
