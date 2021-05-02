<template lang='pug'>
.default-layout
  basket
  //- .default-layout__fixed-top
  //-   information-section
  .default-layout__app-container
    header-menu.default-layout__header
    Nuxt.default-layout__app
  .default-layout__footer
    footer-section
</template>

<script>
export default {
  name: "DefaultLayout",
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
