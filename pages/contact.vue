<template lang="pug">
div.md_p-0.px-4
  .text-2xl.font-bold.mb-8.md_text-4xl Sosyal Medya ve İletişim
  .flex.flex-col
    .flex.flex-row.justify-center.flex-wrap.mt-10.gap-8
      a.flex.justify-center.flex-col.items-center.text-center.w-auto(
        href="https://api.whatsapp.com/send?phone=905334872673&text=Sipari%C5%9F%20vermek%20istiyorum.",
        target="_blank"
      )
        whatsapp-icon.w-16(style="fill: green")
        b WhatsApp
        span.text-gray-600 +90 (533) 487 26 73
      a.flex.justify-center.flex-col.items-center.text-center(
        href="http://www.instagram.com/devahurma",
        target="_blank"
      )
        instagram-icon.w-16.rounded-xl(
          style="fill: white; background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285aeb 90%)"
        )
        b Instagram
        span.text-gray-600 @devahurma
      a.flex.justify-center.flex-col.items-center.text-center(
        href="http://www.fb.me/devahurma",
        target="_blank"
      )
        facebook-icon.w-16(style="fill: blue")
        b Facebook
        span.text-gray-600 fb.me/devahurma
      a.flex.justify-center.flex-col.items-center.text-center(
        href="mailto:sadikyilmaz@devahurma.com"
      )
        email-icon.w-16(style="fill: gray")
        b Email
        span.text-gray-600 sadikyilmaz@devahurma.com
    .flex.flex-row.justify-center.flex-wrap.mt-8
      .m-8.flex.justify-center.flex-col.items-center.text-center
        img.w-16(src="~/assets/images/bank_kt.png")
        b Kuveyt Türk
        span.text-gray-600 SADIK YILMAZ
        span IBAN: TR36 0020 5000 0011 0124 5000 02
</template>

<script>
import EmailIcon from "../assets/icons/EmailIcon";
import FacebookIcon from "../assets/icons/FacebookIcon";
import InstagramIcon from "../assets/icons/InstagramIcon";
import WhatsappIcon from "../assets/icons/WhatsappIcon";
export default {
  name: "Contact",
  components: {
    EmailIcon,
    FacebookIcon,
    InstagramIcon,
    WhatsappIcon
  }
};
</script>
