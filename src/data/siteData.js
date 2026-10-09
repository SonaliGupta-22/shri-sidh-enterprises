// Edit this file to change the shop's details, brands and products.
// Every visible text is { en: '...', hi: '...' } so the Hindi/English toggle works.
export const business = {
  name: { en: 'Shri Sidh Enterprises', hi: 'श्री सिद्ध एंटरप्राइजेज' },
  tagline: {
    en: 'Peetal, steel & kitchen appliances under one roof',
    hi: 'पीतल, स्टील और किचन अप्लायंसेस - सब एक ही छत के नीचे',
  },
  blessing: { en: 'Jai Baba Balak Nath Ji', hi: 'जय बाबा बालक नाथ जी' },
  phones: ['+91 96277 00061', '+91 88946 64222'], // shown in Contact; first one is used for Call Now
  whatsapp: '919627700061',      // country code + number, no + or spaces
  email: 'Adhikari.217@gmail.com', // shown in Contact (leave empty to hide)
  mapsQuery: 'Main Bazar Kotla, near PNB Bank, Jawali, Kangra, Himachal Pradesh 176205',
  address: {
    en: 'Main Bazar Kotla, near PNB Bank, Teh. Jawali, Distt. Kangra, Himachal Pradesh - 176205',
    hi: 'मेन बाज़ार कोटला, पीएनबी बैंक के पास, तहसील जवाली, ज़िला कांगड़ा, हिमाचल प्रदेश - 176205',
  },
  hours: { en: 'Mon - Sat: 9:30 AM - 8:00 PM', hi: 'सोम - शनि: सुबह 9:30 - रात 8:00' },
  sunday: { en: 'Sunday: Closed', hi: 'रविवार: बंद' },
}

// Festival banner. Set enabled: false to hide it after the festival, or change the text for the next one.
export const festival = {
  enabled: true,
  title: { en: 'Happy Diwali & Dhanteras', hi: 'शुभ दीपावली एवं धनतेरस' },
  text: {
    en: 'Dhanteras is the day to bring home new utensils. Light up your home this Diwali with brass, copper and steel ware, gift sets and kitchen appliances. Ask us for festival rates and ready gift packs. Bulk orders taken for every occasion.',
    hi: 'धनतेरस पर नए बर्तन घर लाने की परंपरा है। इस दीपावली पीतल, तांबे और स्टील के बर्तन, गिफ्ट सेट और किचन अप्लायंसेस से अपना घर रोशन करें। त्योहारी भाव और तैयार गिफ्ट पैक के बारे में पूछें। हर अवसर के लिए बल्क ऑर्डर लिए जाते हैं।',
  },
  ctaShop: { en: 'See Diwali Gifts', hi: 'दीपावली गिफ्ट देखें' },
  ctaChat: { en: 'Ask on WhatsApp', hi: 'WhatsApp पर पूछें' },
  waMsg: { en: 'Hello, I want to know about Diwali offers and gift packs.', hi: 'नमस्ते, मुझे दीपावली के ऑफर और गिफ्ट पैक के बारे में जानना है।' },
}

// Brand names shown in the brands strip (from the shop's visiting card).
export const distributorBrands = ['Borosil Ltd.']
export const dealerBrands = [
  'Vinod Intelligent Cookware', 'Kraft', 'Banjour', 'Trueware', 'Hawkins',
  'Prestige', 'Bajaj', 'Havells', 'FnS', 'JCPL', 'Lilly',
]

export const categories = [
  { id: 'All', label: { en: 'All', hi: 'सभी' } },
  { id: 'Peetal', label: { en: 'Peetal (Brass)', hi: 'पीतल' } },
  { id: 'Gifts', label: { en: 'Gift Items', hi: 'गिफ्ट आइटम' } },
  { id: 'Steel', label: { en: 'Steel', hi: 'स्टील' } },
  { id: 'Cookware', label: { en: 'Cookware', hi: 'कुकवेयर' } },
  { id: 'Electronics', label: { en: 'Electronics', hi: 'इलेक्ट्रॉनिक्स' } },
  { id: 'Serveware', label: { en: 'Serveware', hi: 'सर्वेवेयर' } },
  { id: 'Storage', label: { en: 'Storage', hi: 'स्टोरेज' } },
]

const tags = {
  popular: { en: 'Popular', hi: 'लोकप्रिय' },
  best: { en: 'Bestseller', hi: 'बेस्टसेलर' },
  wholesale: { en: 'Wholesale', hi: 'थोक' },
  new: { en: 'New', hi: 'नया' },
  borosil: { en: 'Borosil', hi: 'Borosil' },
}

