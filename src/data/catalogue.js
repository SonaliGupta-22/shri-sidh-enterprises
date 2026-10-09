// The full range: every kitchen item the shop sells, grouped by category.
// Each item is ['English name', 'हिंदी नाम']. To add an item, add a line to its category; to add a category, add a block.
const C = (id, en, hi, icon, items) => ({
  id, icon, name: { en, hi },
  items: items.map(([e, h]) => ({ en: e, hi: h })),
})

export const catalogue = {
  title: { en: 'Our Full Range', hi: 'हमारी पूरी रेंज' },
  sub: {
    en: 'Everything for your kitchen in one place. Tap any item to ask for its price on WhatsApp.',
    hi: 'आपकी रसोई का हर सामान एक ही जगह। किसी भी आइटम पर टैप करें और WhatsApp पर उसका भाव पूछें।',
  },
  search: { en: 'Search the full range...', hi: 'पूरी रेंज में खोजें...' },
  all: { en: 'All', hi: 'सभी' },
  none: { en: 'No item matches your search. Ask us, we may still have it!', hi: 'आपकी खोज से कोई आइटम नहीं मिला। हमसे पूछें, शायद हमारे पास हो!' },
  askMore: { en: 'Can\'t find it? Ask us', hi: 'नहीं मिला? हमसे पूछें' },
  waItem: { en: 'Hello, I want to know the price of: ', hi: 'नमस्ते, मुझे इसका भाव जानना है: ' },
  waMore: { en: 'Hello, I am looking for an item in: ', hi: 'नमस्ते, मुझे इस श्रेणी में एक सामान चाहिए: ' },
  count: { en: 'items', hi: 'आइटम' },
  categories: [
    C('cookware', 'Cookware', 'कुकवेयर', '🍳', [
      ['Pressure cooker', 'प्रेशर कुकर'], ['Kadhai', 'कड़ाही'], ['Non-stick kadhai', 'नॉन-स्टिक कड़ाही'], ['Tawa (roti)', 'तवा (रोटी)'],
      ['Dosa tawa', 'डोसा तवा'], ['Frying pan', 'फ्राइंग पैन'], ['Saucepan', 'सॉसपैन'], ['Milk pan', 'दूध का पैन'], ['Handi', 'हांडी'],
      ['Casserole', 'कैसरोल'], ['Tadka pan', 'तड़का पैन'], ['Idli maker', 'इडली मेकर'], ['Appam pan', 'अप्पम पैन'], ['Paniyaram pan', 'पनियारम पैन'],
      ['Multi kadai', 'मल्टी कड़ाही'], ['Stockpot', 'स्टॉकपॉट'], ['Cookware set', 'कुकवेयर सेट'], ['Induction base cookware', 'इंडक्शन बेस कुकवेयर'],
      ['Grill pan', 'ग्रिल पैन'], ['Steamer', 'स्टीमर'],
    ]),
    C('appliances', 'Kitchen appliances', 'किचन अप्लायंसेस', '🔌', [
      ['Mixer grinder', 'मिक्सर ग्राइंडर'], ['Induction cooktop', 'इंडक्शन कुकटॉप'], ['Gas stove', 'गैस स्टोव'], ['Electric kettle', 'इलेक्ट्रिक केतली'],
      ['Rice cooker', 'राइस कुकर'], ['Sandwich maker', 'सैंडविच मेकर'], ['OTG (oven toaster griller)', 'ओटीजी (ओवन टोस्टर ग्रिलर)'],
      ['Microwave oven', 'माइक्रोवेव ओवन'], ['Air fryer', 'एयर फ्रायर'], ['Toaster', 'टोस्टर'], ['Juicer', 'जूसर'], ['Hand blender', 'हैंड ब्लेंडर'],
      ['Food processor', 'फूड प्रोसेसर'], ['Chopper', 'चॉपर'], ['Roti maker', 'रोटी मेकर'], ['Wet grinder', 'वेट ग्राइंडर'], ['Coffee maker', 'कॉफी मेकर'],
      ['Egg boiler', 'एग बॉयलर'], ['Chimney', 'चिमनी'], ['Water purifier', 'वाटर प्यूरीफायर'], ['Fan', 'पंखा'],
    ]),
    C('steel', 'Steel utensils', 'स्टील के बर्तन', '🥣', [
      ['Thali', 'थाली'], ['Dinner set', 'डिनर सेट'], ['Plates', 'प्लेटें'], ['Katori (bowls)', 'कटोरी'], ['Glasses', 'गिलास'], ['Jug', 'जग'],
      ['Spoon set', 'चम्मच सेट'], ['Serving spoons', 'सर्विंग चम्मच'], ['Tiffin box', 'टिफिन बॉक्स'], ['Lunch box', 'लंच बॉक्स'],
      ['Casserole (hot pot)', 'कैसरोल (हॉट पॉट)'], ['Steel containers (dabba)', 'स्टील के डिब्बे'], ['Parat', 'परात'], ['Mixing bowls', 'मिक्सिंग बाउल'],
      ['Colander', 'कोलंडर (छलनी)'], ['Water bottle', 'पानी की बोतल'], ['Steel pot (bartan)', 'स्टील का बर्तन'], ['Idli stand', 'इडली स्टैंड'],
      ['Pateela', 'पतीला'], ['Bucket', 'बाल्टी'], ['Tray', 'ट्रे'],
    ]),
    C('peetal', 'Peetal / brass', 'पीतल', '🏺', [
      ['Handi', 'हांडी'], ['Patila', 'पतीला'], ['Kadhai', 'कड़ाही'], ['Lota', 'लोटा'], ['Glass', 'गिलास'], ['Jug', 'जग'], ['Thali', 'थाली'],
      ['Thali and bowl set', 'थाली और कटोरी सेट'], ['Degchi', 'देगची'], ['Bhagona', 'भगोना'], ['Pooja thali', 'पूजा थाली'], ['Diya', 'दीया'],
      ['Kalash', 'कलश'], ['Bell', 'घंटी'], ['Aarti set', 'आरती सेट'], ['Pooja lamp', 'पूजा का दीपक'], ['Tumbler', 'टम्बलर'], ['Surahi', 'सुराही'],
      ['Water pot', 'पानी का बर्तन'],
    ]),
    C('kansa', 'Kansa / bronze', 'कांसा', '🍽️', [
      ['Kansa thali set', 'कांसे का थाली सेट'], ['Kansa katori', 'कांसे की कटोरी'], ['Kansa glass', 'कांसे का गिलास'], ['Kansa spoon', 'कांसे का चम्मच'],
      ['Kansa bowl set', 'कांसे का कटोरा सेट'], ['Kansa plate', 'कांसे की प्लेट'], ['Kansa jug', 'कांसे का जग'],
    ]),
    C('copper', 'Copper', 'तांबा', '🧴', [
      ['Copper bottle', 'तांबे की बोतल'], ['Copper jug', 'तांबे का जग'], ['Copper glass', 'तांबे का गिलास'], ['Copper mug', 'तांबे का मग'],
      ['Copper pot (matka)', 'तांबे का मटका'], ['Copper bottle and glass set', 'तांबे की बोतल और गिलास सेट'], ['Copper kadhai', 'तांबे की कड़ाही'],
      ['Copper pan', 'तांबे का पैन'], ['Copper pooja items', 'तांबे का पूजा सामान'],
    ]),
    C('storage', 'Storage', 'स्टोरेज', '🫙', [
      ['Airtight containers', 'एयरटाइट कंटेनर'], ['Steel dabba set', 'स्टील डिब्बा सेट'], ['Glass jars', 'कांच के जार'], ['Masala box (spice box)', 'मसाला बॉक्स'],
      ['Atta storage', 'आटा स्टोरेज'], ['Plastic containers', 'प्लास्टिक कंटेनर'], ['Oil dispenser', 'ऑयल डिस्पेंसर'], ['Bread box', 'ब्रेड बॉक्स'],
      ['Roti box (hot case)', 'रोटी बॉक्स (हॉट केस)'], ['Water storage drum', 'वाटर स्टोरेज ड्रम'],
    ]),
    C('glass', 'Glass and dinnerware', 'कांच और क्रॉकरी', '🥛', [
      ['Glass set', 'ग्लास सेट'], ['Glass bowls', 'कांच के कटोरे'], ['Opalware dinner set', 'ओपलवेयर डिनर सेट'], ['Melamine dinner set', 'मेलामाइन डिनर सेट'],
      ['Cups and saucers', 'कप और प्लेट'], ['Mugs', 'मग'], ['Serving bowls', 'सर्विंग बाउल'], ['Baking dishes', 'बेकिंग डिश'], ['Glass jug', 'कांच का जग'],
      ['Tea set', 'चाय सेट'], ['Soup bowls', 'सूप बाउल'], ['Crockery set', 'क्रॉकरी सेट'],
    ]),
    C('bottles', 'Bottles and flasks', 'बोतल और फ्लास्क', '☕', [
      ['Insulated bottle', 'इन्सुलेटेड बोतल'], ['Flask (thermos)', 'फ्लास्क (थर्मस)'], ['Water bottle (steel)', 'स्टील की पानी की बोतल'],
      ['Water bottle (plastic)', 'प्लास्टिक की पानी की बोतल'], ['Glass bottle', 'कांच की बोतल'], ['Sipper', 'सिपर'], ['Kids bottle', 'बच्चों की बोतल'],
      ['Water jug with tap', 'नल वाला पानी का जग'],
    ]),
    C('tools', 'Kitchen tools', 'किचन टूल्स', '🔪', [
      ['Knife set', 'चाकू सेट'], ['Peeler', 'पीलर'], ['Chopping board', 'चॉपिंग बोर्ड'], ['Grater', 'कद्दूकस'], ['Masher', 'मैशर'], ['Ladle set', 'करछी सेट'],
      ['Tongs', 'चिमटा'], ['Belan (rolling pin)', 'बेलन'], ['Chakla-belan', 'चकला-बेलन'], ['Strainer', 'छन्नी'], ['Scissors', 'कैंची'], ['Can opener', 'कैन ओपनर'],
      ['Measuring cups', 'मापने के कप'], ['Whisk', 'व्हिस्क'], ['Spatula', 'स्पैचुला'], ['Tea strainer', 'चाय छन्नी'], ['Pizza cutter', 'पिज़्ज़ा कटर'],
    ]),
    C('pooja', 'Pooja items', 'पूजा सामान', '🪔', [
      ['Pooja thali', 'पूजा थाली'], ['Diya', 'दीया'], ['Kalash', 'कलश'], ['Aarti set', 'आरती सेट'], ['Incense holder', 'अगरबत्ती स्टैंड'], ['Bell', 'घंटी'],
      ['Pooja lamp', 'पूजा का दीपक'], ['Panchpatra', 'पंचपात्र'], ['Pooja kalash set', 'पूजा कलश सेट'], ['Brass plate', 'पीतल की प्लेट'],
    ]),
    C('catering', 'Catering and bulk', 'केटरिंग और थोक', '🍲', [
      ['Large degchi', 'बड़ी देगची'], ['Bhagona', 'भगोना'], ['Large kadhai', 'बड़ी कड़ाही'], ['Big ladles', 'बड़े करछे'], ['Serving spoons (large)', 'बड़े सर्विंग चम्मच'],
      ['Chafing dish', 'चैफिंग डिश'], ['Biryani handi', 'बिरयानी हांडी'], ['Tea urn', 'बड़ी चाय केतली'], ['Water cooler jug', 'वाटर कूलर जग'],
      ['Large containers', 'बड़े कंटेनर'], ['Serving trolley', 'सर्विंग ट्रॉली'],
    ]),
    C('cleaning', 'Cleaning and kitchen needs', 'सफाई और जरूरी सामान', '🧽', [
      ['Scrubber', 'स्क्रबर'], ['Dish rack', 'डिश रैक'], ['Dish drainer', 'डिश ड्रेनर'], ['Sink organiser', 'सिंक ऑर्गनाइज़र'], ['Kitchen towels', 'किचन तौलिए'],
      ['Apron', 'एप्रन'], ['Gloves', 'दस्ताने'], ['Dustbin', 'डस्टबिन'], ['Gas lighter', 'गैस लाइटर'], ['Gas regulator and pipe', 'गैस रेगुलेटर और पाइप'],
    ]),
    C('gifts', 'Gifts and sets', 'गिफ्ट और सेट', '🎁', [
      ['Gift sets (brass)', 'पीतल के गिफ्ट सेट'], ['Gift sets (kansa)', 'कांसे के गिफ्ट सेट'], ['Gift sets (copper)', 'तांबे के गिफ्ट सेट'],
      ['Gift sets (steel)', 'स्टील के गिफ्ट सेट'], ['Return gifts', 'रिटर्न गिफ्ट'], ['Wedding sets', 'शादी के सेट'], ['Dinner set combos', 'डिनर सेट कॉम्बो'],
      ['Housewarming sets', 'गृहप्रवेश सेट'],
    ]),
  ],
}
