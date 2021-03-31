<template lang="pug">
.header-menu
  .header-menu__left
    img.header-menu__logo(src="~/assets/logo.png")
    .header-menu__links
      NuxtLink.header-menu__link(to="/") Anasayfa
      NuxtLink.header-menu__link(to="/products") Hurma
      NuxtLink.header-menu__link(to="#") Sipariş Ver
      NuxtLink.header-menu__link(to="#") İletişim
  .flex.space-x-8
    .header-menu__contact
      b.text-xl Sadık Yılmaz
      b.flex
        PhoneIcon.w-6.text-green-500
        span 0(534) 487 26 73
    .header-menu__basket-title(@click="$router.push('/basket')")
      ShoppingCardIcon
      span Sepet
</template>

<script>
import { mapState } from "vuex";
import ShoppingCardIcon from "~/assets/icons/ShoppingCartIcon";
import PhoneIcon from "~/assets/icons/PhoneIcon";
export default {
  name: "HeaderMenu",
  components: { ShoppingCardIcon, PhoneIcon },
  computed: {
    ...mapState(["basket"]),
  },
};
</script>

<style lang="sass" scoped>
.header-menu
  @apply w-full flex items-center justify-between
  &__left
    @apply flex
  &__logo
    @apply h-12
  &__links
    @apply flex-grow sm:flex items-center px-4 space-x-8 hidden
  &__link
    @apply font-bold cursor-pointer transition hover:text-green-600 border-b border-white hover:border-green-600
  &__basket-title
    @apply sm:flex items-center justify-end p-2 hidden space-x-4 bg-green-500 rounded-xl text-white cursor-pointer
</style>