<template lang="pug">
.footer-section
  img.footer-section__image(src="~/assets/images/logo.png")
  span.footer-section__contact
    b Telefon:
    span +90 (533) 487 26 73
    b Email:
    span sadikyilmaz@devahurma.com
</template>

<style lang="sass" scoped>
.footer-section
  @apply h-72 bg-gray-200 px-8 py-12 flex flex-col justify-start md_px-16
  &__image
    @apply w-52
  &__contact
    @apply flex flex-col mt-8
</style>
