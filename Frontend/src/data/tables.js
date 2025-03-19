
import { faGoogle, faTwitter, faYahoo, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faGlobeEurope, } from '@fortawesome/free-solid-svg-icons';
import food from '../assets/food.jpg'



const pageVisits = [
    { id: 1, views: 4.525, returnValue: 255, bounceRate: 42.55, pageName: "/demo/admin/index.html" },
    { id: 2, views: 2.987, returnValue: 139, bounceRate: -43.52, pageName: "/demo/admin/forms.html" },
    { id: 3, views: 2.844, returnValue: 124, bounceRate: -32.35, pageName: "/demo/admin/util.html" },
    { id: 4, views: 1.220, returnValue: 55, bounceRate: 15.78, pageName: "/demo/admin/validation.html" },
    { id: 5, views: 505, returnValue: 3, bounceRate: -75.12, pageName: "/demo/admin/modals.html" }
];

const pageTraffic = [
    { id: 1, source: "Direct", sourceType: "Direct", trafficShare: 51, change: 2.45, sourceIcon: faGlobeEurope, sourceIconColor: "gray" },
    { id: 2, source: "Google Search", sourceType: "Search / Organic", trafficShare: 18, change: 17.67, sourceIcon: faGoogle, sourceIconColor: "info" },
    { id: 3, source: "youtube.com", sourceType: "Social", category: "Arts and Entertainment", rank: 2, trafficShare: 27, sourceIcon: faYoutube, sourceIconColor: "danger" },
    { id: 4, source: "yahoo.com", sourceType: "Referral", category: "News and Media", rank: 11, trafficShare: 8, change: -9.30, sourceIcon: faYahoo, sourceIconColor: "purple" },
    { id: 5, source: "twitter.com", sourceType: "Social", category: "Social Networks", rank: 4, trafficShare: 4, sourceIcon: faTwitter, sourceIconColor: "info" }
];


const invoiceItems = [
    { id: 1, item: "Origin License", description: "Extended License", price: "999,00", quantity: 1 },
    { id: 2, item: "Custom Services", description: "Instalation and Customization (cost per hour)", price: "150,00", quantity: 20 },
    { id: 3, item: "Hosting", description: "1 year subcription", price: "499,00", quantity: 1 },
    { id: 4, item: "Platinum Support", description: "1 year subcription 24/7", price: "3999,00", quantity: 1 },
];
const blogs = [
    {
      title: "Avokado Ezmeli Taco",
      date: "8 Haziran 2021, Salı",
      image: food,
      description:
        "Bu kremsi ve baharatlı avokado sosu, günlük taco'larınızı hazırlamak için harika seçeneklerden biri. Geleneksel olarak flautas veya.",
    },
    {
      title: "Mantar Risotto",
      date: "15 Temmuz 2021, Perşembe",
      image: food,
      description:
        "Kremalı ve lezzetli mantar risotto, özel günler için mükemmel bir seçenektir. Taze mantarlar ve parmesan peyniri ile hazırlanır.",
    },
    {
      title: "Fırında Somon",
      date: "22 Ağustos 2021, Pazar",
      image: food,
      description:
        "Fırında somon, sağlıklı ve lezzetli bir akşam yemeği seçeneğidir. Limon ve dereotu ile marine edilerek hazırlanır.",
    },
    {
      title: "Kinoa Salatası",
      date: "5 Eylül 2021, Pazar",
      image: food,
      description:
        "Kinoa salatası, hafif ve besleyici bir öğle yemeği seçeneğidir. Taze sebzeler ve limon sosu ile servis edilir.",
    },
    {
      title: "Çikolatalı Sufle",
      date: "12 Ekim 2021, Salı",
      image: food,
      description:
        "Çikolatalı sufle, tatlı sevenler için vazgeçilmez bir lezzettir. Sıcak ve akışkan çikolata içeriği ile servis edilir.",
    },
    {
      title: "Kabak Mücver",
      date: "19 Kasım 2021, Cuma",
      image: food,
      description:
        "Kabak mücver, kahvaltılar ve atıştırmalıklar için harika bir seçenektir. Taze kabak ve baharatlarla hazırlanır.",
    },
    {
      title: "Pesto Soslu Makarna",
      date: "26 Aralık 2021, Pazar",
      image: food,
      description:
        "Pesto soslu makarna, pratik ve lezzetli bir akşam yemeği seçeneğidir. Taze fesleğen ve çam fıstığı ile hazırlanır.",
    },
    {
      title: "Köri Soslu Tavuk",
      date: "2 Ocak 2022, Pazar",
      image: food,
      description:
        "Köri soslu tavuk, baharat sevenler için mükemmel bir seçenektir. Hindistan cevizi sütü ve köri ile hazırlanır.",
    },
    {
      title: "Pancake",
      date: "9 Şubat 2022, Çarşamba",
      image: food,
      description:
        "Pancake, kahvaltılar için vazgeçilmez bir lezzettir. Akçaağaç şurubu ve taze meyvelerle servis edilir.",
    },
    {
      title: "Meyveli Tart",
      date: "16 Mart 2022, Çarşamba",
      image: food,
      description:
        "Meyveli tart, özel günler için harika bir tatlı seçeneğidir. Taze meyveler ve krem şanti ile servis edilir.",
    },
  ];
  
  
export {
    pageVisits,
    pageTraffic,
    
    invoiceItems,
    blogs,
};