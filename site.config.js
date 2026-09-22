/* =========================================================================
   Diwan Aljamal — salon mockup template
   EVERYTHING brand-specific lives in this file. To reskin for another salon:
   edit the values below and swap the files in /assets. Nothing else changes.
   Every visible string is { ar, en }. Arabic is the default language.
   ========================================================================= */

window.SITE = {

  /* ---------------------------------------------------------------- brand */
  brand: {
    name:      { ar: 'ديوان الجمال', en: 'Diwan Aljamal' },
    wordmark:  { ar: 'ديوان الجمال', en: 'Diwan Aljamal' },
    kicker:    { ar: 'صالون تجميل نسائي · جدة', en: 'Women’s beauty salon · Jeddah' },
    tagline:   { ar: 'ميكب · عرايس · شعر · معالجات · منكير وبديكير',
                 en: 'Makeup · Bridal · Hair · Treatments · Mani & Pedi' },
    // Leave logo as '' to fall back to a typographic wordmark.
    logo: 'assets/brand/logo.png',
    logoWidth: 760,
    logoHeight: 249,
    logoAlt: { ar: 'شعار ديوان الجمال', en: 'Diwan Aljamal logo' }
  },

  /* -------------------------------------------------------------- contact */
  contact: {
    whatsapp:        '966565633561',          // international, digits only
    whatsappDisplay: '0565633561',
    instagram:       { handle: '@diwan_aljmal2', url: 'https://www.instagram.com/diwan_aljmal2/' },
    // Snapchat handle unknown — leave empty and the site shows a placeholder line.
    snapchat:        { handle: '', url: '' },
    // Google Maps link unknown — placeholder until the salon confirms it.
    mapUrl:          '',
    area:    { ar: 'حي طيبة الرحيلي، جدة', en: 'Taiba Al-Ruhaili, Jeddah' },
    city:    { ar: 'جدة', en: 'Jeddah' },
    country: { ar: 'السعودية', en: 'Saudi Arabia' },
    welcome: { ar: 'نستقبلكم بكل حب', en: 'Welcomed with love' }
  },

  /* ---------------------------------------------------------------- hours */
  // 24h strings. A close that is smaller than open means "after midnight".
  hours: {
    timezone: 'Asia/Riyadh',
    open:  '14:00',
    close: '02:00',
    days:      { ar: 'يومياً', en: 'Daily' },
    openWord:  { ar: '2 الظهر', en: '2:00 PM' },
    closeWord: { ar: '2 الفجر', en: '2:00 AM' },
    line:      { ar: 'يومياً من 2 الظهر إلى 2 الفجر', en: 'Daily, 2:00 PM – 2:00 AM' }
  },

  /* --------------------------------------------------------------- colors */
  // Applied as CSS custom properties on <html> at load.
  colors: {
    '--bg':        '#F7F1EE',  // blush white
    '--alt':       '#EADCD6',  // dusty rose-beige (from the logo)
    '--ink':       '#3A2A27',  // deep cocoa
    '--ink-soft':  '#6E5A55',
    '--cta':       '#8C5E57',  // muted rose-cocoa, white text passes 4.5:1
    '--cta-deep':  '#74463F',
    '--gold':      '#9C7C4C',  // the logo's antique gold — hairlines and the branch motif
    '--gold-ink':  '#775C32',  // the same gold, darkened for small text (4.5:1 on both surfaces)
    '--rose':      '#B06E7C',  // the logo's script rose — tiny accents only
    '--dark':      '#2E2220',  // offers band
    '--line':      'rgba(58, 42, 39, 0.12)'
  },

  /* ---------------------------------------------------------------- fonts */
  fonts: {
    displayAr: "'Aref Ruqaa', serif",
    bodyAr:    "'IBM Plex Sans Arabic', system-ui, sans-serif",
    displayEn: "'Marcellus', serif",
    bodyEn:    "'IBM Plex Sans', system-ui, sans-serif"
  },

  currency: { ar: 'ر.س', en: 'SAR' },

  /* ------------------------------------------------------------------ seo */
  seo: {
    url: 'https://diwan-aljmal.netlify.app/',
    title: {
      ar: 'ديوان الجمال | صالون تجميل وميكب عرايس في جدة – حي طيبة الرحيلي',
      en: 'Diwan Aljamal | Beauty salon & bridal makeup in Jeddah – Taiba Al-Ruhaili'
    },
    description: {
      ar: 'صالون ديوان الجمال في حي طيبة الرحيلي بجدة: ميكب سهرة وعرايس، تسريحات، معالجات شعر، منكير وبديكير. الأسعار واضحة والحجز مباشرة عبر الواتساب.',
      en: 'Diwan Aljamal in Taiba Al-Ruhaili, Jeddah: evening and bridal makeup, hair styling, hair treatments, manicure and pedicure. Clear prices, book straight on WhatsApp.'
    },
    ogImage: 'assets/og.jpg'
  },

  /* ------------------------------------------------------- services (the diwan menu)
     Each item is a "verse": name · leader · price. Prices are starting prices. */
  services: [
    {
      id: 'makeup',
      title: { ar: 'الميكب', en: 'Makeup' },
      note:  { ar: 'لوكات تناسب السهرة والمناسبة والتصوير', en: 'Looks for evenings, occasions and photos' },
      items: [
        { id: 'mk-soiree', price: 350, duration: { ar: '90 دقيقة', en: '90 min' },
          name: { ar: 'ميكب سهرة', en: 'Evening makeup' },
          desc: { ar: 'لوك كامل بثبات يمشي معكِ من أول السهرة لآخرها.', en: 'A full look that holds from the first hour to the last.' } },
        { id: 'mk-soft', price: 250, duration: { ar: '60 دقيقة', en: '60 min' },
          name: { ar: 'ميكب ناعم', en: 'Soft makeup' },
          desc: { ar: 'لمسة خفيفة تبيّن ملامحكِ وتطلع طبيعية بالصور.', en: 'A light touch that reads natural in photos.' } },
        { id: 'mk-lashes', price: 60, duration: { ar: '20 دقيقة', en: '20 min' },
          name: { ar: 'رموش', en: 'Lashes' },
          desc: { ar: 'رموش خفيفة أو كثيفة، على حسب اللوك اللي تبينه.', en: 'Light or full lashes, to match the look.' } }
      ]
    },
    {
      id: 'hair',
      title: { ar: 'الشعر', en: 'Hair' },
      note:  { ar: 'تصفيف وتسريحات بثبات يوم كامل', en: 'Styling that lasts the whole day' },
      items: [
        { id: 'hr-blow', price: 80, duration: { ar: '45 دقيقة', en: '45 min' },
          name: { ar: 'سشوار', en: 'Blow-dry' },
          desc: { ar: 'غسيل وتصفيف بسشوار ناعم ولمعة تبقى معكِ أيام.', en: 'Wash and a smooth blow-dry with shine that stays.' } },
        { id: 'hr-updo', price: 200, duration: { ar: '60 دقيقة', en: '60 min' },
          name: { ar: 'تسريحة', en: 'Updo' },
          desc: { ar: 'تسريحة مناسبات مرفوعة أو منسدلة، ثابتة طول اليوم.', en: 'An occasion updo or soft down-style, pinned to last.' } },
        { id: 'hr-wavy', price: 150, duration: { ar: '45 دقيقة', en: '45 min' },
          name: { ar: 'ويفي', en: 'Waves' },
          desc: { ar: 'ويفات ناعمة أو كيرلي واضح — أنتِ تختارين الدرجة.', en: 'Soft waves or defined curls — you pick.' } }
      ]
    },
    {
      id: 'treatments',
      title: { ar: 'معالجات الشعر', en: 'Hair treatments' },
      note:  { ar: 'للشعر المصبوغ والجاف والمتقصّف', en: 'For coloured, dry or brittle hair' },
      items: [
        { id: 'tr-protein', price: 450, duration: { ar: '3 ساعات', en: '3 hrs' },
          name: { ar: 'بروتين', en: 'Protein' },
          desc: { ar: 'يرجّع للشعر نعومته ولمعته ويقلّل الهيشان.', en: 'Brings back softness and shine, calms frizz.' } },
        { id: 'tr-keratin', price: 500, duration: { ar: '3 ساعات', en: '3 hrs' },
          name: { ar: 'كيراتين', en: 'Keratin' },
          desc: { ar: 'فرد وتنعيم يدوم شهور مع عناية بسيطة بالبيت.', en: 'Smoothing that lasts months with simple home care.' } },
        { id: 'tr-oil', price: 120, duration: { ar: '40 دقيقة', en: '40 min' },
          name: { ar: 'حمام زيت', en: 'Oil bath' },
          desc: { ar: 'ترطيب عميق بزيوت دافية للشعر الجاف.', en: 'Deep conditioning with warm oils for dry hair.' } }
      ]
    },
    {
      id: 'nails',
      title: { ar: 'المنكير والبديكير', en: 'Mani & pedi' },
      note:  { ar: 'أدوات معقّمة لكل عميلة', en: 'Sterilised tools for every guest' },
      items: [
        { id: 'nl-mani', price: 80, duration: { ar: '45 دقيقة', en: '45 min' },
          name: { ar: 'منكير', en: 'Manicure' },
          desc: { ar: 'تنظيف وتشكيل وتلميع، مع لون من اختياركِ.', en: 'Shaping, cuticle care and polish in your colour.' } },
        { id: 'nl-pedi', price: 100, duration: { ar: '50 دقيقة', en: '50 min' },
          name: { ar: 'بديكير', en: 'Pedicure' },
          desc: { ar: 'عناية كاملة بالأقدام مع ترطيب وتدليك خفيف.', en: 'Full foot care with a light massage and moisturiser.' } },
        { id: 'nl-both', price: 160, duration: { ar: '90 دقيقة', en: '90 min' },
          name: { ar: 'منكير وبديكير', en: 'Mani + pedi' },
          desc: { ar: 'الجلستين ورا بعض، وبسعر أوفر من المنفصل.', en: 'Both sessions together, for less than separately.' } }
      ]
    }
  ],

  /* --------------------------------------------------------------- brides */
  bridal: {
    eyebrow: { ar: 'عرايسنا', en: 'Our brides' },
    title:   { ar: 'ليلتكِ تبدأ من هنا', en: 'Your night starts here' },
    body: {
      ar: 'نجهّزكِ على راحتكِ من البداية: نتفق على اللوك قبل الموعد، ونحجز لكِ وقت كافي بدون استعجال — لا للعروس ولا للمرافقات.',
      en: 'We prepare you without rushing: we agree on the look beforehand and keep enough time on the day — for you and for the women with you.'
    },
    deposit: {
      ar: 'حجز العروس يثبت بعربون، والباقي يوم الموعد.',
      en: 'Bridal bookings are confirmed with a deposit; the rest is paid on the day.'
    },
    cta: { ar: 'احجزي موعد عروس', en: 'Book a bridal appointment' },
    images: [
      { src: 'assets/bridal-hero.webp', w: 1600, h: 1100,
        alt: { ar: 'تسريحة عروس مضفّرة بتفاصيل زهور بيضاء', en: 'A braided bridal updo dressed with small white flowers' } },
      { src: 'assets/bridal-side.webp', w: 900, h: 1150,
        alt: { ar: 'عروس بعد الميكب والتسريحة داخل الصالون', en: 'A bride after makeup and styling inside the salon' } }
    ],
    packages: [
      { id: 'pk-bride', price: 1200,
        duration: { ar: 'حوالي 4 ساعات', en: 'about 4 hrs' },
        name: { ar: 'باقة العروس', en: 'The bride' },
        line: { ar: 'يومكِ كامل من أول تسريحة لآخر لمسة', en: 'Your whole day, first pin to last touch' },
        includes: {
          ar: ['ميكب عروس كامل', 'تسريحة عروس', 'رموش', 'اتفاق على اللوك قبل الموعد', 'لمسات أخيرة قبل الخروج'],
          en: ['Full bridal makeup', 'Bridal hair', 'Lashes', 'Look agreed beforehand', 'Final touch-ups before you leave']
        } },
      { id: 'pk-queen', price: 850,
        duration: { ar: 'حوالي ساعتين ونص', en: 'about 2.5 hrs' },
        name: { ar: 'باقة الملكة والخطوبة', en: 'Engagement & henna' },
        line: { ar: 'لليلة الملكة أو الخطوبة أو الحنّة', en: 'For the engagement, henna or milka night' },
        includes: {
          ar: ['ميكب سهرة مكثّف', 'تسريحة مناسبات', 'رموش'],
          en: ['Rich evening makeup', 'Occasion hair', 'Lashes']
        } },
      { id: 'pk-guests', price: 220,
        duration: { ar: 'حوالي ساعة ونص', en: 'about 1.5 hrs' },
        name: { ar: 'باقة المرافقات', en: 'For the women with you' },
        line: { ar: 'للأم والأخوات والصديقات — السعر للواحدة', en: 'Mother, sisters, friends — price per person' },
        includes: {
          ar: ['ميكب ناعم أو سهرة', 'تسريحة أو سشوار'],
          en: ['Soft or evening makeup', 'Updo or blow-dry']
        } }
    ]
  },

  /* --------------------------------------------------------------- offers */
  offers: {
    eyebrow: { ar: 'عروضنا', en: 'Offers' },
    title:   { ar: 'عروض هذا الشهر', en: 'This month at the salon' },
    note:    { ar: 'العروض توضيحية للنموذج، وتُستبدل بعروضكم الحقيقية.', en: 'Illustrative offers for the mockup — replaced with the salon’s real ones.' },
    items: [
      { id: 'of-bride',
        title:  { ar: 'حجز العروس المبكّر', en: 'Early bridal booking' },
        detail: { ar: 'خصم 15% على باقة العروس إذا حجزتِ قبل الموعد بشهر.', en: '15% off the bride package when you book a month ahead.' },
        ends:   { ar: 'ينتهي 31 أكتوبر 2026', en: 'Ends 31 October 2026' } },
      { id: 'of-nails',
        title:  { ar: 'يوم الجمعة للعناية', en: 'Friday care day' },
        detail: { ar: 'منكير وبديكير وسشوار بـ 280 ر.س بدل 340.', en: 'Mani, pedi and blow-dry for SAR 280 instead of 340.' },
        ends:   { ar: 'ينتهي 15 نوفمبر 2026', en: 'Ends 15 November 2026' } },
      { id: 'of-treat',
        title:  { ar: 'مع كل معالجة', en: 'With every treatment' },
        detail: { ar: 'حمام زيت مجاني مع البروتين أو الكيراتين.', en: 'A free oil bath with protein or keratin.' },
        ends:   { ar: 'ينتهي 30 نوفمبر 2026', en: 'Ends 30 November 2026' } }
    ]
  },

  /* -------------------------------------------------------------- gallery */
  galleryFilters: [
    { id: 'all',    label: { ar: 'الكل', en: 'All' } },
    { id: 'bride',  label: { ar: 'العرايس', en: 'Brides' } },
    { id: 'makeup', label: { ar: 'الميكب', en: 'Makeup' } },
    { id: 'hair',   label: { ar: 'الشعر', en: 'Hair' } }
  ],
  gallery: [
    { src: 'assets/gallery/bride-2.webp',  w: 900,  h: 1125, cat: 'bride',
      alt: { ar: 'عروس بطرحة طويلة وإضاءة دافية', en: 'Bride under a long veil in warm light' } },
    { type: 'video', src: 'assets/video/makeup.mp4', poster: 'assets/video/makeup-poster.webp', w: 900, h: 1125, cat: 'makeup',
      alt: { ar: 'مقطع قصير من تطبيق الميكب على العين', en: 'Short clip of eye makeup being applied' } },
    { src: 'assets/gallery/hair-1.webp',   w: 900,  h: 1350, cat: 'hair',
      alt: { ar: 'تصفيف ويفي بمكواة الشعر', en: 'Waves being shaped with a curling iron' } },
    { src: 'assets/gallery/makeup-2.webp', w: 900,  h: 1200, cat: 'makeup',
      alt: { ar: 'عين بميكب ذهبي ناعم خلف تول', en: 'Eye with soft golden makeup behind tulle' } },
    { src: 'assets/gallery/bride-1.webp',  w: 1000, h: 750,  cat: 'bride',
      alt: { ar: 'تفاصيل دانتيل فستان العروس', en: 'Lace detail on a bridal dress' } },
    { src: 'assets/gallery/hair-2.webp',   w: 900,  h: 1125, cat: 'hair',
      alt: { ar: 'شعر طويل لامع بعد المعالجة', en: 'Long glossy hair after a treatment' } },
    { type: 'video', src: 'assets/video/hair.mp4', poster: 'assets/video/hair-poster.webp', w: 900, h: 1125, cat: 'hair',
      alt: { ar: 'مقطع قصير من غسيل الشعر قبل المعالجة', en: 'Short clip of a hair wash before treatment' } },
    { src: 'assets/gallery/makeup-3.webp', w: 900,  h: 1125, cat: 'makeup',
      alt: { ar: 'لوك ميكب سهرة بألوان دافية', en: 'Evening makeup look in warm tones' } },
    { src: 'assets/gallery/bride-3.webp',  w: 900,  h: 900,  cat: 'bride',
      alt: { ar: 'تطريز وتفاصيل لؤلؤ على فستان عروس', en: 'Embroidery and pearl detail on a bridal gown' } },
    { src: 'assets/gallery/hair-3.webp',   w: 900,  h: 1200, cat: 'hair',
      alt: { ar: 'تسريحة ويفي ناعمة بعد التصفيف', en: 'Soft waves finished in the salon' } }
  ],

  /* -------------------------------------------------------------- reviews */
  reviews: {
    eyebrow: { ar: 'آرائكم', en: 'Reviews' },
    title:   { ar: 'كلام عميلاتنا', en: 'What guests say' },
    note:    { ar: 'آراء توضيحية، تُستبدل بآراء عميلاتكم الحقيقية.', en: 'Illustrative reviews — replaced with the salon’s real ones.' },
    items: [
      { name: { ar: 'نورة', en: 'Noura' }, service: { ar: 'ميكب عروس', en: 'Bridal makeup' },
        text: { ar: 'الميكب ثبت من العصر لين آخر الحفلة، وما احتجت أرتّب شي. والبنات كلهن سألوني وين سويته.',
                en: 'My makeup held from afternoon until the party ended, and I never had to fix a thing.' } },
      { name: { ar: 'ريم', en: 'Reem' }, service: { ar: 'كيراتين', en: 'Keratin' },
        text: { ar: 'شعري كان متقصّف بعد الصبغة، وبعد الكيراتين رجع ناعم ولامع. شرحوا لي كيف أعتني فيه بعدها.',
                en: 'My hair was brittle after colouring. After the keratin it came back soft, and they explained the aftercare.' } },
      { name: { ar: 'أفنان', en: 'Afnan' }, service: { ar: 'منكير وبديكير', en: 'Mani & pedi' },
        text: { ar: 'المكان نظيف والأدوات معقّمة قدامي، وهذا اللي يفرق عندي. والجلسة كانت مريحة.',
                en: 'The place is clean and tools are sterilised in front of you — that is what matters to me.' } },
      { name: { ar: 'سارة', en: 'Sara' }, service: { ar: 'تسريحة', en: 'Updo' },
        text: { ar: 'جيت متأخرة وقبل العشاء بساعة، وطلعت بتسريحة أحلى من اللي بالصورة اللي وريتهم إياها.',
                en: 'I came late, an hour before dinner, and left with an updo better than the photo I showed them.' } }
    ]
  },

  /* ---------------------------------------------- booking (WhatsApp order) */
  booking: {
    slotMinutes: 30,
    depositNote: { ar: 'حجز العروس يثبت بعربون يتفق عليه بالواتساب.', en: 'Bridal bookings are confirmed with a deposit agreed on WhatsApp.' },
    trust: [
      { title: { ar: 'أسعار واضحة', en: 'Clear prices' },
        body:  { ar: 'كل خدمة وسعرها معروضة قبل ما ترسلين الطلب.', en: 'Every service and price is shown before you send.' } },
      { title: { ar: 'احجزي بأي وقت', en: 'Book any time' },
        body:  { ar: 'أرسلي طلبكِ ليل أو نهار، ونرجع لكِ بالتأكيد.', en: 'Send day or night; we come back to confirm.' } },
      { title: { ar: 'تفاصيلكِ توصل كاملة', en: 'Your details arrive complete' },
        body:  { ar: 'الخدمات والتاريخ والوقت واسمكِ برسالة وحدة.', en: 'Services, date, time and name in one message.' } }
    ]
  },

  /* ------------------------------------------------------------------- ui
     Interface strings. Anything the visitor reads that is not content above. */
  ui: {
    demoBanner: {
      ar: 'هذا نموذج مبدئي لموقع ديوان الجمال، الصور والأسعار توضيحية وقابلة للتعديل بالكامل.',
      en: 'This is a draft mockup for Diwan Aljamal — images and prices are illustrative and fully editable.'
    },
    skip:       { ar: 'تخطّي إلى الخدمات', en: 'Skip to services' },
    langSwitch: { ar: 'Switch to English', en: 'التبديل إلى العربية' },
    langLabel:  { ar: 'EN', en: 'ع' },
    openMenu:   { ar: 'فتح القائمة', en: 'Open menu' },
    closeMenu:  { ar: 'إغلاق القائمة', en: 'Close menu' },
    nav: [
      { href: '#services', label: { ar: 'الخدمات',  en: 'Services' } },
      { href: '#brides',   label: { ar: 'العرايس',  en: 'Brides' } },
      { href: '#offers',   label: { ar: 'العروض',   en: 'Offers' } },
      { href: '#work',     label: { ar: 'أعمالنا',  en: 'Our work' } },
      { href: '#booking',  label: { ar: 'احجزي',    en: 'Book' } }
    ],
    ctaBook:    { ar: 'احجزي موعدكِ', en: 'Book your appointment' },
    // the slow band that runs between the brides and the offers
    marquee: [
      { ar: 'ميكب سهرة', en: 'Evening makeup' },
      { ar: 'ميكب عرايس', en: 'Bridal makeup' },
      { ar: 'تسريحات', en: 'Hair styling' },
      { ar: 'بروتين وكيراتين', en: 'Protein & keratin' },
      { ar: 'حمام زيت', en: 'Oil bath' },
      { ar: 'منكير وبديكير', en: 'Mani & pedi' },
      { ar: 'رموش', en: 'Lashes' }
    ],
    ctaPrices:  { ar: 'شوفي الخدمات والأسعار', en: 'See services & prices' },
    ctaWhats:   { ar: 'راسلينا واتساب', en: 'Message us on WhatsApp' },
    whatsAria:  { ar: 'افتحي محادثة واتساب مع ديوان الجمال', en: 'Open a WhatsApp chat with Diwan Aljamal' },

    hero: {
      eyebrow:  { ar: 'صالون نسائي · حي طيبة الرحيلي، جدة', en: 'Women’s salon · Taiba Al-Ruhaili, Jeddah' },
      title:    { ar: 'لكل إطلالة قصيدتها', en: 'Every look has its verse' },
      sub: {
        ar: 'ميكب، تسريحات، ومعالجات شعر في حي طيبة الرحيلي بجدة. شوفي الخدمات والأسعار واحجزي موعدكِ مباشرة، من غير انتظار الرد.',
        en: 'Makeup, hair and treatments in Taiba Al-Ruhaili, Jeddah. See the services and prices, and book straight away — no waiting for a reply.'
      },
      imageAlt: { ar: 'عروس بفستان أبيض وطرحة عند نافذة بإضاءة ناعمة', en: 'Bride in a white dress and veil by a softly lit window' },
      facts: [
        { ar: 'الأسعار واضحة قبل ما تحجزين', en: 'Prices shown before you book' },
        { ar: 'طلبكِ يوصل كامل بالواتساب', en: 'Your request arrives complete on WhatsApp' },
        { ar: 'نجهّز العروس ومرافقاتها', en: 'For the bride and everyone with her' }
      ]
    },

    statusOpen:   { ar: 'مفتوح الحين', en: 'Open now' },
    statusClosed: { ar: 'مغلق الحين', en: 'Closed now' },
    statusClosesAt: { ar: 'يسكّر 2 الفجر', en: 'closes 2:00 AM' },
    statusOpensAt:  { ar: 'نفتح 2 الظهر', en: 'opens 2:00 PM' },

    services: {
      eyebrow: { ar: 'الخدمات والأسعار', en: 'Services & prices' },
      title:   { ar: 'ديوان الخدمات', en: 'The book of services' },
      body: {
        ar: 'كل خدمة مكتوبة بسعرها ومدتها، مثل بيت شعر: الاسم على جهة والسعر على الجهة الثانية. اختاري اللي يناسبكِ وأضيفيه لطلبكِ.',
        en: 'Each service is set like a line of verse — the name on one side, the price on the other. Pick what suits you and add it to your request.'
      },
      from:      { ar: 'يبدأ من', en: 'from' },
      addBtn:    { ar: 'أضيفي للطلب', en: 'Add to request' },
      addedBtn:  { ar: 'مضافة ✓', en: 'Added ✓' },
      imageAlt:  { ar: 'أظافر بلون طبيعي بعد جلسة منكير', en: 'Natural-toned nails after a manicure' },
      footnote:  { ar: '* الأسعار المعروضة توضيحية للنموذج فقط، وتُستبدل بأسعار الصالون الحقيقية.',
                   en: '* Prices shown are illustrative for this mockup and will be replaced with the salon’s real prices.' }
    },

    work: {
      eyebrow: { ar: 'أعمالنا', en: 'Our work' },
      title:   { ar: 'لمحة من شغلنا', en: 'A glimpse of our work' },
      body:    { ar: 'استبدلي هذي الصور بصور أعمالكم من الإنستقرام — الواجهة جاهزة تعرضها.',
                 en: 'Swap these for the salon’s own photos from Instagram — the layout is ready for them.' },
      open:    { ar: 'تكبير الصورة', en: 'Open image' },
      close:   { ar: 'إغلاق', en: 'Close' },
      prev:    { ar: 'السابق', en: 'Previous' },
      next:    { ar: 'التالي', en: 'Next' },
      playHint:{ ar: 'مقطع', en: 'Clip' }
    },

    booking: {
      eyebrow: { ar: 'الحجز', en: 'Booking' },
      title:   { ar: 'احجزي موعدكِ في دقيقة', en: 'Book in a minute' },
      body:    { ar: 'اختاري خدماتكِ والتاريخ والوقت، وراح ينكتب لكِ الطلب كامل بالواتساب.',
                 en: 'Pick your services, date and time — the full request is written out for you on WhatsApp.' },
      typeLabel:  { ar: 'نوع الحجز', en: 'Booking type' },
      typeNormal: { ar: 'موعد عادي', en: 'Regular' },
      typeBride:  { ar: 'حجز عروس', en: 'Bridal' },
      servicesLabel: { ar: 'الخدمات', en: 'Services' },
      packagesLabel: { ar: 'باقات العرايس', en: 'Bridal packages' },
      totalLabel:    { ar: 'المجموع التقديري', en: 'Estimated total' },
      emptyTotal:    { ar: 'ما اخترتِ خدمات بعد', en: 'No services selected yet' },
      nameLabel:   { ar: 'الاسم', en: 'Name' },
      namePh:      { ar: 'اسمكِ الكريم', en: 'Your name' },
      phoneLabel:  { ar: 'رقم الواتساب', en: 'WhatsApp number' },
      phonePh:     { ar: '05XXXXXXXX', en: '05XXXXXXXX' },
      dateLabel:   { ar: 'تاريخ الموعد', en: 'Appointment date' },
      weddingLabel:{ ar: 'تاريخ الزواج', en: 'Wedding date' },
      timeLabel:   { ar: 'الوقت', en: 'Time' },
      timePick:    { ar: 'اختاري الوقت', en: 'Pick a time' },
      timeNone:    { ar: 'ما في أوقات متاحة لهذا اليوم، جرّبي يوم ثاني.', en: 'No times left for this day — try another date.' },
      afterMidnight: { ar: 'بعد منتصف الليل', en: 'after midnight' },
      afterMidnightHint: { ar: 'موعدكِ بعد منتصف الليل، يعني فجر اليوم اللي بعده.', en: 'This slot is after midnight, so it falls on the next morning.' },
      notesLabel:  { ar: 'ملاحظات', en: 'Notes' },
      notesOpt:    { ar: 'اختياري', en: 'optional' },
      notesPh:     { ar: 'أي شي تحبين نعرفه — لون تحبينه، حساسية، وقت الحفلة…',
                     en: 'Anything we should know — a colour you like, an allergy, the time of your event…' },
      honeypot:    { ar: 'لا تعبئي هذي الخانة', en: 'Leave this field empty' },
      submit:      { ar: 'أرسلي الطلب عبر واتساب', en: 'Send the request on WhatsApp' },
      submitHint:  { ar: 'راح تنفتح لكِ محادثة واتساب وفيها طلبكِ مكتوب كامل، تراجعينه وترسلينه.',
                     en: 'A WhatsApp chat opens with your request already written out — review it and send.' },
      errName:   { ar: 'اكتبي اسمكِ لو سمحتِ.', en: 'Please enter your name.' },
      errPhone:  { ar: 'اكتبي رقم واتساب سعودي صحيح، مثل 0565633561.', en: 'Enter a valid Saudi WhatsApp number, e.g. 0565633561.' },
      errDate:   { ar: 'اختاري تاريخ الموعد (اليوم أو بعده).', en: 'Pick an appointment date (today or later).' },
      errTime:   { ar: 'اختاري وقت الموعد.', en: 'Pick a time.' },
      errServices: { ar: 'اختاري خدمة وحدة على الأقل.', en: 'Choose at least one service.' },
      errWedding:  { ar: 'اكتبي تاريخ الزواج.', en: 'Enter the wedding date.' },
      errSummary:  { ar: 'في خانات ناقصة، راجعيها تحت.', en: 'Some fields need fixing — see below.' },
      doneTitle: { ar: 'تم فتح الواتساب 🤍', en: 'WhatsApp is open 🤍' },
      doneBody:  { ar: 'راجعي الرسالة وأرسليها، ونرجع لكِ بالتأكيد.', en: 'Review the message and send it — we’ll confirm shortly.' },
      doneAgain: { ar: 'افتحي المحادثة مرة ثانية', en: 'Open the chat again' },
      doneReset: { ar: 'طلب جديد', en: 'Start a new request' },
      dockCta:   { ar: 'أكملي الحجز', en: 'Finish booking' },
      pickPack:  { ar: 'احجزي هذي الباقة', en: 'Book this package' }
    },

    msg: {
      intro:   { ar: 'السلام عليكم، حابة أحجز موعد في ديوان الجمال 🤍', en: 'Hello, I’d like to book an appointment at Diwan Aljamal 🤍' },
      type:    { ar: 'نوع الحجز', en: 'Booking type' },
      services:{ ar: 'الخدمات', en: 'Services' },
      date:    { ar: 'التاريخ', en: 'Date' },
      wedding: { ar: 'تاريخ الزواج', en: 'Wedding date' },
      time:    { ar: 'الوقت', en: 'Time' },
      name:    { ar: 'الاسم', en: 'Name' },
      phone:   { ar: 'رقم الواتساب', en: 'WhatsApp number' },
      notes:   { ar: 'ملاحظات', en: 'Notes' },
      total:   { ar: 'المجموع التقديري', en: 'Estimated total' },
      approx:  { ar: '(تقديري)', en: '(estimate)' },
      none:    { ar: 'لا يوجد', en: '—' }
    },

    closing: {
      title: { ar: 'جاهزة نجهّزكِ؟', en: 'Ready when you are' },
      body:  { ar: 'اختاري خدماتكِ وأرسلي الطلب الحين، أو كلّمينا مباشرة على الواتساب.',
               en: 'Pick your services and send the request, or message us directly on WhatsApp.' }
    },

    visit: {
      eyebrow: { ar: 'زورينا', en: 'Visit us' },
      title:   { ar: 'وين تلقوننا', en: 'Where to find us' },
      mapLink: { ar: 'افتحي الموقع على الخريطة', en: 'Open the location on the map' },
      mapSoon: { ar: 'رابط الخريطة يُضاف من الصالون', en: 'Map link to be added by the salon' },
      snapLabel: { ar: 'سناب شات', en: 'Snapchat' },
      snapSoon: { ar: 'حساب السناب يُضاف من الصالون', en: 'Snapchat handle to be added by the salon' },
      hoursLabel:   { ar: 'أوقات العمل', en: 'Opening hours' },
      addressLabel: { ar: 'الموقع', en: 'Location' },
      contactLabel: { ar: 'تواصلي', en: 'Get in touch' },
      imageAlt: { ar: 'استقبال صالون بألوان بيج هادئة', en: 'A calm beige salon reception' }
    },

    footer: {
      browse: { ar: 'تصفّحي', en: 'Browse' },
      credit: { ar: 'نموذج مبدئي من إعداد Shujaat — تصميم وتطوير المواقع',
                en: 'Draft mockup by Shujaat — web design & development' },
      rights: { ar: 'جميع الحقوق محفوظة', en: 'All rights reserved' },
      top:    { ar: 'لأعلى', en: 'Back to top' }
    }
  }
};
