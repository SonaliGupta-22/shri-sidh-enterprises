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
  // Messages that scroll along the slim festival strip, after the title.
  ticker: [
    { en: 'Dhanteras is the day to bring home new utensils', hi: 'धनतेरस पर नए बर्तन घर लाने की परंपरा है' },
    { en: 'Ask us for festival rates and ready gift packs', hi: 'त्योहारी भाव और तैयार गिफ्ट पैक के बारे में पूछें' },
    { en: 'Bulk orders taken for every occasion', hi: 'हर अवसर के लिए बल्क ऑर्डर लिए जाते हैं' },
  ],
  ctaShort: { en: 'WhatsApp', hi: 'WhatsApp' },
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
  { id: 23, category: 'Electronics', emoji: '🍞',
    name: { en: 'OTG (Oven Toaster Griller)', hi: 'ओटीजी (ओवन टोस्टर ग्रिलर)' },
    desc: { en: 'Bake, toast and grill cakes, pizzas and snacks at home.', hi: 'घर पर केक, पिज़्ज़ा और स्नैक्स बेक, टोस्ट और ग्रिल करें।' } },

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

// "How to order" steps.
export const orderSteps = {
  title: { en: 'How to Order', hi: 'ऑर्डर कैसे करें' },
  steps: [
    { title: { en: 'Choose', hi: 'चुनें' },
      text: { en: 'Browse the products here, or visit the shop in Kotla.', hi: 'यहाँ उत्पाद देखें, या कोटला में दुकान पर आएँ।' } },
    { title: { en: 'Ask', hi: 'पूछें' },
      text: { en: 'WhatsApp or call us for today\'s price and availability.', hi: 'आज का भाव और उपलब्धता जानने के लिए WhatsApp या कॉल करें।' } },
    { title: { en: 'Collect', hi: 'प्राप्त करें' },
      text: { en: 'Pick up from the shop. For bulk orders, tell us the occasion and quantity.', hi: 'दुकान से ले जाएँ। बल्क ऑर्डर के लिए अवसर और मात्रा बताएँ।' } },
  ],
}

// Gift ideas by occasion. Each button opens WhatsApp with the occasion filled in.
export const giftIdeas = {
  title: { en: 'Gift Ideas by Occasion', hi: 'अवसर के अनुसार गिफ्ट' },
  sub: { en: 'Brass, kansa, copper and steel gifts. Tell us the occasion and budget and we will help you choose.', hi: 'पीतल, कांसा, तांबा और स्टील के गिफ्ट। अवसर और बजट बताएँ, हम चुनने में मदद करेंगे।' },
  cta: { en: 'Ask on WhatsApp', hi: 'WhatsApp पर पूछें' },
  waMsg: { en: 'Hello, I am looking for a gift for: ', hi: 'नमस्ते, मुझे इस अवसर के लिए गिफ्ट चाहिए: ' },
  items: [
    { emoji: '🪔', name: { en: 'Diwali & Dhanteras', hi: 'दीपावली और धनतेरस' }, text: { en: 'New utensils and pooja items for a prosperous festival.', hi: 'समृद्ध त्योहार के लिए नए बर्तन और पूजा का सामान।' } },
    { emoji: '💍', name: { en: 'Weddings', hi: 'शादी' }, text: { en: 'Dinner sets, thali sets and return gifts for guests.', hi: 'डिनर सेट, थाली सेट और मेहमानों के लिए रिटर्न गिफ्ट।' } },
    { emoji: '🏠', name: { en: 'Housewarming', hi: 'गृहप्रवेश' }, text: { en: 'Kitchen starter sets and brass pooja items.', hi: 'रसोई के शुरुआती सेट और पीतल का पूजा सामान।' } },
    { emoji: '🎂', name: { en: 'Birthdays & Anniversaries', hi: 'जन्मदिन और सालगिरह' }, text: { en: 'Copper bottles, kansa sets and steel gift packs.', hi: 'तांबे की बोतल, कांसे के सेट और स्टील गिफ्ट पैक।' } },
    { emoji: '🎁', name: { en: 'Corporate Gifting', hi: 'कॉर्पोरेट गिफ्ट' }, text: { en: 'Bulk gift items for staff, clients and events.', hi: 'स्टाफ, ग्राहकों और कार्यक्रमों के लिए बल्क गिफ्ट।' } },
  ],
}