// To use a real photo: put the file in public/images/ and add  image: '/images/thali.jpg'
export const products = [
  // Peetal
  { id: 1, category: 'Peetal', emoji: '🪔', tag: tags.popular,
    name: { en: 'Peetal Pooja Thali Set', hi: 'पीतल पूजा थाली सेट' },
    desc: { en: 'Handcrafted peetal thali with diya, kalash and accessories.', hi: 'दीया, कलश और सामग्री के साथ हाथ से बनी पीतल की थाली।' } },
  { id: 2, category: 'Peetal', emoji: '🍲',
    name: { en: 'Peetal Handi / Patila', hi: 'पीतल हांडी / पतीला' },
    desc: { en: 'Traditional peetal vessels for slow cooking and serving.', hi: 'धीमी आँच पर पकाने और परोसने के लिए पारंपरिक पीतल के बर्तन।' } },
  { id: 3, category: 'Peetal', emoji: '🥘',
    name: { en: 'Peetal Kadhai', hi: 'पीतल की कड़ाही' },
    desc: { en: 'Heavy-gauge peetal kadhai, available in many sizes.', hi: 'मोटी परत वाली पीतल की कड़ाही, कई साइज़ में उपलब्ध।' } },
  { id: 4, category: 'Peetal', emoji: '🫗',
    name: { en: 'Peetal Lota, Glass & Jug', hi: 'पीतल लोटा, गिलास और जग' },
    desc: { en: 'Classic drinkware in pure peetal, ideal for gifting.', hi: 'शुद्ध पीतल के पेय बर्तन, उपहार के लिए उत्तम।' } },
  { id: 5, category: 'Peetal', emoji: '🍽️', tag: tags.best,
    name: { en: 'Peetal Thali & Bowl Set', hi: 'पीतल थाली और कटोरी सेट' },
    desc: { en: 'Dinner sets in peetal for festivals and daily use.', hi: 'त्योहारों और रोज़ाना उपयोग के लिए पीतल के डिनर सेट।' } },
  { id: 6, category: 'Peetal', emoji: '🏺', tag: tags.wholesale,
    name: { en: 'Peetal Bhagona / Degchi', hi: 'पीतल भगोना / देगची' },
    desc: { en: 'Large peetal vessels for weddings and catering.', hi: 'शादी और केटरिंग के लिए बड़े पीतल के बर्तन।' } },

  // Gift items (brass, kansa, copper, steel)
  { id: 19, category: 'Gifts', emoji: '🎁', tag: tags.popular,
    name: { en: 'Brass Gift Items', hi: 'पीतल के गिफ्ट आइटम' },
    desc: { en: 'Brass gift sets and showpieces for weddings, festivals and housewarming.', hi: 'शादी, त्योहार और गृहप्रवेश के लिए पीतल के गिफ्ट सेट और शोपीस।' } },
  { id: 20, category: 'Gifts', emoji: '🥣',
    name: { en: 'Kansa Gift Sets', hi: 'कांसे के गिफ्ट सेट' },
    desc: { en: 'Kansa thali, bowl and glass sets, loved for health and tradition.', hi: 'कांसे की थाली, कटोरी और गिलास के सेट, सेहत और परंपरा के लिए।' } },
  { id: 21, category: 'Gifts', emoji: '🫙',
    name: { en: 'Copper Gift Sets', hi: 'तांबे के गिफ्ट सेट' },
    desc: { en: 'Copper bottle, jug and glass sets in attractive gift packs.', hi: 'तांबे की बोतल, जग और गिलास के आकर्षक गिफ्ट पैक।' } },
  { id: 22, category: 'Gifts', emoji: '🍽️',
    name: { en: 'Steel Gift Sets', hi: 'स्टील के गिफ्ट सेट' },
    desc: { en: 'Dinner sets, tiffins and containers in steel, ready for gifting.', hi: 'डिनर सेट, टिफिन और कंटेनर, गिफ्ट के लिए तैयार।' } },

  // Electronics
  { id: 7, category: 'Electronics', emoji: '🔥', tag: tags.new,
    name: { en: 'Induction Cooktop', hi: 'इंडक्शन कुकटॉप' },
    desc: { en: 'Energy-efficient induction cookers with touch controls.', hi: 'टच कंट्रोल वाले ऊर्जा-बचत इंडक्शन कुकर।' } },
  { id: 8, category: 'Electronics', emoji: '🌀', tag: tags.best,
    name: { en: 'Mixer Grinder', hi: 'मिक्सर ग्राइंडर' },
    desc: { en: 'Powerful 500-750W mixer grinders with multiple jars.', hi: 'कई जार के साथ 500-750W के दमदार मिक्सर ग्राइंडर।' } },
  { id: 9, category: 'Electronics', emoji: '🫖',
    name: { en: 'Electric Kettle', hi: 'इलेक्ट्रिक केतली' },
    desc: { en: 'Fast-boil stainless steel kettle with auto cut-off.', hi: 'ऑटो कट-ऑफ के साथ तेज़ उबलने वाली स्टील केतली।' } },
  { id: 10, category: 'Electronics', emoji: '🍚',
    name: { en: 'Rice Cooker', hi: 'राइस कुकर' },
    desc: { en: 'Easy one-touch cooking for perfect rice every time.', hi: 'हर बार परफेक्ट चावल, वन-टच कुकिंग।' } },
  { id: 11, category: 'Electronics', emoji: '🥪',
    name: { en: 'Sandwich Maker & Toaster', hi: 'सैंडविच मेकर और टोस्टर' },
    desc: { en: 'Quick breakfast makers for the whole family.', hi: 'पूरे परिवार के लिए झटपट नाश्ता।' } },

  // Steel
  { id: 12, category: 'Steel', emoji: '🍽️',
    name: { en: 'Stainless Steel Thali Set', hi: 'स्टेनलेस स्टील थाली सेट' },
    desc: { en: 'Durable 5-piece dinner set, mirror finish.', hi: 'टिकाऊ 5-पीस डिनर सेट, शीशे जैसी चमक।' } },
  { id: 13, category: 'Steel', emoji: '🍱',
    name: { en: 'Steel Tiffin Box (3 Tier)', hi: 'स्टील टिफिन बॉक्स (3 लेयर)' },
    desc: { en: 'Leak-proof, easy to carry and clean.', hi: 'लीक-प्रूफ, ले जाने और धोने में आसान।' } },

  // Cookware
  { id: 14, category: 'Cookware', emoji: '🍳',
    name: { en: 'Non-Stick Kadhai & Tawa', hi: 'नॉन-स्टिक कड़ाही और तवा' },
    desc: { en: 'Even heating, induction friendly, with lid.', hi: 'समान गर्मी, इंडक्शन के लिए उपयुक्त, ढक्कन सहित।' } },
  { id: 15, category: 'Cookware', emoji: '♨️',
    name: { en: 'Pressure Cooker', hi: 'प्रेशर कुकर' },
    desc: { en: 'Safe, durable cookers in 3 L to 10 L sizes.', hi: '3 से 10 लीटर साइज़ में सुरक्षित, टिकाऊ कुकर।' } },

  // Serveware
  { id: 16, category: 'Serveware', emoji: '🥛', tag: tags.borosil,
    name: { en: 'Glassware & Serving Sets', hi: 'ग्लासवेयर और सर्विंग सेट' },
    desc: { en: 'Borosil glassware, bowls and serving sets.', hi: 'बोरोसिल ग्लासवेयर, कटोरे और सर्विंग सेट।' } },

  // Storage
  { id: 17, category: 'Storage', emoji: '🫙',
    name: { en: 'Airtight Container Set', hi: 'एयरटाइट कंटेनर सेट' },
    desc: { en: 'Containers for grains, spices and snacks.', hi: 'अनाज, मसाले और नमकीन के लिए कंटेनर।' } },
  { id: 18, category: 'Storage', emoji: '☕',
    name: { en: 'Insulated Flask & Bottles', hi: 'इन्सुलेटेड फ्लास्क और बोतल' },
    desc: { en: 'Keeps drinks hot or cold for hours.', hi: 'पेय को घंटों गर्म या ठंडा रखे।' } },
]

