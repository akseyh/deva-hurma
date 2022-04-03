<template lang="pug">
.footer
  .footer-container
    .footer-container__about
      .footer-container__about-title
        | Hakkımızda
      .footer-container__about-text
        | Deva Hurma, genelde Suudi Arabistan, özelde Medine-i Münevvere hurma bahçelerinden %100 doğal lezzetli şifa kaynağı hurmaları sofralarınıza kadar ulaştırıyor.
    .footer-container__links
      .footer-container__links-title
        | Linkler
      .footer-container__links-list
        NuxtLink.footer-container__links-list-item(to="/")
          | Anasayfa
        NuxtLink.footer-container__links-list-item(to="/products")
          | Hurma
        NuxtLink.footer-container__links-list-item(to="/others")
          | Diğer Ürünler
        NuxtLink.footer-container__links-list-item(to="/contact")
          | İletişim
    .footer-container__contact
      .footer-container__contact-title
        | İletişim
      .footer-container__contact-list
        img.footer-container__contact-list-logo(src="/images/logo.png" width="256")
        .footer-container__contact-list-item
          .footer-container__contact-list-item-title Email:
          .footer-container__contact-list-item-text sadikyilmaz@devahurma.com
        .footer-container__contact-list-item
          .footer-container__contact-list-item-title Telefon:
          .footer-container__contact-list-item-text +90 533 487 26 73
        .footer-container__contact-list-item
          .footer-container__contact-list-item-title Instagram:
          .footer-container__contact-list-item-text
            a(href="https://www.instagram.com/devahurma/" target="_blank") @devahurma
        .footer-container__contact-list-item
          .footer-container__contact-list-item-title Facebook:
          .footer-container__contact-list-item-text
            a(href="https://www.facebook.com/devahurma" target="_blank") fb.me/devahurma
  .mt-20.mb-8.flex.flex-col.items-center.justify-center.text-gray-500.text-xs.font-semibold
    .text-sm.text-gray-400
      | © {{new Date().getFullYear()}} Deva Hurma Tüm Hakları Saklıdır
    .text-sm.text-gray-900
      span Developed by&nbsp
      a.hover_text-green-600.transition(href="https://akseyh.github.io" target="_blank") @akseyh
</template>

<style lang="sass" scoped>
.footer
  @apply h-auto bg-gray-200 px-8 pt-12 flex flex-col items-center justify-start md_px-16
.footer-container
  @apply w-full md_w-4/5 flex-col gap-y-4 sm_flex-row flex items-start justify-between gap-x-4
  .footer-container__about
    @apply flex-1
    .footer-container__about-title
      @apply text-gray-700 font-bold text-xl mb-2
    .footer-container__about-text
      @apply text-gray-700 text-sm
  .footer-container__links
    @apply flex-1
    .footer-container__links-title
      @apply text-gray-700 font-bold text-xl mb-2
    .footer-container__links-list
      @apply flex flex-col w-full gap-y-2
      .footer-container__links-list-item
        @apply text-gray-700 text-sm border-b border-gray-300 py-1 hover_text-gray-900 hover_border-gray-400 transition
  .footer-container__contact
    @apply flex-1
    .footer-container__contact-title
      @apply text-gray-700 font-bold text-xl mb-2
    .footer-container__contact-list
      @apply flex flex-col
    .footer-container__contact-list-item
      @apply flex gap-x-2 items-center
      .footer-container__contact-list-item-title
        @apply font-bold text-sm text-gray-800
      .footer-container__contact-list-item-text
        @apply text-gray-700 text-sm
</style>
