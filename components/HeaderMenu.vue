<template lang="pug">
.header-menu
  img.header-menu__logo(src="~/assets/logo.png")
  .header-menu__links
    NuxtLink.header-menu__link(to="/") Anasayfa
    NuxtLink.header-menu__link(to="/products") Hurma
    NuxtLink.header-menu__link(to="#") Sipariş Ver
    NuxtLink.header-menu__link(to="#") İletişim
  .header-menu__basket-title {{ 'There are ' + basket.length + ' items in the basket.' }}
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "HeaderMenu",
  computed: {
    ...mapState(["basket"]),
  },
};
</script>

<style lang="sass" scoped>
.header-menu
  @apply w-full flex items-center
  &__logo
    @apply h-12
  &__links
    @apply flex-grow sm:flex items-center px-4 space-x-8 hidden
  &__link
    @apply font-bold cursor-pointer transition hover:text-green-600 border-b border-white hover:border-green-600
  &__basket-title
    @apply sm:flex flex-grow items-center justify-end px-4 hidden
</style>