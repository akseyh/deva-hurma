<template lang="pug">
h1 {{ basket }}
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "basket",
  computed: {
    ...mapState(["basket"]),
  },
};
</script>