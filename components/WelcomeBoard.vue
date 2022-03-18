<template lang="pug">
.welcome-board
  .welcome-board__description
    .welcome-board__title DEVA HURMA
    .welcome-board__subtitle HURMA
    .welcome-board__other-text %100 ORGANİK
    span En uygun fiyatlarla
    button.welcome-board__button(@click="$router.push('/contact')") HEMEN SİPARİŞ VER
</template>

<style lang="sass" scoped>
.welcome-board
    background: url('/images/hurma.jpeg')
    @apply w-full relative flex flex-col bg-no-repeat bg-right-top
    &__description
        @apply w-full p-24 z-20 flex flex-col sm_bg-transparent bg-white bg-opacity-40 border-0 sm_border-2 border-gray-100
    &__title
        @apply font-bold text-green-400
    &__subtitle
        @apply font-bold text-5xl
    &__other-text
        @apply font-bold text-3xl
    &__button
        @apply bg-green-400 w-48 rounded-sm mt-8 px-4 py-2 text-white
</style>
