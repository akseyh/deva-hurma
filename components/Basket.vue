<template lang="pug">
.basket-fixed(v-if="basket.length && $route.path !== '/basket'")
  .basket-fixed__content
    span {{ 'Sepetinizde ' + basket.length + ' ürün var.' }}
    span Toplam:&nbsp
      b {{ basketTotal + 'TL' }}
  button.basket-fixed__basket-icon(@click="$router.push('/basket')")
    shopping-card-icon
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
  @apply sm:right-10 sm:bottom-10 sm:w-96 sm:rounded fixed bottom-0 bg-gray-100 w-full h-20 p-4 flex justify-between items-center border-t-2 border-green-500
  &__content
    @apply flex flex-col
  &__basket-icon
    @apply bg-green-500 p-2 rounded-xl text-white cursor-pointer
</style>