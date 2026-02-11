// Animal Guessing Game — extended to load a huge list and infer attributes
(() => {
  /** ---------------------------------------
   * Helpers
   * --------------------------------------- */
  const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const escapeHtml = (s) => s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;', "'":'&#039;'}[c]));

  function A(name, emoji, attrs) {
    return { id: slug(name), name, emoji: emoji || "❓", ...attrs };
  }

  /** ---------------------------------------
   * Curated baseline dataset (high-quality answers)
   * --------------------------------------- */
  const BASE = [
    // Mammals
    A("Cow","🐄",{category:"mammal",canFly:false,canSwim:false,aquatic:false,isDomestic:true,hasFur:true,hasFeathers:false,hasScales:false,laysEggs:false,numberOfLegs:4,diet:"herbivore",habitat:"farm",size:"large"}),
    A("Lion","🦁",{category:"mammal",canFly:false,canSwim:false,aquatic:false,isDomestic:false,hasFur:true,hasFeathers:false,hasScales:false,laysEggs:false,numberOfLegs:4,diet:"carnivore",habitat:"savanna",size:"large"}),
    A("Dog","🐕",{category:"mammal",canFly:false,canSwim:false,aquatic:false,isDomestic:true,hasFur:true,hasFeathers:false,hasScales:false,laysEggs:false,numberOfLegs:4,diet:"omnivore",habitat:"home",size:"medium"}),
    A("Cat","🐈",{category:"mammal",canFly:false,canSwim:false,aquatic:false,isDomestic:true,hasFur:true,hasFeathers:false,hasScales:false,laysEggs:false,numberOfLegs:4,diet:"carnivore",habitat:"home",size:"small"}),
    A("Bat","🦇",{category:"mammal",canFly:true,canSwim:false,aquatic:false,isDomestic:false,hasFur:true,hasFeathers:false,hasScales:false,laysEggs:false,numberOfLegs:2,diet:"insectivore",habitat:"cave",size:"small",nocturnal:true}),
    A("Elephant","🐘",{category:"mammal",canFly:false,canSwim:true,aquatic:false,isDomestic:false,hasFur:false,hasFeathers:false,hasScales:false,laysEggs:false,numberOfLegs:4,diet:"herbivore",habitat:"savanna",size:"large"}),
    A("Horse","🐎",{category:"mammal",canFly:false,canSwim:false,aquatic:false,isDomestic:true,hasFur:true,hasFeathers:false,hasScales:false,laysEggs:false,numberOfLegs:4,diet:"herbivore",habitat:"farm",size:"large"}),
    A("Dolphin","🐬",{category:"mammal",canFly:false,canSwim:true,aquatic:true,isDomestic:false,hasFur:false,hasFeathers:false,hasScales:false,laysEggs:false,numberOfLegs:0,diet:"carnivore",habitat:"ocean",size:"medium"}),
    A("Whale","🐋",{category:"mammal",canFly:false,canSwim:true,aquatic:true,isDomestic:false,hasFur:false,hasFeathers:false,hasScales:false,laysEggs:false,numberOfLegs:0,diet:"carnivore",habitat:"ocean",size:"large"}),
    A("Kangaroo","🦘",{category:"mammal",canFly:false,canSwim:false,aquatic:false,isDomestic:false,hasFur:true,hasFeathers:false,hasScales:false,laysEggs:false,numberOfLegs:2,diet:"herbivore",habitat:"grassland",size:"medium"}),

    // Birds
    A("Eagle","🦅",{category:"bird",canFly:true,canSwim:false,aquatic:false,isDomestic:false,hasFur:false,hasFeathers:true,hasScales:false,laysEggs:true,numberOfLegs:2,diet:"carnivore",habitat:"mountains",size:"medium"}),
    A("Parrot","🦜",{category:"bird",canFly:true,canSwim:false,aquatic:false,isDomestic:false,hasFur:false,hasFeathers:true,hasScales:false,laysEggs:true,numberOfLegs:2,diet:"herbivore",habitat:"rainforest",size:"small"}),
    A("Penguin","🐧",{category:"bird",canFly:false,canSwim:true,aquatic:true,isDomestic:false,hasFur:false,hasFeathers:true,hasScales:false,laysEggs:true,numberOfLegs:2,diet:"carnivore",habitat:"antarctica",size:"medium"}),

    // Fish
    A("Salmon","🐟",{category:"fish",canFly:false,canSwim:true,aquatic:true,isDomestic:false,hasFur:false,hasFeathers:false,hasScales:true,laysEggs:true,numberOfLegs:0,diet:"omnivore",habitat:"river",size:"small"}),
    A("Shark","🦈",{category:"fish",canFly:false,canSwim:true,aquatic:true,isDomestic:false,hasFur:false,hasFeathers:false,hasScales:false,laysEggs:true,numberOfLegs:0,diet:"carnivore",habitat:"ocean",size:"large"}),

    // Amphibians & reptiles
    A("Frog","🐸",{category:"amphibian",canFly:false,canSwim:true,aquatic:true,isDomestic:false,hasFur:false,hasFeathers:false,hasScales:false,laysEggs:true,numberOfLegs:4,diet:"carnivore",habitat:"wetlands",size:"small"}),
    A("Crocodile","🐊",{category:"reptile",canFly:false,canSwim:true,aquatic:true,isDomestic:false,hasFur:false,hasFeathers:false,hasScales:true,laysEggs:true,numberOfLegs:4,diet:"carnivore",habitat:"river",size:"large"}),

    // Insects & others
    A("Bee","🐝",{category:"insect",canFly:true,canSwim:false,aquatic:false,isDomestic:false,hasFur:false,hasFeathers:false,hasScales:false,laysEggs:true,numberOfLegs:6,diet:"herbivore",habitat:"meadow",size:"small"}),
    A("Octopus","🐙",{category:"mollusk",canFly:false,canSwim:true,aquatic:true,isDomestic:false,hasFur:false,hasFeathers:false,hasScales:false,laysEggs:true,numberOfLegs:8,diet:"carnivore",habitat:"ocean",size:"medium"}),
  ];

  /** ---------------------------------------
   * Inference engine: guess attributes from the name
   * --------------------------------------- */
  const CATEGORY_MAP = [
    { cat: "mammal",    kws: ["dog","wolf","cat","lion","tiger","bear","goat","sheep","cow","horse","yak","buffalo","bison","camel","deer","fox","rabbit","monkey","ape","gorilla","chimp","panda","koala","wombat","otter","seal","walrus","whale","dolphin","bat","marmot","marten","skunk","badger","yakutian","mastiff","terrier","bulldog","retriever","poodle","husky","spaniel","greyhound","schnauzer","corgi","chow","malamute","elk","moose","boar","pig","puma","cougar","leopard","cheetah","hyena","human"] },
    { cat: "bird",      kws: ["eagle","owl","sparrow","finch","penguin","duck","goose","swan","hawk","parrot","hummingbird","kingfisher","woodpecker","warbler","tern","albatross","falcon","heron","ibis","kestrel","egret","crane","loon","bustard","jacana","grebe","vulture","potoo","cockatoo","cockatiel","rooster","chicken","turkey","hen","kite","swallow","toucan","oriole","bunting","raven","crow","condor"] },
    { cat: "fish",      kws: ["shark","eel","cod","salmon","trout","bass","tuna","catfish","snapper","piranha","pollock","sturgeon","mackerel","grouper","anchovy","anchovies","herring","perch","flounder","sole","gar","bowfin","sardine","paddlefish","ray","skate","wrasse","sunfish","snapper","drum"] },
    { cat: "reptile",   kws: ["snake","python","cobra","viper","boa","anaconda","lizard","gecko","iguana","monitor","chameleon","crocodile","alligator","tortoise","turtle","skink","tuatara"] },
    { cat: "amphibian", kws: ["frog","toad","salamander","newt","axolotl"] },
    { cat: "insect",    kws: ["ant","bee","wasp","beetle","butterfly","moth","dragonfly","damselfly","cockroach","mantis","stick","fly","mosquito","aphid","earwig","lacewing","caterpillar","locust","cricket"] },
    { cat: "arachnid",  kws: ["spider","scorpion","tick","tarantula","mite"] },
    { cat: "crustacean",kws: ["crab","lobster","shrimp","barnacle","woodlouse","krill"] },
    { cat: "mollusk",   kws: ["octopus","squid","nautilus","clam","oyster","mussel","snail","slug"] },
    { cat: "cnidarian", kws: ["jellyfish","anemone","hydra"] },
    { cat: "echinoderm",kws: ["starfish","sea urchin","sea cucumber"] },
    { cat: "dinosaur",  kws: ["saurus","raptor","pterosaur","pteranodon","pterodactyl","tyrannosaurus","allosaurus","stegosaurus","spinosaurus","brachiosaurus","velociraptor","triceratops","ichthyosaurus","plesiosaur","mosasaurus","titanoboa","megatherium","mastodon","mammoth","glyptodon","saber-toothed"] }, // includes some prehistoric
  ];

  const FLY_EXCEPTIONS = ["penguin","ostrich","emu","kiwi","cassowary","rhea","chicken","turkey"];
  const AQUATIC_MAMMALS = ["whale","dolphin","manatee","dugong","walrus","seal","sea lion","otter"];
  const SHARKY = ["shark","ray","skate"];
  const SNAKES = ["snake","python","cobra","viper","boa","anaconda"];
  const SPIDERS = ["spider","tarantula"];
  const INSECTS_FLYERS = ["bee","wasp","hornet","dragonfly","butterfly","moth","fly","mosquito"];
  const BIRDS_NONFLYERS = FLY_EXCEPTIONS;

  function inferCategory(name) {
    const t = name.toLowerCase();
    for (const m of CATEGORY_MAP) {
      if (m.kws.some(k => t.includes(k))) return m.cat;
    }
    // Fallback: some common suffixes
    if (/^.*\s+dog$/.test(t)) return "mammal";
    if (/^.*\s+cat$/.test(t)) return "mammal";
    return "unknown";
  }

  function inferAttributes(name) {
    const t = name.toLowerCase();
    const category = inferCategory(name);

    // Defaults
    let canFly = false, canSwim = false, aquatic = false;
    let hasFur = false, hasFeathers = false, hasScales = false, laysEggs = false;
    let numberOfLegs = 4;
    let diet = "omnivore", habitat = "varied", size = "medium";

    // Category-driven traits
    switch (category) {
      case "mammal":
        hasFur = !AQUATIC_MAMMALS.some(k => t.includes(k));
        laysEggs = false;
        numberOfLegs = t.includes("human") ? 2 : 4;
        canSwim = AQUATIC_MAMMALS.some(k => t.includes(k));
        aquatic = canSwim;
        // flying mammals (bats)
        if (t.includes("bat")) { canFly = true; numberOfLegs = 2; }
        break;

      case "bird":
        hasFeathers = true; laysEggs = true; numberOfLegs = 2;
        canFly = !BIRDS_NONFLYERS.some(k => t.includes(k));
        // swimmers
        if (t.includes("penguin") || t.includes("duck") || t.includes("goose") || t.includes("swan")) {
          canSwim = true; aquatic = t.includes("penguin");
        }
        break;

      case "fish":
        hasScales = !SHARKY.some(k => t.includes(k));
        laysEggs = true; numberOfLegs = 0; canSwim = true; aquatic = true;
        break;

      case "reptile":
        hasScales = true; laysEggs = true; numberOfLegs = 4; canSwim = /croc|gator|turtle|tortoise/i.test(t);
        if (SNAKES.some(k => t.includes(k))) numberOfLegs = 0;
        aquatic = /croc|gator|turtle|tortoise|sea snake|marine iguana/i.test(t);
        break;

      case "amphibian":
        laysEggs = true; numberOfLegs = 4; canSwim = true; aquatic = true;
        hasScales = false; hasFur = false; hasFeathers = false;
        break;

      case "insect":
        laysEggs = true; numberOfLegs = 6; hasScales = false; hasFur = false; hasFeathers = false;
        canFly = INSECTS_FLYERS.some(k => t.includes(k));
        break;

      case "arachnid":
        laysEggs = true; numberOfLegs = 8; hasScales = false; hasFur = false; hasFeathers = false;
        canFly = false;
        break;

      case "crustacean":
        laysEggs = true; numberOfLegs = 10; hasScales = false; canSwim = /lobster|shrimp|crab|krill/i.test(t);
        aquatic = true;
        numberOfLegs = t.includes("woodlouse") ? 14 : numberOfLegs; // isopod variety
        break;

      case "mollusk":
        laysEggs = true; hasScales = false; canSwim = /octopus|squid|nautilus/i.test(t);
        aquatic = canSwim || /clam|oyster|mussel|nautilus/i.test(t);
        numberOfLegs = t.includes("octopus") ? 8 : t.includes("squid") ? 10 : 0;
        break;

      case "cnidarian":
        laysEggs = false; numberOfLegs = 0; aquatic = true; canSwim = true;
        break;

      case "echinoderm":
        laysEggs = false; numberOfLegs = 5; aquatic = true; canSwim = false;
        break;

      case "dinosaur":
        laysEggs = true; hasScales = true; numberOfLegs = /ptero|pteranodon|pterodactyl/i.test(t) ? 2 : 4;
        canFly = /ptero|pteranodon|pterodactyl/i.test(t);
        aquatic = /ichthyosaur|plesiosaur|mosasaur|mosasaurus/i.test(t);
        canSwim = aquatic;
        break;

      default:
        // unknown — keep broad defaults
        numberOfLegs = 4;
        laysEggs = false;
        canFly = false;
        canSwim = false;
        aquatic = false;
        break;
    }

    // Extra tweaks
    if (SPIDERS.some(k => t.includes(k))) numberOfLegs = 8;
    if (t.includes("snake")) numberOfLegs = 0;
    if (t.includes("eel")) numberOfLegs = 0;

    const emojiByCat = {
      mammal:"🐾", bird:"🐦", fish:"🐟", reptile:"🦎", amphibian:"🐸", insect:"🐛",
      arachnid:"🕷️", crustacean:"🦀", mollusk:"🐙", cnidarian:"🪼", echinoderm:"⭐", dinosaur:"🦖", unknown:"❓"
    };

    return {
      category,
      canFly, canSwim, aquatic,
      hasFur, hasFeathers, hasScales, laysEggs,
      numberOfLegs, diet, habitat, size,
      emoji: emojiByCat[category] || "❓"
    };
  }

  /** ---------------------------------------
   * State & UI
   * --------------------------------------- */
  let hidden = null;
  let hintsUsed = 0;
  let gameOver = false;
  const MAX_HINTS = 2;

  const el = {
    questionInput: document.getElementById("questionInput"),
    guessInput: document.getElementById("guessInput"),
    askBtn: document.getElementById("askBtn"),
    guessBtn: document.getElementById("guessBtn"),
    hintBtn: document.getElementById("hintBtn"),
    giveUpBtn: document.getElementById("giveUpBtn"),
    newGameBtn: document.getElementById("newGameBtn"),
    hintCount: document.getElementById("hintCount"),
    score: document.getElementById("score"),
    logList: document.getElementById("logList"),
    emojiPanel: document.getElementById("emojiPanel"),
  };

  const SCORE = {
    get wins() { return +(localStorage.getItem("ag_wins") || 0); },
    get losses() { return +(localStorage.getItem("ag_losses") || 0); },
    set wins(v) { localStorage.setItem("ag_wins", v); },
    set losses(v) { localStorage.setItem("ag_losses", v); },
  };

  /** ---------------------------------------
   * Load animals.txt and build EXTRA set
   * --------------------------------------- */
  let EXTRA = [];

  async function loadAnimalsTxt() {
    try {
      const res = await fetch("animals.txt");
      if (!res.ok) throw new Error(`animals.txt not found (${res.status})`);
      const text = await res.text();
      const names = text.split(/\r?\n/).map(s => s.trim()).filter(Boolean);

      const seen = new Set();
      const built = [];
      for (const name of names) {
        const id = slug(name);
        if (seen.has(id)) continue;
        seen.add(id);
        const attrs = inferAttributes(name);
        built.push({ id, name, emoji: attrs.emoji, ...attrs });
      }
      EXTRA = built;

      logSystem(`Loaded ${EXTRA.length} animals from animals.txt`);
    } catch (e) {
      logSystem(`Could not load animals.txt: ${e.message}`);
    }
  }

  /** ---------------------------------------
   * Game setup
   * --------------------------------------- */
  function allAnimals() {
    return BASE.concat(EXTRA);
  }

  function pickRandom() {
    const list = allAnimals();
    return list[Math.floor(Math.random() * list.length)];
  }

  function newGame() {
    hidden = pickRandom();
    hintsUsed = 0;
    gameOver = false;
    el.hintBtn.disabled = false;
    el.hintCount.textContent = `Hints used: ${hintsUsed}/${MAX_HINTS}`;
    el.emojiPanel.textContent = "❓";
    el.logList.innerHTML = "";
    logSystem("A new animal has been chosen. Start asking yes/no questions!");
  }

  /** ---------------------------------------
   * Logging helpers
   * --------------------------------------- */
  function logQ(text) {
    const li = document.createElement("li");
    li.innerHTML = `<strong class="log-q">You:</strong> ${escapeHtml(text)}`;
    el.logList.prepend(li);
  }
  function logA(text) {
    const li = document.createElement("li");
    li.innerHTML = `<strong class="log-a">Game:</strong> ${escapeHtml(text)}`;
    el.logList.prepend(li);
  }
  function logHint(text) {
    const li = document.createElement("li");
    li.innerHTML = `<strong class="log-hint">Hint:</strong> ${escapeHtml(text)}`;
    el.logList.prepend(li);
  }
  function logSystem(text) {
    const li = document.createElement("li");
    li.innerHTML = `<strong class="log-system">System:</strong> ${escapeHtml(text)}`;
    el.logList.prepend(li);
  }

  /** ---------------------------------------
   * Question interpretation (extended)
   * --------------------------------------- */
  function interpretQuestion(q) {
    const t = q.toLowerCase().trim();

    // Direct guess — "is it a/an ___?"
    const guessMatch = t.match(/\bis it\s+(a|an|the)?\s*([a-z][a-z\s-]+)\??$/i);
    if (guessMatch) {
      const guessName = guessMatch[2].trim();
      return { type: "direct-guess", value: guessName };
    }

    // Category checks
    const categories = ["mammal","bird","fish","insect","amphibian","reptile","arachnid","crustacean","mollusk","cnidarian","echinoderm","dinosaur"];
    for (const c of categories) {
      if (t.includes(c)) {
        const is = hidden.category === c;
        return yesNo(is, cap(`It ${is ? "is" : "is not"} a ${c}.`));
      }
    }

    // Flight
    if (/\b(fly|flies|flying|wings?)\b/.test(t)) {
      return yesNo(!!hidden.canFly, cap(`It ${hidden.canFly ? "can" : "cannot"} fly.`));
    }

    // Swim / water / aquatic
    if (/\b(swim|swims|swimming|water|aquatic|ocean|sea)\b/.test(t)) {
      return yesNo(!!hidden.canSwim || !!hidden.aquatic, cap(`It ${hidden.canSwim || hidden.aquatic ? "can" : "cannot"} swim / lives in water.`));
    }

    // Domestication indicators
    if (/\b(domestic|domesticated|pet|farm)\b/.test(t)) {
      const domestic = /\b(dog|cat|cow|horse|sheep|goat|chicken|pig|rabbit)\b/.test(hidden.name.toLowerCase());
      return yesNo(domestic, cap(`It ${domestic ? "is" : "is not"} commonly domesticated.`));
    }

    // Fur / feathers / scales
    if (/\b(fur|hair)\b/.test(t)) {
      return yesNo(!!hidden.hasFur, cap(`It ${hidden.hasFur ? "has" : "does not have"} fur.`));
    }
    if (/\b(feather|feathers)\b/.test(t)) {
      return yesNo(!!hidden.hasFeathers, cap(`It ${hidden.hasFeathers ? "has" : "does not have"} feathers.`));
    }
    if (/\b(scale|scales|scaly)\b/.test(t)) {
      return yesNo(!!hidden.hasScales, cap(`It ${hidden.hasScales ? "has" : "does not have"} scales.`));
    }

    // Eggs
    if (/\b(egg|eggs|lays?\s+eggs?)\b/.test(t)) {
      return yesNo(!!hidden.laysEggs, cap(`It ${hidden.laysEggs ? "lays" : "does not lay"} eggs.`));
    }

    // Legs: "Does it have 4 legs?"
    const legMatch = t.match(/(\d+)\s*(leg|legs)/);
    if (legMatch) {
      const n = parseInt(legMatch[1], 10);
      return yesNo(hidden.numberOfLegs === n, cap(`It ${hidden.numberOfLegs === n ? "has" : "does not have"} ${n} legs.`));
    }
    if (/\bhow many legs\b/.test(t)) {
      return { ok: true, answer: cap(`It has ${hidden.numberOfLegs} legs.`) };
    }

    // Size (rough)
    if (/\b(small|medium|large|big)\b/.test(t)) {
      const wanted = t.match(/\b(small|medium|large|big)\b/)[1];
      const normalized = wanted === "big" ? "large" : wanted;
      return yesNo(hidden.size === normalized, cap(`It ${hidden.size === normalized ? "is" : "is not"} ${normalized}.`));
    }

    // Habitat (limited)
    const habitats = ["farm","forest","ocean","river","desert","wetlands","savanna","antarctica","mountains","garden","arctic","home","grassland","meadow","soil","cave","rainforest","varied"];
    for (const h of habitats) {
      if (t.includes(h)) {
        return yesNo(hidden.habitat === h, cap(`Its primary habitat ${hidden.habitat === h ? "includes" : "does not include"} ${h}.`));
      }
    }

    // Nocturnal
    if (/\b(nocturnal|active at night)\b/.test(t)) {
      const night = /bat|owl|aye-aye|bushbaby|bush baby|genet|fossa/.test(hidden.name.toLowerCase());
      return yesNo(night, cap(`It ${night ? "is" : "is not"} primarily nocturnal.`));
    }

    // Unknown / unsupported
    return { ok: false, answer: "I can answer about category, flight, swimming, legs, eggs, fur/feathers/scales, domestication, size, habitat. Try: “Is it a mammal?”" };
  }

  function yesNo(cond, phrase) {
    return { ok: true, answer: `${cond ? "Yes." : "No."} ${phrase}` };
  }

  /** ---------------------------------------
   * Hints
   * --------------------------------------- */
  function nextHint() {
    const hints = [];
    hints.push(`Category: ${cap(hidden.category)}`);
    if (hidden.canFly) hints.push("It can fly.");
    if (hidden.canSwim || hidden.aquatic) hints.push("It can swim / lives in water.");
    if (hidden.hasFur) hints.push("It has fur.");
    if (hidden.hasFeathers) hints.push("It has feathers.");
    if (hidden.hasScales) hints.push("It has scales.");
    if (hidden.laysEggs) hints.push("It lays eggs.");
    if (hidden.numberOfLegs !== undefined) hints.push(`Legs: ${hidden.numberOfLegs}`);

    // Avoid duplicates already shown
    const already = Array.from(el.logList.querySelectorAll(".log-hint")).map(li => li.textContent.toLowerCase());
    const fresh = hints.filter(h => !already.some(a => a.includes(h.toLowerCase())));
    if (fresh.length === 0) return "No more helpful hints available.";
    return fresh[Math.floor(Math.random() * fresh.length)];
  }

  /** ---------------------------------------
   * UI handlers
   * --------------------------------------- */
  el.askBtn.addEventListener("click", () => {
    if (gameOver) return;
    const q = el.questionInput.value.trim();
    if (!q) return;
    el.questionInput.value = "";
    logQ(q);
    const res = interpretQuestion(q);
    if (res.type === "direct-guess") {
      handleGuess(res.value);
      return;
    }
    logA(res.answer);
  });

  el.questionInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") el.askBtn.click();
  });

  el.guessBtn.addEventListener("click", () => {
    if (gameOver) return;
    const guess = el.guessInput.value.trim();
    if (!guess) return;
    el.guessInput.value = "";
    handleGuess(guess);
  });

  el.guessInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") el.guessBtn.click();
  });

  function handleGuess(guessRaw) {
    const guess = guessRaw.toLowerCase().replace(/[^a-z\s-]/g, "").trim();
    const list = allAnimals();
    const found = list.find(a => a.name.toLowerCase() === guess || a.id === slug(guess));
    if (found && found.name === hidden.name) {
      win(found);
    } else {
      logA(`No. It is not ${guessRaw.trim() || "that"}. Keep trying!`);
    }
  }

  el.hintBtn.addEventListener("click", () => {
    if (gameOver) return;
    if (hintsUsed >= MAX_HINTS) {
      el.hintBtn.disabled = true;
      logHint("You have used all your hints.");
      return;
    }
    const hint = nextHint();
    hintsUsed++;
    el.hintCount.textContent = `Hints used: ${hintsUsed}/${MAX_HINTS}`;
    logHint(hint);
    if (hintsUsed >= MAX_HINTS) el.hintBtn.disabled = true;
  });

  el.giveUpBtn.addEventListener("click", () => {
    if (gameOver) return;
    lose();
  });

  el.newGameBtn.addEventListener("click", () => {
    newGame();
  });

  function win(animal) {
    gameOver = true;
    el.emojiPanel.textContent = hidden.emoji || "🎉";
    logA(`🎉 Correct! It was <strong>${hidden.name}</strong>.`);
    SCORE.wins = SCORE.wins + 1;
    updateScore();
  }

  function lose() {
    gameOver = true;
    el.emojiPanel.textContent = hidden.emoji || "🤷";
    logA(`You gave up. The animal was <strong>${hidden.name}</strong>.`);
    SCORE.losses = SCORE.losses + 1;
    updateScore();
  }

  function updateScore() {
    el.score.textContent = `Wins: ${SCORE.wins} • Losses: ${SCORE.losses}`;
  }

  // Init: load list, then start
  updateScore();
  loadAnimalsTxt().then(() => {
    // First game will use BASE; subsequent games include EXTRA
    newGame();
  }).catch(() => {
    newGame();
  });
