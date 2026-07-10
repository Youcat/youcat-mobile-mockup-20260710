const screenEl = document.querySelector("#screen");
const navItems = [...document.querySelectorAll(".nav-item")];

const state = {
  route: "home",
  params: {},
  history: [],
  storyStep: 0,
  questionSlide: 0,
  deepDiveOpen: false,
  sourceSeconds: 7,
  sourceXpEarned: false,
  sourceAudioActive: false,
  sourceAudioPlaying: false,
  deepDiveSeconds: 10,
  deepDiveXpEarned: false,
  deepDiveAudioActive: false,
  deepDiveAudioPlaying: false,
  prayerStep: 0,
  prayerAudioVisible: false,
  prayerAudioPlaying: false,
  rosaryStep: 0,
  rosaryStarted: false,
  selectedMysteries: "joyful",
  knowsRosaryPrayers: false,
  bookmarkQuery: "",
  bookmarksExpanded: false,
  focusBookmarkSearch: false,
  heartsGiven: {
    anna: 1,
    leo: 0,
    maria: 0,
  },
};

const routesWithNav = {
  home: "home",
  explore: "explore",
  question: "home",
  story: "explore",
  reflections: "explore",
  read: "read",
  reader: "read",
  groups: "groups",
  group: "groups",
  pray: "pray",
  prayer: "pray",
};

const missions = [
  {
    id: "holy-spirit",
    title: "Holy Spirit",
    meta: "started",
    progress: 4,
    total: 23,
    icon: "dove",
    tone: "yellow",
    question: "spirit-113",
  },
  {
    id: "sacraments",
    title: "Sacraments",
    meta: "new path",
    progress: 0,
    total: 18,
    icon: "chalice",
    tone: "yellow",
    question: "sacrament-172",
  },
  {
    id: "purity",
    title: "Purity",
    meta: "continue",
    progress: 7,
    total: 31,
    icon: "drop",
    tone: "red",
    question: "purity-407",
  },
];

const bookmarks = [
  { kind: "YOUCAT", css: "is-youcat", title: "Why do we pray?", note: "Q 469", target: "youcat" },
  { kind: "DOCAT", css: "is-docat", title: "Justice and charity", note: "Q 4", target: "docat" },
  { kind: "Love Forever", css: "is-love", title: "Learning to love", note: "Q 17", target: "love" },
  { kind: "Prayer", css: "is-prayer", title: "Morning offering", note: "saved", target: "morning" },
  { kind: "YOUCAT", css: "is-youcat", title: "The Holy Spirit", note: "Q 113", target: "youcat" },
  { kind: "Bible", css: "is-love", title: "John 14", note: "saved", target: "bible" },
  { kind: "DOCAT", css: "is-docat", title: "Work and dignity", note: "Q 139", target: "docat" },
  { kind: "Prayer", css: "is-prayer", title: "Examination of conscience", note: "saved", target: "confession" },
];

const questions = {
  "spirit-113": {
    number: "YOUCAT 113",
    title: "What does it mean to say, I believe in the Holy Spirit?",
    book: "YOUCAT",
    mission: "Holy Spirit",
    progress: 4,
    total: 23,
    body: "To believe in the Holy Spirit means to worship him as God just like the Father and the Son. It means to believe that the Holy Spirit comes into our hearts so that we as children of God might know our Father in heaven. Moved by God's Spirit, we can change the face of the earth. Before his death, Jesus promised his disciples that he would send them \"another Counselor\" (Jn 14,16) when he was no longer with them. Then when the Holy Spirit was poured out upon the disciples of the original Church, they learned what Jesus had meant. They experienced a deep assurance and joy in their faith and received particular charisms; in other words, they could prophesy, heal, and work miracles. To this day there are people in the Church who possess such gifts and have these experiences",
  },
  "sacrament-172": {
    number: "YOUCAT 172",
    title: "How many sacraments are there, and what are their names?",
    book: "YOUCAT",
    mission: "Sacraments",
    progress: 0,
    total: 18,
    body: "A fresh path for Alice. The first step starts with the signs Christ gives to his Church.",
  },
  "purity-407": {
    number: "YOUCAT 407",
    title: "Why is chastity a virtue?",
    book: "YOUCAT",
    mission: "Purity",
    progress: 7,
    total: 31,
    body: "This mission uses YOUCAT Love red for the sensitive path, with quiet progress and no noisy badges.",
  },
};

const questionSlides = [
  {
    id: "source",
    xp: 5,
    title: "YOUCAT 113",
    kind: "Question",
  },
  {
    id: "deep-dive",
    xp: 15,
    title: "Catechism deep dive",
    kind: "CCC",
    hiddenInNormalFlow: true,
  },
  {
    id: "match",
    xp: 5,
    title: "Match the signs",
    kind: "Game",
    pairs: [
      ["water", "life"],
      ["fire", "mission"],
      ["wind", "power"],
      ["oil", "anointing"],
      ["dove", "peace"],
      ["seal", "belonging"],
      ["cloud", "presence"],
    ],
  },
  {
    id: "reflect",
    xp: 15,
    title: "Who is the Holy Spirit?",
    kind: "Reflection",
  },
];

const cccDeepDive = {
  source: "CCC 683-686",
  title: "The Holy Spirit awakens faith",
  body: "\"No one can say 'Jesus is Lord' except by the Holy Spirit.\" Through his grace, the Holy Spirit is the first to awaken faith in us and to communicate to us the new life, which is to \"know the Father and the one whom he has sent, Jesus Christ.\" To believe in the Holy Spirit is to profess that the Holy Spirit is one of the persons of the Holy Trinity, consubstantial with the Father and the Son: \"with the Father and the Son he is worshipped and glorified.\" The Holy Spirit is at work with the Father and the Son from the beginning to the completion of the plan for our salvation. In these end times, the Spirit is revealed and given, recognized and welcomed as a person. This divine plan can now be embodied in mankind by the outpouring of the Spirit: as the Church, the communion of saints, the forgiveness of sins, the resurrection of the body, and the life everlasting.",
};

let sourceTimerId = null;
let deepDiveTimerId = null;

const storySteps = [
  {
    label: "Quote",
    title: "A gift, not a mood",
    body: "The Holy Spirit is the love of God poured into us. Alice keeps this as the key sentence before reading.",
  },
  {
    label: "Reader",
    title: "Read the answer",
    body: "The Spirit helps us know God from within, pray, and recognize what is true and good.",
  },
  {
    label: "Puzzle",
    title: "Put it together",
    body: "Drag the three small pieces in the real app: gift, guide, and love. Here we only preview the flow.",
  },
  {
    label: "Trade",
    title: "Trade a question",
    body: "Alice can exchange one heart to ask a friend how they understand this question.",
  },
  {
    label: "Share",
    title: "Share a reflection",
    body: "She writes a short answer. People near her age can read it and give hearts.",
  },
  {
    label: "Reflect",
    title: "What changed today?",
    body: "The last step turns knowledge into prayer and a small action for the day.",
  },
];

const groups = [
  {
    id: "st-mary",
    title: "St. Mary Study Night",
    meta: "8 friends, Wednesdays",
    progress: "Holy Spirit 4/23",
  },
  {
    id: "alpha-youth",
    title: "Alpha Youth",
    meta: "open ad-hoc room",
    progress: "Code ETLS",
  },
  {
    id: "confirmation",
    title: "Confirmation path",
    meta: "leader: Mara",
    progress: "12/40",
  },
];

const prayers = [
  { id: "evening", title: "Evening prayer", meta: "done today", progress: 3, total: 3 },
  { id: "readings", title: "Daily readings", meta: "7 minutes", progress: 0, total: 1 },
  { id: "rosary", title: "Rosary", meta: "guided", progress: 43, total: 60 },
];

const catholicPrayerTitles = [
  "Hail Mary",
  "Our Father",
  "Anima Christi",
  "Angelus",
  "Act of Penance",
  "Glory Be",
  "Apostles' Creed",
  "Prayer to the Holy Spirit",
];

function renderCatholicPrayerRows() {
  const sortedTitles = [...catholicPrayerTitles].sort((a, b) => a.localeCompare(b, "en", { sensitivity: "base" }));
  let activeLetter = "";
  return sortedTitles.map((title) => {
    const firstLetter = title.trim().charAt(0).toUpperCase();
    const letter = firstLetter !== activeLetter ? firstLetter : "";
    activeLetter = firstLetter;
    return `
      <div class="prayer-title-row">
        <span class="prayer-letter" aria-hidden="true">${letter}</span>
        <span class="item-title">${title}</span>
      </div>
    `;
  }).join("");
}

