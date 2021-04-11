<template lang="pug">
div
  .w-full.bg-red-500.pl-8.py-4.rounded-xl.text-white.mb-96(
    v-if="!basket.length"
  )
    span Sepetinizde ürün yok! Anasayfadan isteğiniz ürünleri seçerek sepetinize ekleyebilirsiniz.
  div(v-else-if="step === 0")
    b.text-2xl.ml-4 Sepetteki Ürünler
    .my-8.flex.flex-wrap.justify-start.flex-row
      product-card.mr-2.mb-2(
        v-for="product in basket",
        :key="product.id",
        :name="product.name",
        :price="product.price",
        :imageLink="product.pictureUrl",
        :discount="product.discount"
      )
    .flex.justify-end.flex-col.items-end.mr-6
      b.text-xl Toplam Tutar: {{ basketTotal }}TL
      button.bg-green-600.text-white.p-2.rounded-md.w-52(@click="toStepOne") Sipariş Ver
  div(v-else-if="step === 1")
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
      ) Devam Et
  div(v-else-if="step === 2")
    .bg-green-600.text-white.rounded-xl.pl-8.py-4 
      div {{ name }}, siparişin oluşturuldu!
      .mt-4 Aşağıdaki hesaplara toplam tutar miktarını eft/havale ile gönderebilirsiniz.
        b Ödemenin açıklama kısmında ad, soyad belirtmeyi unutmayın!
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "basket",
  computed: {
    ...mapState(["basket"]),
    ...mapGetters(["basketTotal"]),
  },
  data() {
    return {
      name: "",
      address: "",
      phone: "",
      step: 0,
      error: false,
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
      this.step = 2;
    },
    makeOrder(name) {
      this.$store.dispatch("makeOrder", { name });
    },
  },
};
</script>