// FAQ. "kind" tells the component to build the answer from other data (address, hours, brands).
export const faq = {
  title: { en: 'Frequently Asked Questions', hi: 'अक्सर पूछे जाने वाले सवाल' },
  items: [
    { q: { en: 'Where is the shop?', hi: 'दुकान कहाँ है?' }, kind: 'address' },
    { q: { en: 'What are the shop timings?', hi: 'दुकान का समय क्या है?' }, kind: 'hours' },
    { q: { en: 'Which brands do you sell?', hi: 'आप कौन से ब्रांड बेचते हैं?' }, kind: 'brands' },
    { q: { en: 'How do I know the price?', hi: 'कीमत कैसे पता करें?' },
      a: { en: 'Prices change with the market rate, especially for brass and copper. Call or WhatsApp us for today\'s price.', hi: 'दाम बाज़ार भाव के अनुसार बदलते हैं, खासकर पीतल और तांबे के। आज का भाव जानने के लिए कॉल या WhatsApp करें।' } },
    { q: { en: 'Do you take bulk orders?', hi: 'क्या आप बल्क ऑर्डर लेते हैं?' },
      a: { en: 'Yes, for every kind of occasion: weddings, festivals, parties, hotels and catering. Send us the quantity on WhatsApp for wholesale rates.', hi: 'हाँ, हर तरह के अवसर के लिए: शादी, त्योहार, पार्टी, होटल और केटरिंग। थोक भाव के लिए WhatsApp पर मात्रा बताएँ।' } },
    { q: { en: 'Do you buy scrap?', hi: 'क्या आप स्क्रैप खरीदते हैं?' },
      a: { en: 'Yes. Bring your old utensils or scrap to the shop, or WhatsApp us to know today\'s rate.', hi: 'हाँ। पुराने बर्तन या स्क्रैप दुकान पर लाएँ, या आज का भाव जानने के लिए WhatsApp करें।' } },
  ],
}

// Sale and offers section. Replace or add REAL offers here.
// Each offer: emoji, tag (small label), badge (optional gold ribbon, e.g. { en: '10% OFF', hi: '10% छूट' }), title, text.
// Remove an offer by deleting its block; hide the whole section with enabled: false.
export const offers = {
  enabled: true,
  title: { en: 'Festival Offers & Deals', hi: 'त्योहार ऑफर और डील्स' },
  sub: { en: 'Diwali and Dhanteras are here. Ask us for the best rates, gift packs and bulk deals.', hi: 'दीपावली और धनतेरस आ गए हैं। सबसे अच्छे भाव, गिफ्ट पैक और थोक डील्स के बारे में पूछें।' },
  cta: { en: 'Ask on WhatsApp', hi: 'WhatsApp पर पूछें' },
  waMsg: { en: 'Hello, I want to know about this offer: ', hi: 'नमस्ते, मुझे इस ऑफर के बारे में जानना है: ' },
  note: { en: 'Offers and rates may change. Call or WhatsApp to confirm today\'s price.', hi: 'ऑफर और भाव बदल सकते हैं। आज का भाव पक्का करने के लिए कॉल या WhatsApp करें।' },
  items: [
    { emoji: '🪔', tag: { en: 'Festival', hi: 'त्योहार' },
      title: { en: 'Festival Rates', hi: 'त्योहारी भाव' },
      text: { en: 'Ask for festival rates on peetal, steel, copper and kitchen appliances.', hi: 'पीतल, स्टील, तांबे और किचन अप्लायंसेस पर त्योहारी भाव पूछें।' } },
    { emoji: '📦', tag: { en: 'Bulk', hi: 'थोक' },
      title: { en: 'Bulk & Wholesale Deals', hi: 'थोक और बल्क डील्स' },
      text: { en: 'Better rates on bulk orders for weddings, hotels, caterers and shopkeepers.', hi: 'शादी, होटल, केटरर और दुकानदारों के लिए बल्क ऑर्डर पर बेहतर भाव।' } },
    { emoji: '🎁', tag: { en: 'Gifts', hi: 'गिफ्ट' },
      title: { en: 'Diwali Gift Sets', hi: 'दीपावली गिफ्ट सेट' },
      text: { en: 'Brass, kansa, copper and steel gifts. Tell us your budget and we will help you choose.', hi: 'पीतल, कांसा, तांबा और स्टील के गिफ्ट। अपना बजट बताएँ, हम चुनने में मदद करेंगे।' } },
    { emoji: '♻️', tag: { en: 'Scrap', hi: 'स्क्रैप' },
      title: { en: 'Old Utensils & Scrap', hi: 'पुराने बर्तन और स्क्रैप' },
      text: { en: 'Bring your old utensils or scrap and get the rate of the day.', hi: 'पुराने बर्तन या स्क्रैप लाएँ और उस दिन का भाव पाएँ।' } },
  ],
}