const eveningPrayerSteps = [
  {
    title: "Sign of the Cross",
    image: "./assets/illustrations/evening-prayer/sign-cross.png",
    paragraphs: [
      "Make the sign of the cross:: In the name of the Father, and of the Son, and of the Holy Spirit. Amen.",
    ],
  },
  {
    title: "Examination of conscience",
    image: "./assets/illustrations/evening-prayer/examination.png",
    paragraphs: [
      "Look back over the day with God, not against yourself.",
      "Where did I love God? Where did I ignore him?",
      "Where did I love others? Where did I wound, avoid, or use them?",
      "Where was I harsh, careless, or dishonest toward myself?",
    ],
  },
  {
    title: "Moment of silence",
    image: "./assets/illustrations/evening-prayer/silence.png",
    paragraphs: [
      "Stay quiet for a moment.",
      "Place the people, words, work, failures, and gifts of this day before God. Pray with your own words to Him.",
      "Let him look at it with you.",
    ],
  },
  {
    title: "Confiteor",
    image: "./assets/illustrations/evening-prayer/confiteor.png",
    paragraphs: [
      "I confess to almighty God and to you, my brothers and sisters, that I have greatly sinned in my thoughts and in my words, in what I have done and in what I have failed to do; through my fault, through my fault, through my most grievous fault; therefore I ask blessed Mary ever-Virgin, all the Angels and Saints, and you, my brothers and sisters, to pray for me to the Lord our God.",
    ],
  },
  {
    title: "Psalm 23",
    image: "./assets/illustrations/evening-prayer/psalm-23.png",
    paragraphs: [
      "The LORD is my shepherd; there is nothing I lack. In green pastures he makes me lie down; to still waters he leads me; he restores my soul. He guides me along right paths for the sake of his name. Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me; your rod and your staff comfort me. You set a table before me in front of my enemies; you anoint my head with oil; my cup overflows. Indeed, goodness and mercy will pursue me all the days of my life; I will dwell in the house of the LORD for endless days.",
    ],
  },
  {
    title: "Closing prayer",
    image: "./assets/illustrations/evening-prayer/closing-prayer.png",
    paragraphs: [
      "Lord Jesus, receive this day with everything that was good, weak, unfinished, and hidden.",
      "Forgive what needs mercy. Heal what is wounded. Bless the people I met today.",
      "Let me rest in your peace and wake tomorrow ready to love you again. Amen.",
    ],
  },
];

const prayerTexts = {
  creed: "I believe in God, the Father almighty, Creator of heaven and earth, and in Jesus Christ, his only Son, our Lord; who was conceived by the Holy Spirit, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died and was buried; he descended into hell; on the third day he rose again from the dead; he ascended into heaven, and is seated at the right hand of God the Father almighty; from there he will come to judge the living and the dead. I believe in the Holy Spirit, the holy Catholic Church, the communion of saints, the forgiveness of sins, the resurrection of the body, and life everlasting. Amen.",
  ourFather: "Our Father, who art in heaven, hallowed be thy name. Thy kingdom come, thy will be done on earth as it is in heaven. Give us this day our daily bread, and forgive us our trespasses, as we forgive those who trespass against us. Lead us not into temptation, but deliver us from evil. Amen.",
  hailMary: "Hail Mary, full of grace, the Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.",
};

const mysterySets = {
  joyful: {
    label: "Joyful mysteries",
    mysteries: [
      ["The Annunciation", "Mary says yes. Ask for a heart that listens before acting."],
      ["The Visitation", "Mary carries Christ to Elizabeth. Pray to bring joy where you go."],
      ["The Nativity", "Jesus is born in poverty. Let him enter what is small and hidden."],
      ["The Presentation", "Jesus is offered to the Father. Offer this day with him."],
      ["The Finding in the Temple", "Jesus is found in the Father's house. Seek him first."],
    ],
  },
  luminous: {
    label: "Luminous mysteries",
    mysteries: [
      ["The Baptism of Jesus", "The Father calls Jesus beloved. Remember your dignity in baptism."],
      ["The Wedding at Cana", "Mary points to Jesus. Do whatever he tells you."],
      ["The Kingdom is proclaimed", "Jesus calls us to conversion. Let one thing change today."],
      ["The Transfiguration", "Christ's glory shines. Hold on to hope in confusion."],
      ["The Eucharist", "Jesus gives himself. Receive his love with gratitude."],
    ],
  },
  sorrowful: {
    label: "Sorrowful mysteries",
    mysteries: [
      ["The Agony in the Garden", "Jesus prays in fear. Bring him what you avoid."],
      ["The Scourging", "Jesus suffers in his body. Pray for healing and purity."],
      ["The Crowning with Thorns", "Jesus is mocked. Ask for humility without bitterness."],
      ["The Carrying of the Cross", "Jesus keeps walking. Stay faithful in the next small step."],
      ["The Crucifixion", "Jesus gives everything. Rest in the mercy of the Cross."],
    ],
  },
  glorious: {
    label: "Glorious mysteries",
    mysteries: [
      ["The Resurrection", "Jesus is alive. Let hope be stronger than fear."],
      ["The Ascension", "Jesus returns to the Father. Live your mission with trust."],
      ["Pentecost", "The Spirit is given. Ask for courage and fire."],
      ["The Assumption", "Mary is taken into heaven. Your body is called to glory."],
      ["The Coronation of Mary", "Mary reigns by love. Let her teach you to belong to Christ."],
    ],
  },
};

function createRosarySteps() {
  const selected = mysterySets[state.selectedMysteries] || mysterySets.joyful;
  const steps = [
    { title: "Apostles' Creed", kind: "known", bead: "cross", text: prayerTexts.creed },
    { title: "Our Father", kind: "known", bead: "intro-big", text: prayerTexts.ourFather },
    { title: "Hail Mary", kind: "known", bead: "intro-small", text: prayerTexts.hailMary },
    { title: "Hail Mary", kind: "known", bead: "intro-small", text: prayerTexts.hailMary },
    { title: "Hail Mary", kind: "known", bead: "intro-small", text: prayerTexts.hailMary },
  ];
  selected.mysteries.forEach(([title, reflection], decadeIndex) => {
    steps.push({
      title,
      kind: "mystery",
      bead: "decade-big",
      mysteryNumber: decadeIndex + 1,
      text: `${reflection} Pray the Our Father on this bead.`,
    });
    for (let index = 0; index < 10; index += 1) {
      steps.push({
        title: "Hail Mary",
        kind: "known",
        bead: "decade-small",
        mysteryNumber: decadeIndex + 1,
        text: prayerTexts.hailMary,
      });
    }
  });
  return steps;
}

const books = [
  { id: "youcat", name: "YOUCAT", css: "is-youcat", meta: "", progress: 43, total: 527 },
  { id: "docat", name: "DOCAT", css: "is-docat", meta: "", progress: 9, total: 328 },
  { id: "love", name: "Love Forever", css: "is-love", meta: "", progress: 17, total: 120 },
  { id: "bible", name: "Bible", css: "is-prayer", meta: "", progress: 0, total: 0 },
  { id: "confessions", name: "Confessions", css: "is-prayer", meta: "St. Augustine", progress: 0, total: 0 },
];

