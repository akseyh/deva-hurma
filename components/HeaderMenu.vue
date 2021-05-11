<template lang="pug">
.header-menu
  .header-menu__left
    img.header-menu__logo(src="~/assets/logo.png", @click="$router.push('/')")
    .header-menu__links
      NuxtLink.header-menu__link(to="/") Anasayfa
      NuxtLink.header-menu__link(to="/products") Hurma
      NuxtLink.header-menu__link(to="/contact") İletişim
    .header-menu__hamburger
      button#menuBtn.hamburger.block(
        class="md:hidden focus:outline-none",
        :class="{ open: isMenuOpen }",
        type="button",
        @click="isMenuOpen = !isMenuOpen"
      )
        span.hamburger__top-bun
        span.hamburger__bottom-bun
  .header-menu__hamburger-links(:class="{ open: isMenuOpen }")
    NuxtLink.hamburger-link(to="/") Anasayfa
    NuxtLink.hamburger-link(to="/products") Hurma
    NuxtLink.hamburger-link(to="/contact") İletişim
  .header-menu__right
    .header-menu__contact
      b.text-base Sadık Yılmaz
      b.flex.items-center.space-x-2
        PhoneIcon.w-4.text-green-500
        span.text-sm 0(533) 487 26 73
    .header-menu__basket-title(@click="$router.push('/basket')")
      ShoppingCardIcon.w-4
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
  data() {
    return {
      isMenuOpen: false,
    };
  },
};
</script>

<style lang="sass" scoped>
.header-menu
  @apply w-full flex items-center justify-between flex-wrap justify-center
  &__left
    @apply flex md:w-auto w-full justify-between
  &__right
    @apply flex space-x-8 justify-around w-full md:w-auto
  &__logo
    @apply h-12 sm:h-20
  &__links
    @apply hidden md:flex flex-grow items-center px-4 space-x-8 justify-end
  &__link
    @apply font-bold cursor-pointer transition hover:text-green-600 border-b border-white hover:border-green-600
  &__basket-title
    @apply flex flex-row w-32 items-center justify-center p-2 space-x-4 bg-green-500 hover:bg-green-600 transition rounded-xl text-white cursor-pointer w-max min-w-max
  &__hamburger
    @apply block md:hidden px-4 justify-end
    &-links
      @apply hidden
    &-links.open
      @apply flex md:hidden w-full h-auto flex-col bg-gray-200 p-4 justify-between mb-4
      .hamburger-link
        @apply hover:text-green-600 hover:bg-gray-300 p-2 transition duration-200

/* HAMBURGER MENU */

.hamburger
  cursor: pointer
  width: 48px
  height: 48px
  transition: all 0.25s

.hamburger__top-bun,
.hamburger__bottom-bun
  content: ''
  position: absolute
  width: 24px
  height: 2px
  background: #000
  transform: rotate(0)
  transition: all 0.5s

.hamburger:hover [class*="-bun"]
  background: #333

.hamburger__top-bun
  transform: translateY(-5px)

.hamburger__bottom-bun
  transform: translateY(3px)

.open
  transform: rotate(90deg)
  transform: translateY(-1px)

  & .hamburger__top-bun
    transform: rotate(45deg) translateY(0px)

  & .hamburger__bottom-bun
    transform: rotate(-45deg) translateY(0px)
</style>