<template lang="pug">
.md_p-0.px-4
  .text-2xl.font-bold.mb-8.md_text-4xl Hurma İle İlgili Bilgiler
  .mt-8
    i.text-2xl
      | Her Derde
      b &nbspDeva Hurma
    p.text-gray-600.my-4 Ramazan ayının gelmesiyle sofralarda yerini alan hurma, şifa saçıyor. Ancak hurma, yalnızca ramazana has bir yiyecek değil bilakis senenin her vakti tüketilmesi gereken bir meyvedir. İçerdiği B9 vitamini ve kalsiyum, magnezyum, potasyum, fosfor, demir ile sodyum mineralleri içeren hurma, vücuda güç verir. Hastalıklarla savaşan hurmanın faydaları şöyle sıralanıyor:
    .mb-16
      li Kolon, göğüs ve rahim kanserinden korur.
      li Kalp ve damar hastalıklarına karşı koruyucu etki gösterir.
      li Tok tutar. Zayıflatır.
      li Güçlü bir antioksidandır. Yaşlanmayı geciktirir.
      li Anne sütünü artırır.
      li Bronşit, verem, kuru öksürük ve soğuk algınlığına iyi gelir.
      li Kemikleri güçlendirir.
      li Kansızlığı bitirir.
      li Sindirimi kolaylaştırır. Kabızlığı bitirir.
      li Hafıza kaybını önler.
      li Karaciğeri güçlendirir.
      li Cilt elastikiyetini arttırır, cilde nem ve gençlik sağlar.
    i.text-2xl Özellikle Kahvaltıda Tüketilebilir
    p.text-gray-600.mt-4.mb-16 Özellikle kahvaltıda tüketilmesi gerekir. Hem kurutulmuş hem de taze halini tüketmekte fayda var. Her mevsim ve aylarda da kahvaltılarımızda, ara öğünlerimizde sıklıkla tüketebiliriz. Hurmayı besin değeri açısından inceleyecek olursak, beslenme açısından yüzde 44, 88 oranında şeker içermektedir. Şeker içeriğinin yüksek olmasının yanında, potasyum açısından da çok zengindir ve muza oranla 2,5 kat daha fazla potasyum içermektedir. Ayrıca hurmanın beslenme açısından da çok zengin bir içeriği vardır.
    i.text-2xl Oldukça Doyurucu Bir Yiyecektir
    p.text-gray-600.mt-4.mb-16 Hurmanın sindirim sistemine çok yardımcı olduğunu ve bu yüzden de hem doygunluk hissi verdiğini hem de sindirim ve bağırsakların boşalmasına yardımcı olduğunu biliyoruz. Hurmanın şeker oranı düşük olduğu için orantılı bir şekilde rahatlıkla tüketilebilir. Bir de hurmada diğer meyvelere oranla yağ içeriği açısından şöyle bir değişiklik vardır, etli kısmında daha az yağ bulunurken, çekirdek kısmında daha fazla yağ bulunur.
    i.text-2xl Hurmanın Şeker Endeksi: 39
    p.text-gray-600.mt-4.mb-16 Hurmanın besin içeriğinin çok yüksek ama şeker endeksinin oldukça düşüktür. Bu yüzden de tercih etmemizde fayda vardır. Hem tatlı ihtiyacımızı baskılamakta hem de lif içeriği yüksek olduğu için tokluk süremizi uzun tutmaktadır. Hurmanın şeker endeksi 39’dur. Çok düşüktür bu konuda rahatlıkla tüketebiliriz ama şöyle bir durum var, fazla tüketildiği zaman, enerji ve kalorisi yüksek olduğu zaman bunların bize geri dönüşü çok kaliteli olmayabilir. Bu yüzden tüketimine dikkat etmek zorundayız.
    i.text-2xl Kararında Yemekte Fayda Var
    p.text-gray-600.mt-4.mb-16 Son olarak fazla hurma tüketiminin zararlı olduğunu aktaralım. Hurmayı özetleyecek olursak niçin beslenmemize gerek var? Antioksidan içeriği yüksek olduğu için tercih etmeliyiz çünkü mide ülserini iyileştirici özelliği vardır. Potasyum açısından zengin olduğu için de tansiyonumuzu dengelememizde yardımcı olmaktadır ve mutlaka kahvaltılarımızda, ara öğünlerimizde ve ya Ramazan aylarında iftarlık olarak kullanabiliriz. Ramazan aylarında tatlı isteğini bastırma adına sahurda tüketebiliriz. 2, 3 adet tüketmekte fayda var. İftarlık olarak da 1-2 adet ya da toplam 3 adetten fazla tüketmemek her zaman için daha iyi olacaktır. Ne kadar çok tüketirsek kalori miktarı artacağı için bu bize kilo olarak geri dönüşüm sağlayabilir.
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Products",
  computed: {
    ...mapState(["products", "basket"]),
  },
  async created() {
    await this.$store.dispatch("fetchProducts");
  },
};
</script>
