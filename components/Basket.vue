<template lang="pug">
.basket-fixed(v-if="basket.length && $route.path !== '/basket'")
  .basket-fixed__content
    span {{ 'Sepetinizde ' + basket.length + ' ürün var.' }}
    span Toplam:&nbsp
      b {{ basketTotal + 'TL' }}
  button.basket-fixed__basket-icon(@click="$router.push('/basket')")
    shopping-card-icon
    span Sepete Git
</template>

<script>
import { mapGetters, mapState } from "vuex";
import ShoppingCardIcon from "~/assets/icons/ShoppingCartIcon";
export default {
  name: "Basket",
  components: { ShoppingCardIcon },
  computed: {
    ...mapState(["basket"]),
    ...mapGetters(["basketTotal"]),
  },
};
</script>

<style lang="sass" scoped>
.basket-fixed
  @apply sm_right-10 sm_bottom-10 sm_w-96 sm_rounded fixed bottom-0 bg-gray-100 w-full h-20 p-4 flex justify-between items-center border-t-2 border-green-500
  &__content
    @apply flex flex-col
  &__basket-icon
    @apply bg-green-500 px-4 py-3 rounded-xl text-white cursor-pointer flex gap-x-4 items-center justify-start font-semibold
</style>
