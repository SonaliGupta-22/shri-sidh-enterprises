import { createContext, useContext, useEffect, useState } from 'react'

const ui = {
  nav: {
    products: { en: 'Products', hi: 'उत्पाद' },
    why: { en: 'Why Us', hi: 'हमें क्यों चुनें' },
    about: { en: 'About', hi: 'हमारे बारे में' },
    contact: { en: 'Contact', hi: 'संपर्क' },
    call: { en: 'Call Now', hi: 'कॉल करें' },
  },
  hero: {
    badge: { en: 'Brass • Kansa • Copper • Steel • Gifts', hi: 'पीतल • कांसा • तांबा • स्टील • गिफ्ट' },
    text: {
      en: 'Authorised Borosil distributor and dealer of Prestige, Hawkins, Bajaj, Havells, Kraft and more. All types of gift items in brass, kansa, copper and steel.',
      hi: 'बोरोसिल के अधिकृत वितरक और प्रेस्टीज, हॉकिन्स, बजाज, हैवेल्स, क्राफ्ट आदि के अधिकृत डीलर। पीतल, कांसा, तांबा और स्टील में हर तरह के गिफ्ट आइटम।',
    },
    browse: { en: 'Browse Products', hi: 'उत्पाद देखें' },
    quote: { en: 'Get a Quote', hi: 'कोटेशन पाएँ' },
    highlights: [
      { title: { en: 'Peetal', hi: 'पीतल' }, sub: { en: 'Full Range', hi: 'पूरी रेंज' } },
      { title: { en: 'Borosil', hi: 'Borosil' }, sub: { en: 'Authorised Distributor', hi: 'अधिकृत वितरक' } },
      { title: { en: 'Wholesale', hi: 'थोक' }, sub: { en: '& Retail Deals', hi: 'और खुदरा सौदे' } },
    ],
  },
  brands: {
    distributor: { en: 'Authorised Distributor', hi: 'अधिकृत वितरक' },
    dealer: { en: 'Authorised Dealer', hi: 'अधिकृत डीलर' },
  },
  products: {
    title: { en: 'Our Products', hi: 'हमारे उत्पाद' },
    sub: { en: 'Find the perfect utensil for your kitchen, pooja room or business.', hi: 'अपनी रसोई, पूजा घर या व्यापार के लिए सही बर्तन चुनें।' },
    priceNote: { en: 'Prices vary with the market rate. Call or WhatsApp us for today\'s price.', hi: 'दाम बाज़ार भाव के अनुसार बदलते हैं। आज का भाव जानने के लिए कॉल या WhatsApp करें।' },
    search: { en: 'Search utensils...', hi: 'बर्तन खोजें...' },
    empty: { en: 'No products found. Try a different search.', hi: 'कोई उत्पाद नहीं मिला। दूसरा शब्द खोजें।' },
    enquire: { en: 'Enquire on WhatsApp', hi: 'WhatsApp पर पूछें' },
    waMsg: { en: 'Hello, I want to know the price of: ', hi: 'नमस्ते, मुझे इसकी कीमत जाननी है: ' },
  },
  wholesale: {
    title: { en: 'Wholesale Deals', hi: 'थोक सौदे' },
    text: {
      en: 'Shopkeepers, hotels, caterers and event planners: get special wholesale rates on utensils and kitchen items in bulk.',
      hi: 'दुकानदार, होटल, केटरर और इवेंट वालों के लिए बर्तन और किचन सामान पर थोक में खास रेट।',
    },
    cta: { en: 'Ask Wholesale Rate on WhatsApp', hi: 'WhatsApp पर थोक भाव पूछें' },
    waMsg: { en: 'Hello, I am interested in wholesale deals. Please share the rates.', hi: 'नमस्ते, मुझे थोक में सामान लेना है। कृपया भाव बताएँ।' },
  },
  scrap: {
    title: { en: 'We Also Buy Scrap', hi: 'हम स्क्रैप (कबाड़) भी खरीदते हैं' },
    text: {
      en: 'Have old utensils or scrap at home or in your business? Bring it to us and get a fair rate. Call or WhatsApp to know today\'s price.',
      hi: 'घर या दुकान में पुराने बर्तन या स्क्रैप पड़ा है? हमारे पास लाएँ और सही दाम पाएँ। आज का भाव जानने के लिए कॉल या WhatsApp करें।',
    },
    cta: { en: 'Ask Scrap Rate on WhatsApp', hi: 'WhatsApp पर स्क्रैप का भाव पूछें' },
    waMsg: { en: 'Hello, I want to sell scrap. Please tell me today\'s rate.', hi: 'नमस्ते, मुझे स्क्रैप बेचना है। कृपया आज का भाव बताएँ।' },
  },
  why: { title: { en: 'Why Choose Us', hi: 'हमें क्यों चुनें' } },
  about: {
    title: { en: 'About Shri Sidh Enterprises', hi: 'श्री सिद्ध एंटरप्राइजेज के बारे में' },
    p1: {
      en: 'We are a family-run utensil business dedicated to bringing quality and value to every kitchen. From everyday steel plates to traditional peetal ware, kitchen electronics and heavy catering vessels, we stock products built to last.',
      hi: 'हम एक पारिवारिक बर्तन व्यापार हैं जो हर रसोई तक क्वालिटी और सही दाम पहुँचाते हैं। रोज़ की स्टील थाली से लेकर पारंपरिक पीतल के बर्तन, किचन इलेक्ट्रॉनिक्स और बड़े केटरिंग बर्तन तक, हम टिकाऊ सामान रखते हैं।',
    },
    p2: {
      en: 'Whether you are setting up a new home, planning a wedding, or running a hotel, our team will help you choose the right utensils at the right price.',
      hi: 'चाहे नया घर बसाना हो, शादी की तैयारी हो या होटल चलाना हो, हमारी टीम सही दाम पर सही बर्तन चुनने में आपकी मदद करेगी।',
    },
  },
  contact: {
    title: { en: 'Contact Us', hi: 'संपर्क करें' },
    sub: { en: 'Visit our shop or send an enquiry. We reply quickly!', hi: 'दुकान पर आएँ या पूछताछ भेजें। हम जल्दी जवाब देते हैं!' },
    address: { en: 'Address', hi: 'पता' },
    phone: { en: 'Phone', hi: 'फ़ोन' },
    email: { en: 'Email', hi: 'ईमेल' },
    hours: { en: 'Hours', hi: 'समय' },
    name: { en: 'Your name', hi: 'आपका नाम' },
    phonePh: { en: 'Phone number', hi: 'फ़ोन नंबर' },
    message: { en: 'What are you looking for?', hi: 'आपको क्या चाहिए?' },
    send: { en: 'Send via WhatsApp', hi: 'WhatsApp पर भेजें' },
    directions: { en: 'Get Directions', hi: 'रास्ता देखें' },
    waMsg: { en: 'Hello, I am {name} ({phone}).\n{message}', hi: 'नमस्ते, मैं {name} ({phone}) हूँ।\n{message}' },
  },
  footer: { rights: { en: 'All rights reserved.', hi: 'सर्वाधिकार सुरक्षित।' } },
  floatMsg: { en: 'Hello, I would like to enquire about your utensils.', hi: 'नमस्ते, मुझे आपके बर्तनों के बारे में पूछना है।' },
}

const LangContext = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem('lang') === 'hi' ? 'hi' : 'en' } catch { return 'en' }
  })

  useEffect(() => {
    document.documentElement.lang = lang
    try { localStorage.setItem('lang', lang) } catch { /* ignore */ }
  }, [lang])

  // pick(obj) returns the text for the current language, falling back to English.
  const pick = (obj) => (obj && typeof obj === 'object' ? obj[lang] ?? obj.en : obj)
  return <LangContext.Provider value={{ lang, setLang, pick, ui }}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)