export const features = [
  { icon: '✅',
    title: { en: 'Genuine Brands', hi: 'असली ब्रांड' },
    text: { en: 'Authorised Borosil distributor and dealer of Prestige, Hawkins, Bajaj, Havells and more.', hi: 'बोरोसिल के अधिकृत वितरक और प्रेस्टीज, हॉकिन्स, बजाज, हैवेल्स आदि के अधिकृत डीलर।' } },
  { icon: '🏺',
    title: { en: 'Complete Peetal Range', hi: 'पीतल की पूरी रेंज' },
    text: { en: 'From pooja items to heavy catering vessels, all in peetal.', hi: 'पूजा के सामान से लेकर बड़े केटरिंग बर्तन तक, सब पीतल में।' } },
  { icon: '⚡',
    title: { en: 'Latest Electronics', hi: 'नए इलेक्ट्रॉनिक्स' },
    text: { en: 'Induction cooktops, mixer grinders and more kitchen appliances.', hi: 'इंडक्शन कुकटॉप, मिक्सर ग्राइंडर और अन्य किचन अप्लायंसेस।' } },
  { icon: '🚚',
    title: { en: 'Wholesale & Scrap', hi: 'थोक और स्क्रैप' },
    text: { en: 'Wholesale deals for shops, hotels and caterers, and we buy scrap too.', hi: 'दुकानदारों, होटल और केटरर के लिए थोक सौदे, और हम स्क्रैप भी खरीदते हैं।' } },
]