function icon(name) {
  const icons = {
    book: `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M8 8c4-1.5 8.4-1.1 12.6.2 1.5 4.8 1.5 9.8-.2 15.3-4.7-1.3-9-1.3-12.7 0C9 18.3 9 13.1 8 8Z"/><path d="M12 12.5c2.3-.5 4.6-.3 6.4.4"/><path d="M11.8 17.1c2.1-.3 4.3-.1 6.7.4"/></svg>`,
    prayer: `<svg viewBox="0 0 32 32" aria-hidden="true"><ellipse cx="10" cy="10" rx="3.5" ry="4.2" transform="rotate(-10 10 10)"/><path d="M10 14.2c-1.4 2.4-2.1 4.7-2.2 7.1"/><path d="M8.3 16.3c-2 1.4-3.3 3-4 5"/><path d="M11.6 16.5c1.7 1 3.2 2.5 4.4 4.3"/><path d="M18 8c3.2-.7 5.5-.5 8 .6.5 5 .3 9.2-.8 12.9-2.8-.7-5.2-.6-7.5.4.5-4.6.6-9.2.3-13.9Z"/><path d="M4 24c5.8 1 13 1 22.5-.5"/></svg>`,
    moon: `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M21.6 6.2c-4.5 1-7.9 5.2-7.8 10 .1 4.2 2.9 7.8 6.9 9.1-1.2.6-2.8.9-4.5.7-5.4-.5-9.4-4.8-9.1-10.1.4-5.7 5.1-9.8 10.6-9.9 1.4 0 2.6.1 3.9.2Z"/><path d="M24.2 9.3l.7 1.5 1.5.5-1.4.7-.5 1.5-.7-1.4-1.5-.5 1.4-.7.5-1.6Z"/><path d="M24.1 20.4l.5 1.1 1.1.4-1 .5-.4 1.1-.5-1-1.1-.4 1-.5.4-1.2Z"/></svg>`,
    readings: `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M7 9c3.8-1 6.9-.6 9 1.3v13.4c-2.5-1.8-5.5-2.3-9.2-1.3.4-4.5.5-9 .2-13.4Z"/><path d="M16 10.3c2.2-1.8 5.1-2.1 8.7-1v13.1c-3.6-.9-6.5-.6-8.7 1.3"/></svg>`,
    dove: `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M5.8 18.4c3.9-4.2 8.1-6.7 13.1-7.2 2.8-.3 5.1.2 7 1.5-3.1.6-5.8 1.8-8 3.6 2.7.7 5 1.9 6.8 3.7-5.3.1-9.7-1.1-13.2-3.7-1.6 1-3.5 1.7-5.7 2.1Z"/><path d="M13.4 16.2c-.4 2.2-1.7 4.2-3.8 5.9"/><path d="M17.1 11.6c.5-2 1.6-3.9 3.4-5.7"/></svg>`,
    chalice: `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M10 8c4.2-.9 8-.8 12 .2-.4 4.3-1.5 8-3.4 11.4-1.7.9-4.3.9-6 .1C11 16.1 10.2 12.2 10 8Z"/><path d="M11 20.3c2.8 1.1 5.7 1 8.5-.1"/><path d="M15.4 21c-.1 2.1-.2 3.7-.4 5.1"/><path d="M10.9 26c3.3.7 6.8.6 10-.2"/></svg>`,
    drop: `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 5.3c4.3 5.7 7 9.6 7 13.4 0 4.3-3.2 7-7.1 7-4.1 0-7-2.7-7-6.7 0-3.6 3-7.9 7.1-13.7Z"/><path d="M12.4 23.6c2.2 1 4.9 1 7.1-.1"/></svg>`,
    heart: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19.7C7.3 16.3 4.5 13.7 4 10.6c-.4-3.2 2.2-5.4 4.8-4.1 1.4.6 2.3 1.8 3.2 3 1-1.4 2.2-2.8 4.2-3.1 2.6-.2 4.4 2.1 3.9 4.8-.5 2.9-3.6 5.5-8.1 8.5Z"/></svg>`,
    arrow: `<svg viewBox="0 0 34 22" aria-hidden="true"><path d="M14 3C10.5 6.5 7.2 9.7 3 12c4.1 1.5 7.8 3.4 11 6"/><path d="M4.5 12.1c8.1-1.2 16.4-1.5 25.8-.5"/></svg>`,
    flag: `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M9 26c.8-6.2 1.1-12.4.8-18.5"/><path d="M10 8c4.7-2.2 7.6 1.9 12.1-.3-.5 3.6-.5 6.8.2 9.7-4.5 2.1-7.7-2.1-12.3.3"/><path d="M13.8 7.2c-.1 3.8 0 6.8.6 10"/><path d="M18 8.6c-.3 2.8-.1 5.3.6 7.6"/></svg>`,
    speaker: `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M7.2 13.8c2.1.2 4.1.1 6-.4 2.1-2.4 4.2-4.5 6.2-6.1.3 5.6.3 11.3-.1 17.2-2-1.5-4.2-3.4-6.4-5.7-1.9-.3-3.9-.2-6 .1.4-1.8.5-3.5.3-5.1Z"/><path d="M22.1 12.1c1.2 1.6 1.4 4.1.4 6.2"/><path d="M25.4 9.4c2.3 3.4 2.3 7.8.3 11.4"/></svg>`,
    play: `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M11 8.4c5.7 2.3 9.8 4.8 13 7.8-3.6 3.3-7.8 5.8-12.9 7.8.4-5.2.5-10.4-.1-15.6Z"/></svg>`,
    pause: `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M11 8.4c.4 5 .3 10.1-.1 15.4"/><path d="M20.3 8.2c.2 4.9.2 10.1-.3 15.5"/></svg>`,
  };
  return icons[name] || icons.book;
}

function actionIcon(name) {
  const icons = {
    plus: `<svg viewBox="0 0 36 36" aria-hidden="true"><path class="action-yellow" d="M17.6 7.3c.2 7.6.3 14.2.1 21.5"/><path class="action-yellow" d="M7.4 18.3c7.8-.6 14.6-.4 21.4-.2"/><path class="action-ink" d="M17 8.4c.4 6.7.3 13.2.1 19"/><path class="action-ink" d="M8.6 18.8c6.7-.3 13.4-.4 19.1.1"/></svg>`,
    pencil: `<svg viewBox="0 0 36 36" aria-hidden="true"><path class="pencil-yellow" d="M10.6 25.8c4.8-5.8 9.8-11 15.2-16"/><path class="pencil-ink" d="M9.8 26.5c4.9-6 10.1-11.6 15.8-16.7"/><path class="pencil-ink" d="M23.6 8.5c1.6.9 2.8 2 3.8 3.4"/><path class="pencil-ink" d="M8.7 27.6c1.9-.4 3.5-1 5-1.9"/><path class="pencil-ink" d="M7.7 28.6c1.4-.1 2.6.1 3.7.7"/></svg>`,
  };
  return icons[name] || icons.plus;
}

function sectionIconButton(kind, label, route) {
  return `
    <button class="section-icon-action is-${kind}" type="button" data-action="go" data-route="${route}" aria-label="${label}">
      ${actionIcon(kind)}
    </button>
  `;
}

function doneTick() {
  return `
    <span class="status-tick" aria-label="done">
      <svg viewBox="0 0 32 24" aria-hidden="true">
        <path d="M4.5 13.3c3.5 2.1 6.2 4.2 8.6 6.3 4.1-6.2 8.7-11.2 14.4-15.2" />
      </svg>
    </span>
  `;
}

function progressBar(progress, total, options = {}) {
  if (!total || total <= 1) return "";
  const ratio = total ? Math.max(0.02, Math.min(1, progress / total)) : 0.08;
  const red = options.red ? " is-red" : "";
  return `
    <div class="progress-wrap${red}">
      <svg class="progress-line" viewBox="0 0 250 14" aria-hidden="true" style="--bar-scale:${ratio.toFixed(3)}">
        <path class="progress-track" d="M2 8c38-1.5 76-1.1 114-.7 45 .4 88-1 132 .8"/>
        <path class="progress-fill" d="M2 8c38-1.5 76-1.1 114-.7 45 .4 88-1 132 .8"/>
      </svg>
    </div>
  `;
}

function progressStatus(progress, total, options = {}) {
  if (total > 0 && progress >= total) return doneTick();
  if (!total || total <= 1) return "";
  return `<span class="status-chip${options.red ? " is-red" : ""}">${progress}/${total}</span>`;
}

function backButton(label = "back") {
  return `<button class="back-button" type="button" data-action="back">${icon("arrow")}<span>${label}</span></button>`;
}

function missionRow(mission, options = {}) {
  const red = mission.tone === "red";
  const showMeta = options.showMeta === true && mission.meta;
  return `
    <button class="mission-row" type="button" data-action="open-question" data-question="${mission.question}">
      <span class="mission-mark${red ? " is-red" : ""}">${icon(mission.icon)}</span>
      <span>
        <span class="item-title">${mission.title}</span>
        ${showMeta ? `<span class="item-meta">${mission.meta}</span>` : ""}
      </span>
      ${progressStatus(mission.progress, mission.total, { red })}
      ${progressBar(mission.progress, mission.total, { red })}
    </button>
  `;
}

function bookmarkRow(bookmark) {
  const action = bookmark.kind === "Prayer" ? "open-prayer" : "open-reader";
  return `
    <button class="bookmark-row ${bookmark.css}" type="button" data-action="${action}" data-book="${bookmark.target}" data-prayer="${bookmark.target}">
      <span>
        <span class="bookmark-type">${bookmark.kind}</span>
        <span class="item-title">${bookmark.title}</span>
      </span>
      <span class="bookmark-note">${bookmark.note}</span>
    </button>
  `;
}

