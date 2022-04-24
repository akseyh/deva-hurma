<template lang="pug">
.header-menu
  .header-menu__left
    img.header-menu__logo(src="/images/logo.png", @click="$router.push('/')")
    .header-menu__links
      NuxtLink.header-menu__link(to="/") Anasayfa
      NuxtLink.header-menu__link(to="/products") Hurma
      NuxtLink.header-menu__link(to="/others") Diğer Ürünler
      NuxtLink.header-menu__link(to="/contact") İletişim
    .header-menu__hamburger
      button#menuBtn.hamburger.block.md_hidden.focus_outline-none(
        :class="{ open: isMenuOpen }",
        type="button",
        @click="isMenuOpen = !isMenuOpen"
      )
        span.hamburger__top-bun
        span.hamburger__bottom-bun
  .header-menu__hamburger-links(:class="{ open: isMenuOpen }")
    NuxtLink.hamburger-link(to="/") Anasayfa
    NuxtLink.hamburger-link(to="/products") Hurma
    NuxtLink.hamburger-link(to="/others") Diğer Ürünler
    NuxtLink.hamburger-link(to="/contact") İletişim
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
  @apply w-full h-full flex items-center flex-wrap justify-center
  &__left
    @apply flex md_w-auto w-full justify-between
  &__right
    @apply flex space-x-8 justify-around w-full md_w-auto
  &__logo
    @apply h-20
  &__links
    @apply hidden md_flex flex-grow items-center px-4 space-x-8 justify-end
  &__link
    @apply font-bold cursor-pointer transition hover_text-green-600 border-b border-white hover_border-green-600
  &__hamburger
    @apply block md_hidden px-4 justify-end flex items-center justify-center
    &-links
      @apply hidden
    &-links.open
      @apply flex md_hidden w-full h-auto flex-col bg-gray-200 p-4 justify-between mb-4
      .hamburger-link
        @apply hover_text-green-600 hover_bg-gray-300 p-2 transition duration-200

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
