<template lang="pug">
.information-section
  mail-icon.information-section__icon
  span.information-section__mail sadikyilmaz@devahurma.com
</template>

<script>
import MailIcon from "~/assets/icons/MailIcon";
export default {
  name: "InformationSection",
  components: {
    MailIcon,
  },
};
</script>

<style lang='sass' scoped>
.information-section
  @apply bg-gray-200 h-12 flex flex-row items-center px-8
  &__icon
    @apply w-4
  &__mail
    @apply ml-2
</style>