function escapeAttribute(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function filteredBookmarks() {
  const query = state.bookmarkQuery.trim().toLowerCase();
  if (!query) return bookmarks;
  return bookmarks.filter((bookmark) => {
    return [bookmark.kind, bookmark.title, bookmark.note].some((part) => part.toLowerCase().includes(query));
  });
}

function visibleBookmarkState() {
  const matches = filteredBookmarks();
  const visible = state.bookmarkQuery || state.bookmarksExpanded ? matches : matches.slice(0, 4);
  return { matches, visible, hasMore: matches.length > visible.length };
}

function renderBookmarkSearch() {
  return `
    <label class="bookmark-search" for="bookmark-search">
      <svg viewBox="0 0 28 28" aria-hidden="true">
        <circle cx="12" cy="12" r="6.5" />
        <path d="M17 17.2c2.1 1.8 3.9 3.7 5.6 5.8" />
      </svg>
      <input id="bookmark-search" type="text" value="${escapeAttribute(state.bookmarkQuery)}" placeholder="Search bookmarks" data-action="bookmark-search" autocomplete="off" inputmode="search" aria-label="Search bookmarks" />
    </label>
  `;
}

function renderBookmarkList() {
  const { visible } = visibleBookmarkState();
  return visible.length ? visible.map(bookmarkRow).join("") : `<p class="bookmark-empty">No bookmark found</p>`;
}

function renderBookmarkMoreButton() {
  const { matches, visible, hasMore } = visibleBookmarkState();
  return `
    <button class="bookmark-more-button${state.bookmarksExpanded ? " is-expanded" : ""}" type="button" data-action="toggle-bookmarks" aria-label="${state.bookmarksExpanded ? "Show fewer bookmarks" : "Show more bookmarks"}">
      <svg viewBox="0 0 42 24" aria-hidden="true">
        <path d="M5 5.8c5.8 3.8 10.7 7.6 15.7 12.2 5.5-5.1 10.5-8.8 16.1-12.6" />
      </svg>
      ${hasMore ? `<span>${matches.length - visible.length}</span>` : ""}
    </button>
  `;
}

function updateBookmarkResults() {
  const list = screenEl.querySelector(".bookmark-list");
  const moreButton = screenEl.querySelector(".bookmark-more-button");
  if (list) list.innerHTML = renderBookmarkList();
  if (moreButton) moreButton.outerHTML = renderBookmarkMoreButton();
}

function renderBookmarkSection() {
  return `
    <section class="section bookmark-section" aria-label="Bookmarks">
      <div class="section-head">
        <div class="section-title-wrap">
          <img class="section-illustration is-bookmarks" src="./assets/illustrations/john-sitting-on-books.png" alt="" />
          <h2 class="section-title">Bookmarks</h2>
        </div>
        ${sectionIconButton("pencil", "Edit bookmarks", "read")}
      </div>
      ${renderBookmarkSearch()}
      <div class="bookmark-list">
        ${renderBookmarkList()}
      </div>
      ${renderBookmarkMoreButton()}
    </section>
  `;
}

function renderHome() {
  return `
    <div class="page is-home">
      <div class="home-hello">
        <div>
          <h1 class="screen-title">Home</h1>
        </div>
      </div>

      <section class="section" aria-label="Daily routine">
        <div class="section-head">
          <div class="section-title-wrap">
            <span class="section-illustration-wrap is-daily">
              <img class="section-illustration" src="./assets/illustrations/john-praying-at-bed.png" alt="" />
              <svg class="rising-sun-mark" viewBox="0 0 42 32" aria-hidden="true">
                <path class="sun-fill" d="M7 25.4c3-9.1 8.1-13.7 15.5-13.4 7.5.3 11.4 5.1 13.1 13.6-8.7.8-18 .7-28.6-.2Z" />
                <path class="sun-line" d="M8.2 25.1c4.4-.6 9.2-.7 14.3-.6 4.3.1 8.4.4 12.7.9" />
                <path class="sun-line" d="M12 17.9c-1.6-1.8-3.1-3.6-4.5-5.5" />
                <path class="sun-line" d="M20.6 12.4c-.2-2.2-.1-4.2.2-6.3" />
                <path class="sun-line" d="M29.3 17.1c1.4-1.5 2.9-2.9 4.7-4.3" />
              </svg>
            </span>
            <h2 class="section-title">Daily routine</h2>
          </div>
          ${sectionIconButton("plus", "Add daily routine", "pray")}
        </div>
        <div class="routine-list">
          <button class="routine-row" type="button" data-action="open-question" data-question="spirit-113">
            <span class="routine-mark">${icon("book")}</span>
            <span><span class="item-title">Review questions</span></span>
            ${progressStatus(1, 3)}
            ${progressBar(1, 3)}
          </button>
          <button class="routine-row" type="button" data-action="open-prayer" data-prayer="evening">
            <span class="routine-mark">${icon("moon")}</span>
            <span><span class="item-title">Evening prayer</span></span>
            ${progressStatus(3, 3)}
            ${progressBar(3, 3)}
          </button>
          <div class="routine-row">
            <span class="routine-mark">${icon("readings")}</span>
            <span><span class="item-title">Daily readings</span></span>
            ${progressStatus(0, 1)}
            ${progressBar(0, 1)}
          </div>
        </div>
      </section>

      ${renderBookmarkSection()}
    </div>
  `;
}

function renderExplore() {
  return renderQuestion({ showBack: false, questionId: "spirit-113" });
}

function visibleQuestionSlideIndex(current) {
  const visibleSlides = questionSlides.filter((slide) => !slide.hiddenInNormalFlow);
  const currentSlide = questionSlides[current] || questionSlides[0];
  return Math.max(0, visibleSlides.findIndex((slide) => slide.id === currentSlide.id));
}

function questionSlideEarnedXp(current) {
  const currentSlide = questionSlides[current] || questionSlides[0];
  const visibleSlides = questionSlides.filter((slide) => !slide.hiddenInNormalFlow);
  const sourceXp = state.sourceXpEarned ? questionSlides.find((slide) => slide.id === "source").xp : 0;
  const optionalXp = state.deepDiveXpEarned ? questionSlides.find((slide) => slide.id === "deep-dive").xp : 0;
  if (currentSlide.id === "deep-dive") {
    return sourceXp + optionalXp;
  }
  const visibleIndex = visibleQuestionSlideIndex(current);
  return visibleSlides.slice(0, visibleIndex + 1).reduce((sum, slide) => {
    if (slide.id === "source") return sum + sourceXp;
    return sum + slide.xp;
  }, 0) + optionalXp;
}

function nextQuestionSlideIndex(current) {
  let next = Math.min(questionSlides.length - 1, current + 1);
  while (questionSlides[next]?.hiddenInNormalFlow && next < questionSlides.length - 1) next += 1;
  return next;
}

function previousQuestionSlideIndex(current) {
  let previous = Math.max(0, current - 1);
  while (questionSlides[previous]?.hiddenInNormalFlow && previous > 0) previous -= 1;
  return previous;
}

function renderQuestionXpRail(current) {
  const totalXp = questionSlides.reduce((sum, slide) => sum + slide.xp, 0);
  const earnedXp = questionSlideEarnedXp(current);
  const ratio = Math.min(1, earnedXp / totalXp);
  const thresholdRatio = 0.5;
  return `
    <aside class="question-xp-rail" aria-label="${earnedXp} of ${totalXp} XP">
      <span class="xp-label">XP</span>
      <span class="xp-track">
        <span class="xp-fill" style="--xp-scale:${ratio.toFixed(3)}"></span>
        <span class="xp-threshold" style="--threshold:${thresholdRatio}"></span>
      </span>
      <span class="xp-value">${earnedXp}/${totalXp}</span>
    </aside>
  `;
}

function renderQuestionSlide(q, slide, index) {
  if (slide.id === "source") {
    const earned = state.sourceXpEarned;
    return `
      <section class="question-slide-panel is-source">
        <div class="source-slide-head">
          <div>
            <p class="question-number">${q.number}</p>
            <h1 class="story-title">${q.title}</h1>
          </div>
          <button class="prayer-audio-trigger${state.sourceAudioActive ? " is-player" : ""}" type="button" data-action="toggle-source-audio" aria-label="${state.sourceAudioActive ? "Play or pause reading" : "Read question aloud"}">
            ${icon(state.sourceAudioActive && state.sourceAudioPlaying ? "pause" : state.sourceAudioActive ? "play" : "speaker")}
          </button>
        </div>
        <div class="question-text-scroll">
          <p>${q.body}</p>
        </div>
        <div class="source-slide-actions">
          <div class="deep-dive-timer source-timer${earned ? " is-earned" : ""}" aria-label="${earned ? "5 XP earned" : `${state.sourceSeconds} seconds remaining`}">
            <span class="timer-count">${earned ? doneTick() : state.sourceSeconds}</span>
            <span class="timer-copy">${earned ? "+5xp earned" : "Read +5xp"}</span>
          </div>
          <button class="drawn-button deep-dive-cta" type="button" data-action="open-deep-dive">
            Deep Dive <span>+15xp</span>
          </button>
        </div>
      </section>
    `;
  }
  if (slide.id === "deep-dive") {
    const earned = state.deepDiveXpEarned;
    return `
      <section class="question-slide-panel is-deep-dive">
        <div class="deep-dive-head">
          <div>
            <p class="question-number">${cccDeepDive.source}</p>
            <h1 class="story-title">${cccDeepDive.title}</h1>
          </div>
          <button class="prayer-audio-trigger${state.deepDiveAudioActive ? " is-player" : ""}" type="button" data-action="toggle-deep-dive-audio" aria-label="${state.deepDiveAudioActive ? "Play or pause reading" : "Read deep dive aloud"}">
            ${icon(state.deepDiveAudioActive && state.deepDiveAudioPlaying ? "pause" : state.deepDiveAudioActive ? "play" : "speaker")}
          </button>
        </div>
        <div class="question-text-scroll deep-dive-text-scroll">
          <p>${cccDeepDive.body}</p>
        </div>
        <div class="deep-dive-timer${earned ? " is-earned" : ""}" aria-label="${earned ? "15 XP earned" : `${state.deepDiveSeconds} seconds remaining`}">
          <span class="timer-count">${earned ? doneTick() : state.deepDiveSeconds}</span>
          <span class="timer-copy">${earned ? "+15xp earned" : "stay here to unlock +15xp"}</span>
        </div>
      </section>
    `;
  }
  if (slide.id === "match") {
    const symbolToken = (symbol, pairIndex) => `
      <span class="match-token is-symbol${pairIndex < 3 ? " is-active" : ""}">
        <img class="match-icon" src="./assets/illustrations/holy-spirit-icons/${symbol}-icon.png" alt="" aria-hidden="true" />
        <span>${symbol}</span>
      </span>
    `;
    return `
      <section class="question-slide-panel">
        <p class="question-number">+${slide.xp}xp</p>
        <h1 class="story-title">${slide.title}</h1>
        <div class="match-game" aria-label="Match symbols of the Holy Spirit">
          <div class="match-column">
            ${slide.pairs.map(([symbol], pairIndex) => symbolToken(symbol, pairIndex)).join("")}
          </div>
          <div class="match-column">
            ${slide.pairs.map(([, meaning], pairIndex) => `<span class="match-token is-meaning${pairIndex < 3 ? " is-active" : ""}">${meaning}</span>`).join("")}
          </div>
        </div>
      </section>
    `;
  }
  return `
    <section class="question-slide-panel is-reflection">
      <p class="question-number">+${slide.xp}xp</p>
      <h1 class="story-title">${slide.title}</h1>
      <div class="reflection-prompt">
        <svg class="fountain-pen-icon" viewBox="0 0 48 48" aria-hidden="true">
          <path d="M31.4 5.7c4.5 2.7 7.9 5.7 10.5 9.5-8.7 9-17.8 17.5-27.3 25.4-3-2.4-5.5-4.9-7.6-7.8C14.8 23.7 22.8 14.7 31.4 5.7Z"/>
          <path d="M27.7 9.8c3.6 2.5 6.8 5.4 9.7 8.7"/>
          <path d="M8.1 33.5c3.5.6 6.4 2.6 8.4 5.9"/>
          <path d="M7.1 34.1c1.2 3.1 1.8 5.8 1.8 8.4 2.6-.5 5.1-1.1 7.2-2.4"/>
          <path d="M11.5 37.6c.5-.5 1.1-.8 1.8-.8"/>
        </svg>
        <p>Describe in your own words and share with the community your thoughts about this question.</p>
      </div>
    </section>
  `;
}

function renderQuestion(options = {}) {
  const q = questions[options.questionId || state.params.question] || questions["spirit-113"];
  const showBack = options.showBack !== false;
  const backTarget = options.backTarget || "home";
  const slideIndex = Math.min(state.questionSlide, questionSlides.length - 1);
  const slide = questionSlides[slideIndex];
  return `
    <div class="page question-carousel-page">
      ${showBack ? backButton(backTarget) : `<div class="question-top-spacer" aria-hidden="true"></div>`}
      <div class="question-carousel">
        ${renderQuestionSlide(q, slide, slideIndex)}
      </div>
      <div class="question-bottom-controls">
        <div class="prayer-step-nav">
          ${prayerArrow("prev", slideIndex === 0, "question")}
          ${renderPrayerDots(slideIndex, questionSlides.length)}
          ${prayerArrow("next", slideIndex === questionSlides.length - 1, "question")}
        </div>
        ${renderQuestionXpRail(slideIndex)}
      </div>
    </div>
  `;
}

function renderStory() {
  const step = storySteps[state.storyStep];
  return `
    <div class="page">
      ${backButton("question")}
      <div class="story-steps" aria-label="Story progress">
        ${storySteps.map((_, index) => `<span class="story-step-line${index <= state.storyStep ? " is-active" : ""}"></span>`).join("")}
      </div>
      <article class="story-card">
        <div>
          <p class="story-kicker">${step.label}</p>
          <h1 class="story-title">${step.title}</h1>
        </div>
        <p class="story-body${state.storyStep === 0 ? " quote-patch" : ""}">${step.body}</p>
        ${state.storyStep === 2 ? puzzlePreview() : ""}
        ${state.storyStep === 4 ? sharePreview() : ""}
      </article>
      <div class="button-row">
        <button class="ghost-button" type="button" data-action="story-prev">Back</button>
        <button class="drawn-button" type="button" data-action="story-next">${state.storyStep === storySteps.length - 1 ? "Reflections" : "Next"}</button>
      </div>
      <button class="text-link" type="button" data-action="go" data-route="explore">skip</button>
    </div>
  `;
}

function puzzlePreview() {
  return `
    <div class="chip-row">
      <span class="chip is-active">gift</span>
      <span class="chip">guide</span>
      <span class="chip">love</span>
    </div>
  `;
}

function sharePreview() {
  return `
    <div class="quote-patch">
      <p class="story-body">"I think the Spirit is not loud. He makes me brave enough to pray honestly."</p>
      <p class="caption">Alice, draft reflection</p>
    </div>
  `;
}

function renderReflections() {
  const focus = state.params.focus;
  const rows = [
    { id: "anna", name: "Anna, 17", text: "I liked the idea that faith is not only learning. It also becomes prayer.", hearts: 6, question: "YOUCAT 113" },
    { id: "leo", name: "Leo, 16", text: "The puzzle helped me remember gift, guide, love.", hearts: 3 },
    { id: "maria", name: "Maria, 18", text: "For me the Holy Spirit is quiet courage before school.", hearts: 9 },
  ];
  const visibleRows = focus ? rows.filter((row) => row.id === focus) : rows;
  return `
    <div class="page">
      ${backButton("question")}
      <div class="page-head">
        ${focus ? `<p class="question-number">YOUCAT 113 - Holy Spirit</p>` : `<p class="eyebrow">Same age group</p>`}
        <h1 class="route-title">Reflections</h1>
      </div>
      <div>
        ${visibleRows.map((row) => `
          <article class="reflection-row${row.id === focus ? " is-focused" : ""}">
            <div>
              <p class="reflection-name">${row.name}</p>
              ${row.question ? `<p class="item-meta">${row.question}</p>` : ""}
              <p class="reflection-text">${row.text}</p>
            </div>
            <button class="heart-button" type="button" data-action="heart" data-person="${row.id}">
              ${icon("heart")}
              <span>${row.hearts + state.heartsGiven[row.id]}</span>
            </button>
          </article>
        `).join("")}
      </div>
      <button class="drawn-button" type="button" data-action="go" data-route="explore">Unlock next question</button>
    </div>
  `;
}

function renderRead() {
  return `
    <div class="page">
      <div class="page-head">
        <h1 class="route-title">Library</h1>
      </div>
      <section class="section">
        <div class="section-head">
          <h2 class="section-title">Books</h2>
        </div>
        <div class="library-list">
          ${books.map((book) => `
            <div class="book-row ${book.css}">
              <span>
                <span class="book-name">${book.name}</span>
                ${book.meta ? `<span class="item-meta">${book.meta}</span>` : ""}
              </span>
              ${book.total ? progressStatus(book.progress, book.total, { red: book.id === "love" }) : ""}
              ${book.total ? progressBar(book.progress, book.total, { red: book.id === "love" }) : ""}
            </div>
          `).join("")}
        </div>
      </section>
    </div>
  `;
}

function renderReader() {
  const book = books.find((entry) => entry.id === state.params.book) || books[0];
  const body = {
    youcat: ["YOUCAT 469", "Why do we pray?", "We pray because we are full of an infinite longing and because God has created us for himself."],
    docat: ["DOCAT 4", "Justice and charity", "Faith becomes concrete when love of God and neighbor shapes the way we live together."],
    love: ["Love Forever 17", "Learning to love", "Love is not only a feeling. It grows through freedom, truth, and faithful decisions."],
    bible: ["John 14", "The Advocate", "The Holy Spirit will teach you and remind you of what Christ has said."],
    ccc: ["CCC", "Reference", "The Catechism opens here in a quiet reading mode with search and linked questions."],
    classics: ["Classics", "Saint Augustine", "The classics sit beside the catechism so deeper reading feels nearby, not hidden."],
  }[book.id];
  return `
    <div class="page reader-panel">
      ${backButton("library")}
      <div class="page-head">
        <p class="question-number">${body[0]}</p>
        <h1 class="route-title">${body[1]}</h1>
      </div>
      <div class="answer-block">
        <p class="reader-text">${body[2]}</p>
      </div>
      ${book.total ? progressBar(book.progress, book.total, { red: book.id === "love" }) : ""}
      <div class="button-row">
        <button class="drawn-button" type="button" data-action="open-question" data-question="spirit-113">Open path</button>
        <button class="ghost-button" type="button" data-action="bookmark">Bookmark</button>
      </div>
    </div>
  `;
}

function renderGroups() {
  return `
    <div class="page">
      <div class="group-hero">
        <img class="hero-illustration" src="./assets/illustrations/isabelle-checkered-flag.png" alt="" />
        <div class="page-head">
          <p class="eyebrow">Groups</p>
          <h1 class="route-title">Together</h1>
          <p class="support">Study paths, live reflections, and small ad-hoc rooms.</p>
        </div>
      </div>
      <div class="button-row">
        <button class="drawn-button" type="button" data-action="open-group" data-group="alpha-youth">Join code</button>
        <button class="ghost-button" type="button" data-action="open-group" data-group="st-mary">Create</button>
      </div>
      <section class="section">
        <div class="section-head">
          <h2 class="section-title">Alice's groups</h2>
        </div>
        <div class="plain-list">
          ${groups.map((group) => `
            <button class="plain-row" type="button" data-action="open-group" data-group="${group.id}">
              <span><span class="item-title">${group.title}</span><span class="item-meta">${group.meta}</span></span>
              <span class="status-chip">${group.progress}</span>
            </button>
          `).join("")}
        </div>
      </section>
    </div>
  `;
}

function renderGroup() {
  const group = groups.find((entry) => entry.id === state.params.group) || groups[0];
  return `
    <div class="page">
      ${backButton("groups")}
      <div class="page-head">
        <p class="eyebrow">Group</p>
        <h1 class="route-title">${group.title}</h1>
        <p class="support">${group.meta}</p>
        ${group.id === "alpha-youth" ? `<span class="group-code">ETLS</span>` : ""}
      </div>
      <section class="section">
        <div class="section-head">
          <h2 class="section-title">Path</h2>
        </div>
        <div class="mission-list">
          ${missions.map(missionRow).join("")}
        </div>
      </section>
      <section class="section">
        <div class="section-head">
          <h2 class="section-title">Live answers</h2>
        </div>
        <article class="reflection-row">
          <div>
            <p class="reflection-name">Mara</p>
            <p class="reflection-text">Tonight we only need the first Holy Spirit step and one reflection.</p>
          </div>
          <button class="heart-button" type="button" data-action="heart" data-person="maria">${icon("heart")}<span>4</span></button>
        </article>
      </section>
    </div>
  `;
}

function renderPray() {
  return `
    <div class="page">
      <div class="prayer-hero">
        <img class="hero-illustration" src="./assets/illustrations/john-praying-at-bed.png" alt="" />
        <div class="page-head">
          <h1 class="route-title">Pray</h1>
        </div>
      </div>
      <section class="section">
        <div class="section-head">
          <h2 class="section-title">Guided prayers</h2>
        </div>
        <div class="prayer-list">
          ${prayers.map((prayer) => `
            <button class="prayer-row" type="button" data-action="open-prayer" data-prayer="${prayer.id}">
              <span><span class="item-title">${prayer.title}</span></span>
              ${progressStatus(prayer.progress, prayer.total)}
              ${progressBar(prayer.progress, prayer.total)}
            </button>
          `).join("")}
        </div>
      </section>
      <section class="section">
        <div class="section-head">
          <h2 class="section-title">Prayers</h2>
        </div>
        <div class="prayer-title-list">
          ${renderCatholicPrayerRows()}
        </div>
      </section>
    </div>
  `;
}

function rosaryBeadState(index) {
  if (index < state.rosaryStep) return " is-done";
  if (index === state.rosaryStep) return " is-current";
  return "";
}

function pointOnCurve(start, control, end, t) {
  const oneMinus = 1 - t;
  return [
    oneMinus * oneMinus * start[0] + 2 * oneMinus * t * control[0] + t * t * end[0],
    oneMinus * oneMinus * start[1] + 2 * oneMinus * t * control[1] + t * t * end[1],
  ];
}

function rosaryLoopPoints() {
  const anchors = [
    [96, 24],
    [290, 60],
    [316, 230],
    [174, 316],
    [22, 246],
    [96, 24],
  ];
  const controls = [
    [191, -4],
    [337, 130],
    [300, 320],
    [80, 346],
    [0, 127],
  ];
  const points = [];
  for (let decade = 0; decade < 5; decade += 1) {
    points.push(anchors[decade]);
    for (let bead = 1; bead <= 10; bead += 1) {
      const t = bead / 11;
      const [x, y] = pointOnCurve(anchors[decade], controls[decade], anchors[decade + 1], t);
      const wobbleX = ((bead % 3) - 1) * 1.8 + (decade % 2 ? -0.8 : 0.8);
      const wobbleY = (bead % 2 ? 1.4 : -1.1) + (decade === 2 ? 1.2 : 0);
      points.push([x + wobbleX, y + wobbleY]);
    }
  }
  return points;
}

function rosaryPointString(points, offset = 0) {
  return points
    .map(([x, y], index) => {
      const wobble = offset ? (index % 2 ? offset : -offset) : 0;
      return `${(x + wobble).toFixed(1)},${(y - wobble * 0.7).toFixed(1)}`;
    })
    .join(" ");
}

function renderRosaryBeads(steps, loopPoints) {
  const beads = [
    `<circle class="rosary-bead is-cross${rosaryBeadState(0)}" cx="168" cy="456" r="8.6" />`,
    `<circle class="rosary-bead is-large${rosaryBeadState(1)}" cx="168" cy="410" r="9" />`,
    `<circle class="rosary-bead${rosaryBeadState(2)}" cx="168" cy="385" r="6.3" />`,
    `<circle class="rosary-bead${rosaryBeadState(3)}" cx="168" cy="360" r="6.3" />`,
    `<circle class="rosary-bead${rosaryBeadState(4)}" cx="168" cy="335" r="6.3" />`,
  ];
  for (let circleIndex = 0; circleIndex < loopPoints.length; circleIndex += 1) {
    const stepIndex = circleIndex + 5;
    const [cx, cy] = loopPoints[circleIndex];
    const isLarge = steps[stepIndex]?.bead === "decade-big";
    beads.push(`<circle class="rosary-bead${isLarge ? " is-large" : ""}${rosaryBeadState(stepIndex)}" cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${isLarge ? 8.9 : 5.35}" />`);
  }
  return beads.join("");
}

function renderRosaryPrayerText(step) {
  if (state.knowsRosaryPrayers && step.kind === "known") {
    return `<p class="rosary-prayer-text is-hidden-prayer">Pray this from memory.</p>`;
  }
  return `<p class="rosary-prayer-text">${step.text}</p>`;
}

function renderRosaryIntro() {
  return `
    <div class="page rosary-page rosary-intro-page">
      ${backButton("pray")}
      <div class="rosary-head">
        <h1 class="route-title">Rosary</h1>
        <button class="known-prayers-toggle${state.knowsRosaryPrayers ? " is-on" : ""}" type="button" data-action="toggle-known-prayers" aria-pressed="${state.knowsRosaryPrayers}">
          <span class="toggle-track"><span class="toggle-thumb"></span></span>
          <span>I known the Hail Mary, Creed, Our Father</span>
        </button>
      </div>
      <section class="mystery-picker" aria-label="Choose mysteries">
        ${Object.entries(mysterySets).map(([key, set]) => `
          <button class="mystery-choice${state.selectedMysteries === key ? " is-active" : ""}" type="button" data-action="select-mysteries" data-mysteries="${key}">
            <span>${set.label}</span>
          </button>
        `).join("")}
      </section>
      <button class="drawn-button" type="button" data-action="start-rosary">Begin rosary</button>
    </div>
  `;
}

function renderRosaryPrayer() {
  if (!state.rosaryStarted) return renderRosaryIntro();
  const steps = createRosarySteps();
  const step = steps[state.rosaryStep] || steps[steps.length - 1];
  const completed = state.rosaryStep >= steps.length - 1;
  const selected = mysterySets[state.selectedMysteries] || mysterySets.joyful;
  const loopPoints = rosaryLoopPoints();
  return `
    <div class="page rosary-page">
      ${backButton("pray")}
      <p class="rosary-context">${selected.label}</p>

      <button class="rosary-stage" type="button" data-action="rosary-next" aria-label="Tap to continue Rosary">
        <svg class="rosary-drawing" viewBox="0 0 336 470" aria-hidden="true">
          <polyline class="rosary-string" points="${rosaryPointString([...loopPoints, loopPoints[0]])}" />
          <polyline class="rosary-string is-second" points="${rosaryPointString([...loopPoints, loopPoints[0]], 1.4)}" />
          <path class="rosary-tail" d="M175 315c-6 25-7 66-7 98" />
          <path class="rosary-tail is-intro" d="M168 334c.6 39 .2 79-.1 124" />
          <path class="rosary-cross" d="M151 457c11-.7 23-.7 34 .2" />
          <path class="rosary-cross" d="M168 440c.1 13 .1 23-.2 29" />
          ${renderRosaryBeads(steps, loopPoints)}
        </svg>
        <div class="rosary-center">
          <p class="rosary-step-count">${state.rosaryStep + 1}/${steps.length}</p>
          <h2>${step.title}</h2>
          <div class="rosary-prayer-scroll">
            ${renderRosaryPrayerText(step)}
          </div>
        </div>
      </button>

      ${completed
        ? `<button class="mark-prayed-button" type="button" data-action="mark-prayed">Mark as prayed</button>`
        : `<button class="tap-continue" type="button" data-action="rosary-next"><span>tap to continue</span></button>`}
    </div>
  `;
}

function prayerArrow(direction, disabled = false, actionPrefix = "prayer") {
  return `
    <button class="prayer-arrow is-${direction}" type="button" data-action="${actionPrefix}-${direction}" ${disabled ? "disabled" : ""} aria-label="${direction === "prev" ? "Previous step" : "Next step"}">
      ${icon("arrow")}
    </button>
  `;
}

function renderPrayerDots(current, total) {
  return `
    <div class="prayer-progress-dots" aria-label="Prayer progress">
      ${Array.from({ length: total }, (_, index) => `
        <span class="prayer-dot${index === current ? " is-active" : ""}${index < current ? " is-done" : ""}"></span>
      `).join("")}
    </div>
  `;
}

function renderPrayerAudioControls() {
  if (state.prayerAudioVisible) {
    return `
      <button class="prayer-audio-trigger is-player${state.prayerAudioPlaying ? " is-playing" : ""}" type="button" data-action="toggle-prayer-audio" aria-label="${state.prayerAudioPlaying ? "Pause voice reading" : "Play voice reading"}">
        ${icon(state.prayerAudioPlaying ? "pause" : "play")}
      </button>
    `;
  }
  return `
    <button class="prayer-audio-trigger" type="button" data-action="show-prayer-audio" aria-label="Read prayer aloud">
      ${icon("speaker")}
    </button>
  `;
}

function renderPrayer() {
  const prayerId = state.params.prayer || "evening";
  if (prayerId === "rosary") return renderRosaryPrayer();
  const title = prayers.find((entry) => entry.id === prayerId)?.title || "Morning offering";
  const stepIndex = Math.min(state.prayerStep, eveningPrayerSteps.length - 1);
  const step = eveningPrayerSteps[stepIndex];
  const isLast = stepIndex === eveningPrayerSteps.length - 1;
  return `
    <div class="page prayer-page">
      ${backButton("pray")}
      <div class="page-head">
        <h1 class="route-title">${title}</h1>
        ${renderPrayerAudioControls()}
      </div>
      <img class="prayer-step-illustration" src="${step.image}" alt="" />
      <section class="prayer-step-panel" aria-label="${step.title}">
        <h2>${step.title}</h2>
        <div class="prayer-text-scroll">
          <div>
            ${step.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("")}
          </div>
        </div>
      </section>
      <div class="prayer-bottom-controls">
        <div class="prayer-step-nav">
          ${prayerArrow("prev", stepIndex === 0)}
          ${renderPrayerDots(stepIndex, eveningPrayerSteps.length)}
          ${prayerArrow("next", isLast)}
        </div>
        ${isLast ? `<button class="mark-prayed-button" type="button" data-action="mark-prayer">Mark as prayed</button>` : ""}
      </div>
    </div>
  `;
}

function renderSettings() {
  return `
    <div class="page settings-panel">
      ${backButton("home")}
      <div class="page-head">
        <p class="eyebrow">Alice</p>
        <h1 class="route-title">Settings</h1>
      </div>
      <div>
        <div class="settings-row"><span class="item-title">Personal info</span><span class="settings-value">Alice M.</span></div>
        <div class="settings-row"><span class="item-title">Language</span><span class="settings-value">English</span></div>
        <div class="settings-row"><span class="item-title">Subscription</span><span class="settings-value">Family</span></div>
        <div class="settings-row"><span class="item-title">Notifications</span><span class="settings-value">quiet</span></div>
        <div class="settings-row"><span class="item-title">Sign out</span><span class="settings-value"></span></div>
        <div class="settings-row"><span class="item-title">Delete account</span><span class="settings-value"></span></div>
      </div>
    </div>
  `;
}

function renderNotifications() {
  return `
    <div class="page notifications-page">
      ${backButton("home")}
      <div class="page-head">
        <h1 class="route-title">Notifications</h1>
      </div>
      <button class="drawn-button notifications-read-all" type="button" data-action="mark-notifications-read">Mark all as read</button>
      <button class="notification-row is-unread" type="button" data-action="open-reflection-notification" data-focus="anna">
        <span class="unread-dot" aria-label="unread"></span>
        <div>
          <p class="reflection-name">Anna hearted your reflection</p>
          <p class="reflection-text">"The Spirit makes me brave enough to pray honestly."</p>
        </div>
        <span class="heart-button is-static">${icon("heart")}<span>1</span></span>
      </button>
      <button class="notification-row" type="button" data-action="open-prayer" data-prayer="evening">
        <div>
          <p class="reflection-name">Evening prayer is ready</p>
          <p class="reflection-text">Alice usually finishes this after 20:00.</p>
        </div>
      </button>
    </div>
  `;
}

function render() {
  const renderer = {
    home: renderHome,
    explore: renderExplore,
    question: renderQuestion,
    story: renderStory,
    reflections: renderReflections,
    read: renderRead,
    reader: renderReader,
    groups: renderGroups,
    group: renderGroup,
    pray: renderPray,
    prayer: renderPrayer,
    settings: renderSettings,
    notifications: renderNotifications,
  }[state.route] || renderHome;

  screenEl.innerHTML = renderer();
  const active = routesWithNav[state.route] || "home";
  navItems.forEach((item) => item.classList.toggle("is-active", item.dataset.route === active));
  requestAnimationFrame(() => {
    screenEl.scrollTop = 0;
    updatePrayerTextFade();
    updateRosaryTextFade();
  });
  syncSourceTimer();
  syncDeepDiveTimer();
}

function updatePrayerTextFade() {
  screenEl.querySelectorAll(".prayer-text-scroll, .question-text-scroll").forEach((scrollArea) => {
    const hasHiddenText = scrollArea.scrollHeight > scrollArea.clientHeight + 2;
    scrollArea.classList.toggle("has-overflow", hasHiddenText);
  });
}

function updateRosaryTextFade() {
  screenEl.querySelectorAll(".rosary-prayer-scroll").forEach((scrollArea) => {
    const hasHiddenText = scrollArea.scrollHeight > scrollArea.clientHeight + 2;
    scrollArea.classList.toggle("has-overflow", hasHiddenText);
  });
}

function isDeepDiveSlideActive() {
  return ["question", "explore"].includes(state.route) && questionSlides[state.questionSlide]?.id === "deep-dive";
}

function isSourceSlideActive() {
  return ["question", "explore"].includes(state.route) && questionSlides[state.questionSlide]?.id === "source";
}

function stopSourceTimer() {
  if (!sourceTimerId) return;
  clearInterval(sourceTimerId);
  sourceTimerId = null;
}

function stopDeepDiveTimer() {
  if (!deepDiveTimerId) return;
  clearInterval(deepDiveTimerId);
  deepDiveTimerId = null;
}

function syncSourceTimer() {
  if (!isSourceSlideActive() || state.sourceSeconds <= 0) {
    stopSourceTimer();
    return;
  }
  if (sourceTimerId) return;
  sourceTimerId = setInterval(() => {
    if (!isSourceSlideActive()) {
      stopSourceTimer();
      return;
    }
    state.sourceSeconds = Math.max(0, state.sourceSeconds - 1);
    if (state.sourceSeconds === 0) {
      state.sourceXpEarned = true;
      stopSourceTimer();
    }
    render();
  }, 1000);
}

function syncDeepDiveTimer() {
  if (!isDeepDiveSlideActive() || state.deepDiveSeconds <= 0) {
    stopDeepDiveTimer();
    return;
  }
  if (deepDiveTimerId) return;
  deepDiveTimerId = setInterval(() => {
    if (!isDeepDiveSlideActive()) {
      stopDeepDiveTimer();
      return;
    }
    state.deepDiveSeconds = Math.max(0, state.deepDiveSeconds - 1);
    if (state.deepDiveSeconds === 0) {
      state.deepDiveXpEarned = true;
      stopDeepDiveTimer();
    }
    render();
  }, 1000);
}

function go(route, params = {}) {
  state.history.push({
    route: state.route,
    params: { ...state.params },
    storyStep: state.storyStep,
    questionSlide: state.questionSlide,
    deepDiveOpen: state.deepDiveOpen,
    sourceSeconds: state.sourceSeconds,
    sourceXpEarned: state.sourceXpEarned,
    sourceAudioActive: state.sourceAudioActive,
    sourceAudioPlaying: state.sourceAudioPlaying,
    deepDiveSeconds: state.deepDiveSeconds,
    deepDiveXpEarned: state.deepDiveXpEarned,
    deepDiveAudioActive: state.deepDiveAudioActive,
    deepDiveAudioPlaying: state.deepDiveAudioPlaying,
    prayerStep: state.prayerStep,
  });
  state.route = route;
  state.params = params;
  render();
}

function back() {
  const previous = state.history.pop();
  if (!previous) {
    go("home");
    return;
  }
  state.route = previous.route;
  state.params = previous.params;
  state.storyStep = previous.storyStep;
  state.questionSlide = previous.questionSlide || 0;
  state.deepDiveOpen = Boolean(previous.deepDiveOpen);
  state.sourceSeconds = previous.sourceSeconds ?? 7;
  state.sourceXpEarned = Boolean(previous.sourceXpEarned);
  state.sourceAudioActive = Boolean(previous.sourceAudioActive);
  state.sourceAudioPlaying = Boolean(previous.sourceAudioPlaying);
  state.deepDiveSeconds = previous.deepDiveSeconds ?? 10;
  state.deepDiveXpEarned = Boolean(previous.deepDiveXpEarned);
  state.deepDiveAudioActive = Boolean(previous.deepDiveAudioActive);
  state.deepDiveAudioPlaying = Boolean(previous.deepDiveAudioPlaying);
  state.prayerStep = previous.prayerStep;
  render();
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("[data-action]");
  if (!target) return;

  const action = target.dataset.action;
  if (action === "go") {
    if (target.dataset.route === "explore") {
      state.questionSlide = 0;
      state.deepDiveOpen = false;
      state.sourceSeconds = 7;
      state.sourceXpEarned = false;
      state.sourceAudioActive = false;
      state.sourceAudioPlaying = false;
      state.deepDiveSeconds = 10;
      state.deepDiveXpEarned = false;
      state.deepDiveAudioActive = false;
      state.deepDiveAudioPlaying = false;
    }
    go(target.dataset.route || "home");
  }
  if (action === "back") {
    stopSourceTimer();
    stopDeepDiveTimer();
    back();
  }
  if (action === "open-question") {
    state.questionSlide = 0;
    state.deepDiveOpen = false;
    state.sourceSeconds = 7;
    state.sourceXpEarned = false;
    state.sourceAudioActive = false;
    state.sourceAudioPlaying = false;
    state.deepDiveSeconds = 10;
    state.deepDiveXpEarned = false;
    state.deepDiveAudioActive = false;
    state.deepDiveAudioPlaying = false;
    go("question", { question: target.dataset.question || "spirit-113" });
  }
  if (action === "question-prev") {
    stopSourceTimer();
    stopDeepDiveTimer();
    state.questionSlide = previousQuestionSlideIndex(state.questionSlide);
    state.deepDiveOpen = false;
    state.sourceAudioActive = false;
    state.sourceAudioPlaying = false;
    state.deepDiveAudioActive = false;
    state.deepDiveAudioPlaying = false;
    render();
  }
  if (action === "question-next") {
    stopSourceTimer();
    stopDeepDiveTimer();
    state.questionSlide = nextQuestionSlideIndex(state.questionSlide);
    state.deepDiveOpen = false;
    state.sourceAudioActive = false;
    state.sourceAudioPlaying = false;
    state.deepDiveAudioActive = false;
    state.deepDiveAudioPlaying = false;
    render();
  }
  if (action === "open-deep-dive") {
    stopSourceTimer();
    state.questionSlide = questionSlides.findIndex((slide) => slide.id === "deep-dive");
    state.sourceAudioActive = false;
    state.sourceAudioPlaying = false;
    state.deepDiveSeconds = 10;
    state.deepDiveXpEarned = false;
    state.deepDiveAudioActive = false;
    state.deepDiveAudioPlaying = false;
    render();
  }
  if (action === "toggle-source-audio") {
    if (!state.sourceAudioActive) {
      state.sourceAudioActive = true;
      state.sourceAudioPlaying = true;
    } else {
      state.sourceAudioPlaying = !state.sourceAudioPlaying;
    }
    render();
  }
  if (action === "toggle-deep-dive-audio") {
    if (!state.deepDiveAudioActive) {
      state.deepDiveAudioActive = true;
      state.deepDiveAudioPlaying = true;
    } else {
      state.deepDiveAudioPlaying = !state.deepDiveAudioPlaying;
    }
    render();
  }
  if (action === "start-story") {
    state.storyStep = 0;
    go("story", { question: target.dataset.question || "spirit-113" });
  }
  if (action === "story-next") {
    if (state.storyStep >= storySteps.length - 1) {
      go("reflections");
    } else {
      state.storyStep += 1;
      render();
    }
  }
  if (action === "story-prev") {
    state.storyStep = Math.max(0, state.storyStep - 1);
    render();
  }
  if (action === "open-reader") {
    go("reader", { book: target.dataset.book || "youcat" });
  }
  if (action === "open-reflection-notification") {
    go("reflections", { focus: target.dataset.focus || "anna", question: "spirit-113" });
  }
  if (action === "open-prayer") {
    if (target.dataset.prayer === "rosary") {
      state.rosaryStarted = false;
      state.rosaryStep = 0;
    } else {
      state.prayerStep = 0;
      state.prayerAudioVisible = false;
      state.prayerAudioPlaying = false;
    }
    go("prayer", { prayer: target.dataset.prayer || "evening" });
  }
  if (action === "prayer-prev") {
    state.prayerStep = Math.max(0, state.prayerStep - 1);
    render();
  }
  if (action === "prayer-next") {
    state.prayerStep = Math.min(eveningPrayerSteps.length - 1, state.prayerStep + 1);
    render();
  }
  if (action === "show-prayer-audio") {
    state.prayerAudioVisible = true;
    state.prayerAudioPlaying = false;
    render();
  }
  if (action === "toggle-prayer-audio") {
    state.prayerAudioPlaying = !state.prayerAudioPlaying;
    render();
  }
  if (action === "rosary-next") {
    const steps = createRosarySteps();
    state.rosaryStep = Math.min(steps.length - 1, state.rosaryStep + 1);
    render();
  }
  if (action === "select-mysteries") {
    state.selectedMysteries = target.dataset.mysteries || "joyful";
    render();
  }
  if (action === "start-rosary") {
    state.rosaryStarted = true;
    state.rosaryStep = 0;
    render();
  }
  if (action === "toggle-known-prayers") {
    state.knowsRosaryPrayers = !state.knowsRosaryPrayers;
    render();
  }
  if (action === "mark-prayed") {
    const rosary = prayers.find((prayer) => prayer.id === "rosary");
    if (rosary) rosary.progress = rosary.total;
    go("pray");
  }
  if (action === "mark-prayer") {
    const prayer = prayers.find((entry) => entry.id === (state.params.prayer || "evening"));
    if (prayer) prayer.progress = prayer.total;
    go("pray");
  }
  if (action === "open-group") {
    go("group", { group: target.dataset.group || "st-mary" });
  }
  if (action === "heart") {
    const person = target.dataset.person;
    state.heartsGiven[person] = (state.heartsGiven[person] || 0) + 1;
    render();
  }
  if (action === "bookmark") {
    target.textContent = "Saved";
  }
  if (action === "toggle-bookmarks") {
    state.bookmarksExpanded = !state.bookmarksExpanded;
    updateBookmarkResults();
  }
  if (action === "mark-notifications-read") {
    screenEl.querySelectorAll(".notification-row.is-unread").forEach((row) => {
      row.classList.remove("is-unread");
      row.querySelector(".unread-dot")?.remove();
    });
  }
});

document.addEventListener("input", (event) => {
  const target = event.target.closest("[data-action='bookmark-search']");
  if (!target) return;

  state.bookmarkQuery = target.value;
  state.bookmarksExpanded = Boolean(state.bookmarkQuery.trim());
  updateBookmarkResults();
});

render();
