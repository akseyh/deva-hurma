<template lang='pug'>
.default-layout
  .basket-fixed(v-if="basket.length")
    span {{ 'There are ' + basket.length + ' items in the basket.' }}
    .basket-fixed__basket-icon
      shopping-card-icon
  .default-layout__fixed-top
    information-section
  .default-layout__app-container
    header-menu.default-layout__header
    Nuxt.default-layout__app
  .default-layout__footer
    footer-section
</template>

<script>
import ShoppingCardIcon from "~/assets/icons/ShoppingCartIcon";
import { mapState } from "vuex";
export default {
  name: "DefaultLayout",
  components: { ShoppingCardIcon },
  computed: {
    ...mapState(["basket"]),
  },
};
</script>

<style lang='sass'>
.default-layout
  @apply w-full
  &__fixed-top
    @apply w-full
  &__header
    @apply mt-4
  &__app-container
    @apply w-full md:w-3/4 mx-auto mt-8
  &__app
    @apply mt-4
  &__footer
    @apply w-full mt-4

.basket-fixed
  @apply sm:right-10 sm:bottom-10 sm:w-96 sm:rounded fixed bottom-0 bg-gray-100 w-full h-20 p-4 flex justify-between items-center border-t-2 border-green-500
  &__basket-icon
    @apply bg-green-500 p-2 rounded-xl text-white cursor-pointer

html
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
  font-size: 16px
  word-spacing: 1px
  -ms-text-size-adjust: 100%
  -webkit-text-size-adjust: 100%
  -moz-osx-font-smoothing: grayscale
  -webkit-font-smoothing: antialiased
  box-sizing: border-box

*,
*::before,
*::after
  box-sizing: border-box
  margin: 0
</style>
