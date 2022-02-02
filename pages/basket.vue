<template lang="pug">
div(class="md:p-0 px-4")
  .text-2xl.font-bold.mb-8(class="md:text-4xl") Sepetiniz
  .w-full.bg-red-500.pl-8.py-4.rounded-xl.text-white.mb-96(
    v-if="!basket.length && step !== 2"
  )
    span Sepetinizde ürün yok!<br/> Anasayfadan istediğiniz ürünleri seçerek sepetinize ekleyebilirsiniz.
  div(v-else-if="step === 0")
    .w-full.bg-yellow-500.pl-8.py-4.rounded-xl.text-white.mb-4(v-if="basketWeight < KARGO_FREE_MIN_WEIGHT")
      .text-xl.font-semibold {{KARGO_FREE_MIN_WEIGHT}}kg ve üzeri KARGO BEDAVA!
      span Sepetinize {{ KARGO_FREE_MIN_WEIGHT - basketWeight}}kg daha ürün ekleyerek kargo bedava kampanyasından faydalanabilirsiniz.
    b.text-2xl.ml-4 Sepetteki Ürünler ({{basket.length}})
    .my-8.flex.flex-wrap.justify-start.flex-row
      product-card.mr-2.mb-2(
        v-for="product in basket",
        :key="product.id",
        :product="product"
      )
    .flex.justify-end.flex-col.items-end.mr-6
      b.text-xl Toplam Tutar: {{ basketTotal }}TL
      button.bg-green-600.text-white.p-2.rounded-md.w-52(@click="toStepOne") Devam Et
  div(v-else-if="step === 1")
    .w-full.rounded-xl.bg-red-600.text-white.pl-8.py-4.transition(v-if="error")
      | Alanları doğru girdiğinizden emin olun.
    .my-8.flex.flex-wrap.justify-center.items-end.flex-col
      .flex.flex-col.w-full
        span Ad soyad:
        input.border-2.border-gray-600.rounded-xl.pl-4.py-2(
          type="text",
          placeholder="Ad soyad girin",
          v-model="name"
        )
      .flex.flex-col.w-full.mt-8
        span Telefon:
        input.border-2.border-gray-600.rounded-xl.pl-4.py-2(
          placeholder="5XX XXX XX XX",
          type="text",
          ,
          v-model="phone"
        )
      .flex.flex-col.w-full.mt-8
        span Adres
        textarea.border-2.border-gray-600.rounded-xl.pl-4.py-2(
          type="text",
          placeholder="Adres girin",
          v-model="address"
        )
      button.bg-green-600.text-white.p-2.rounded-md.w-52.mt-8(
        @click="toStepTwo"
      ) Sipariş Oluştur
  div(v-else-if="step === 2")
    .bg-green-600.text-white.rounded-xl.pl-8.py-4
      div {{ name }}, siparişin oluşturuldu!
      .mt-4 Aşağıdaki iban numaralarına toplam sipariş tutarını {{ '(' + basketTotal + 'TL)' }} eft/havale ile gönderdiğinizde siparişiniz kargoya verilecektir.
      b Ödemenin açıklama kısmında ad, soyad belirtmeyi unutmayın!
    span {{basketTotal}}
    .flex.flex-row.justify-center.flex-wrap.mt-8
      .m-8.flex.justify-center.flex-col.items-center.text-center
        img.w-16(src="~/assets/images/bank_kt.png")
        b Kuveyt Türk
        span.text-gray-600 SADIK YILMAZ
        span IBAN: TR36 0020 5000 0011 0124 5000 02
      .m-8.flex.justify-center.flex-col.items-center.text-center
        img.w-16(src="~/assets/images/bank_tf.png")
        b Türkiye Finans
        span.text-gray-600 SADIK YILMAZ
        span IBAN: TR17 0020 6000 0400 5343 0600 02
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { KARGO_FREE_MIN_WEIGHT } from "../utils/constants"
export default {
  name: "basket",
  computed: {
    ...mapState(["basket"]),
    ...mapGetters(["basketTotal", "basketWeight"]),
  },
  data() {
    return {
      KARGO_FREE_MIN_WEIGHT,
      name: "",
      address: "",
      phone: "",
      step: 0,
      error: false
    };
  },
  methods: {
    toStepOne() {
      if (!this.basket.length) return;
      this.step = 1;
    },
    toStepTwo() {
      const phone = this.phone.replaceAll(" ", "");
      if (
        !this.name ||
        !this.address ||
        ![10, 11].includes(phone.length) ||
        isNaN(phone)
      ) {
        this.error = true;
        return;
      }
      this.error = false;
      this.makeOrder();
      this.step = 2;
    },
    makeOrder() {
      const payload = {
        name: this.name,
        address: this.address,
        phone: this.phone,
      };
      this.$store.dispatch("makeOrder", payload);
    },
  },
};
</script>
