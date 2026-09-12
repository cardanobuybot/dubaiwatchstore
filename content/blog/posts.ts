import type { Locale } from '@/i18n/routing';

type L<T> = Record<Locale, T>;

export type Post = {
  slug: string;
  date: string;
  title: L<string>;
  excerpt: L<string>;
  body: L<string>;
};

export const posts: Post[] = [
  {
    slug: 'palm-jumeirah-trio',
    date: '2026-09-12',
    title: {
      en: 'A Trio for Dubai. Three Watches. Never More.',
      ar: 'ثلاثية دبي. ثلاث ساعات. لا أكثر.',
    },
    excerpt: {
      en: 'A three-piece micro-drop inspired by Palm Jumeirah — Japanese TMI movements under sapphire, Assembled in Dubai.',
      ar: 'دفعة مصغّرة من ثلاث قطع مستوحاة من نخلة جميرا — حركات يابانية من TMI تحت زجاج شفاف، مُجمَّعة في دبي.',
    },
    body: {
      en: `Uniqueness is born where bold ambition meets the discipline of jewellery-grade craft. This new micro-series of just three custom timepieces, inspired by the grandeur of **Palm Jumeirah**, is a clean example. The drop is strictly limited: exactly three unique pieces enter the world, each carrying the architectural silhouette and luxury of one of the most recognisable places on the planet. The custom dial preserves the outline of the legendary man-made island in fine detail, and the commemorative *Assembled in Dubai* inscription quietly asserts the project's bespoke origin.

## The Case

The concept rests on a recognisable, brutal design — integrated bracelet, textured case, presence on the wrist. But the true soul of each piece lives beneath a transparent case back. For this trio we chose high-precision Japanese movements from **TMI (Seiko Group)**, respected by watch enthusiasts worldwide for uncompromising reliability.

## Three Calibers, Three Finishes

Each version received an individual execution of its caliber, matched to the case:

- **Silver** — [NH70A](https://calibercorner.com/tmi-caliber-nh70a/) in classic steel, underscoring purity of line
- **Gold** — NH71A with gold-plated bridges and a skeletonised rotor, in harmony with the warm case
- **Black** — NH72A with a deep dark coating, a monochrome study in modern stealth

## Shared Specifications

All three movements share professional characteristics: reliable automatic winding with a manual-wind option, **24 ruby jewels** for smooth motion and long life, a frequency of **21,600 vph**, and a solid **41-hour power reserve**. The stop-seconds function allows precise setting to the second.

This mini-release blurs the line between mass watchmaking and the high art of customisation. The owner of one of these three pieces does not simply acquire a stylish accessory — they acquire a rare collectible artefact that unites Japanese mechanics, the spirit of Dubai, and uncompromising style.`,
      ar: `تُولَد الفرادة حين تلتقي الطموحات الجريئة بحرفية الصياغة. وهذه السلسلة المصغّرة من ثلاث ساعات مخصّصة، المستوحاة من عظمة **نخلة جميرا**، مثال ناصع على ذلك. الإصدار محدود بصرامة: ثلاث قطع فريدة فقط تُطرح إلى النور، تحمل كل منها الجماليات المعمارية وفخامة أحد أشهر المعالم على الكوكب. يحفظ الميناء المخصّص ملامح الجزيرة الاصطناعية الأسطورية بتفاصيل دقيقة، وتؤكّد النقشة التذكارية *Assembled in Dubai* أصل المشروع الفريد بصمت.

## الهيكل

يستند التصميم إلى لغة قوية ومميّزة — سوار مدمج، وعلبة بلمسة نسيجية، وحضور واضح على المعصم. لكن روح كل قطعة تسكن خلف غطاء خلفي شفاف. اخترنا لهذه الثلاثية حركات يابانية عالية الدقة من **TMI (Seiko Group)**، تحظى بتقدير هواة الساعات حول العالم لموثوقيتها التي لا تتزحزح.

## ثلاث حركات. ثلاث لمسات.

كل نسخة نالت تنفيذًا فرديًا لحركتها، منسجمًا مع لون العلبة:

- **الفضية** — حركة [NH70A](https://calibercorner.com/tmi-caliber-nh70a/) في تنفيذ فولاذي كلاسيكي يبرز نقاء الخطوط
- **الذهبية** — حركة NH71A بجسور مطلية بالذهب ودوّار مكشوف، منسجمة مع دفء العلبة
- **السوداء** — حركة NH72A بطلاء داكن عميق، دراسة أحادية اللون في الأناقة الحديثة

## المواصفات المشتركة

تتشارك الحركات الثلاث خصائص احترافية: تعبئة أوتوماتيكية موثوقة مع إمكانية التعبئة اليدوية، **24 حجرًا ياقوتيًا** لسلاسة الحركة وطول العمر، وتردّد **21,600 اهتزاز في الساعة**، واحتياطي طاقة قوي يبلغ **41 ساعة**. وظيفة إيقاف الثواني تتيح ضبط الوقت بدقة الثانية.

يمحو هذا الإصدار المصغّر الحد بين الإنتاج التسلسلي للساعات وفن التخصيص الرفيع. مالك إحدى هذه القطع الثلاث لا يقتني إكسسوارًا أنيقًا فحسب — بل يقتني أثرًا نادرًا يجمع الميكانيكا اليابانية، وروح دبي، وأناقة لا تُساوَم.`,
    },
  },
  {
    slug: 'welcome',
    date: '2026-09-11',
    title: {
      en: 'Welcome to the Journal',
      ar: 'أهلاً بك في المدوّنة',
    },
    excerpt: {
      en: 'Why this journal exists and what you will find here — notes on movements, cases, and the small details worth knowing before you wear one.',
      ar: 'لماذا هذه المدوّنة وما ستجده هنا — ملاحظات حول الحركات والهياكل والتفاصيل التي تستحق المعرفة قبل ارتداء أي ساعة.',
    },
    body: {
      en: `Every watch in this collection has been chosen by hand, from Dubai. The Journal is where I write about the **movements** inside, the finishing, and the small details worth knowing before you wear one.

This is not a catalogue. It is a slow record of what makes a well-executed Seiko Mod worth its price:

- the depth of a good *frosted* finish
- the tolerances of the [NH72A caliber](https://calibercorner.com/tmi-caliber-nh72a/)
- the balance of an integrated bracelet under Dubai heat

New notes appear when there is something worth saying. No SEO fluff, no filler.`,
      ar: `اختيرت كل ساعة في هذه المجموعة يدويًا من دبي. هذه المدوّنة مكان لأكتب فيه عن **الحركات** بداخلها، والصياغة، والتفاصيل الصغيرة التي تستحق المعرفة قبل ارتدائها.

هذه ليست فهرسًا. إنها سجل بطيء لما يجعل ساعة Seiko Mod مُتقنة تستحق سعرها:

- عمق لمسة *الصنفرة* الجيدة
- تفاوتات حركة [NH72A](https://calibercorner.com/tmi-caliber-nh72a/)
- توازن السوار المدمج تحت حرارة دبي

تظهر ملاحظات جديدة حين يوجد ما يستحق القول. لا حشو ولا SEO زائف.`,
    },
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
