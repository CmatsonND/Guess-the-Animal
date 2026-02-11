// Animal Guessing Game
(() => {
  /** ------------------------------
   * Dataset: animals with attributes
   * ------------------------------ */
  const ANIMALS = [
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
    A("Koala","🐨",{category:"mammal",canFly:false,canSwim:false,aquatic:false,isDomestic:false,hasFur:true,hasFeathers:false,hasScales:false,laysEggs:false,numberOfLegs:4,diet:"herbivore",habitat:"forest",size:"small"}),
    A("Panda","🐼",{category:"mammal",canFly:false,canSwim:false,aquatic:false,isDomestic:false,hasFur:true,hasFeathers:false,hasScales:false,laysEggs:false,numberOfLegs:4,diet:"herbivore",habitat:"forest",size:"medium"}),
    A("Polar Bear","🐻",{category:"mammal",canFly:false,canSwim:true,aquatic:false,isDomestic:false,hasFur:true,hasFeathers:false,hasScales:false,laysEggs:false,numberOfLegs:4,diet:"carnivore",habitat:"arctic",size:"large"}),

    // Birds
    A("Eagle","🦅",{category:"bird",canFly:true,canSwim:false,aquatic:false,isDomestic:false,hasFur:false,hasFeathers:true,hasScales:false,laysEggs:true,numberOfLegs:2,diet:"carnivore",habitat:"mountains",size:"medium"}),
    A("Parrot","🦜",{category:"bird",canFly:true,canSwim:false,aquatic:false,isDomestic:false,hasFur:false,hasFeathers:true,hasScales:false,laysEggs:true,numberOfLegs:2,diet:"herbivore",habitat:"rainforest",size:"small"}),
    A("Penguin","🐧",{category:"bird",canFly:false,canSwim:true,aquatic:true,isDomestic:false,hasFur:false,hasFeathers:true,hasScales:false,laysEggs:true,numberOfLegs:2,diet:"carnivore",habitat:"antarctica",size:"medium"}),
    A("Ostrich","🐦",{category:"bird",canFly:false,canSwim:false,aquatic:false,isDomestic:false,hasFur:false,hasFeathers:true,hasScales:false,laysEggs:true,numberOfLegs:2,diet:"omnivore",habitat:"savanna",size:"large"}),

    // Fish
    A("Salmon","🐟",{category:"fish",canFly:false,canSwim:true,aquatic:true,isDomestic:false,hasFur:false,hasFeathers:false,hasScales:true,laysEggs:true,numberOfLegs:0,diet:"omnivore",habitat:"river",size:"small"}),
    A("Shark","🦈",{category:"fish",canFly:false,canSwim:true,aquatic:true,isDomestic:false,hasFur:false,hasFeathers:false,hasScales:false,laysEggs:true,numberOfLegs:0,diet:"carnivore",habitat:"ocean",size:"large"}),
    A("Clownfish","🐠",{category:"fish",canFly:false,canSwim:true,aquatic:true,isDomestic:false,hasFur:false,hasFeathers:false,hasScales:true,laysEggs:true,numberOfLegs:0,diet:"omnivore",habitat:"ocean",size:"small"}),

    // Amphibians
    A("Frog","🐸",{category:"amphibian",canFly:false,canSwim:true,aquatic:true,isDomestic:false,hasFur:false,hasFeathers:false,hasScales:false,laysEggs:true,numberOfLegs:4,diet:"carnivore",habitat:"wetlands",size:"small"}),
    A("Salamander",null,{category:"amphibian",canFly:false,canSwim:true,aquatic:false,isDomestic:false,hasFur:false,hasFeathers:false,hasScales:false,laysEggs:true,numberOfLegs:4,diet:"carnivore",habitat:"forest",size:"small"}),

    // Reptiles
    A("Crocodile","🐊",{category:"reptile",canFly:false,canSwim:true,aquatic:true,isDomestic:false,hasFur:false,hasFeathers:false,hasScales:true,laysEggs:true,numberOfLegs:4,diet:"carnivore",habitat:"river",size:"large"}),
    A("Snake","🐍",{category:"reptile",canFly:false,canSwim:false,aquatic:false,isDomestic:false,hasFur:false,hasFeathers:false,hasScales:true,laysEggs:true,numberOfLegs:0,diet:"carnivore",habitat:"varied",size:"small"}),
    A("Lizard","🦎",{category:"reptile",canFly:false,canSwim:false,aquatic:false,isDomestic:false,hasFur:false,hasFeathers:false,hasScales:true,laysEggs:true,numberOfLegs:4,diet:"omnivore",habitat:"desert",size:"small"}),
    A("Turtle","🐢",{category:"reptile",canFly:false,canSwim:true,aquatic:true,isDomestic:false,hasFur:false,hasFeathers:false,hasScales:true,laysEggs:true,numberOfLegs:4,diet:"omnivore",habitat:"river",size:"small"}),

    // Insects
    A("Bee","🐝",{category:"insect",canFly:true,canSwim:false,aquatic:false,isDomestic:false,hasFur:false,hasFeathers:false,hasScales:false,laysEggs:true,numberOfLegs:6,diet:"herbivore",habitat:"meadow",size:"small"}),
    A("Ant","🐜",{category:"insect",canFly:false,canSwim:false,aquatic:false,isDomestic:false,hasFur:false,hasFeathers:false,hasScales:false,laysEggs:true,numberOfLegs:6,diet:"omnivore",habitat:"soil",size:"small"}),
    A("Butterfly","🦋",{category:"insect",canFly:true,canSwim:false,aquatic:false,isDomestic:false,hasFur:false,hasFeathers:false,hasScales:false,laysEggs:true,numberOfLegs:6,diet:"herbivore",habitat:"garden",size:"small"}),
    A("Ladybug","🐞",{category:"insect",canFly:true,canSwim:false,aquatic:false,isDomestic:false,hasFur:false,hasFeathers:false,hasScales:false,laysEggs:true,numberOfLegs:6,diet:"omnivore",habitat:"garden",size:"small"}),

    // Other
    A("Octopus","🐙",{category:"mollusk",canFly:false,canSwim:true,aquatic:true,isDomestic:false,hasFur:false,hasFeathers:false,hasScales:false,laysEggs:true,numberOfLegs:8,diet:"carnivore",habitat:"ocean",size:"medium"}),
    A("Squid","🦑",{category:"mollusk",canFly:false,canSwim:true,aquatic:true,isDomestic:false,hasFur:false,hasFeathers:false,hasScales:false,laysEggs:true,numberOfLegs:10,diet:"carnivore",habitat:"ocean",size:"medium"}),
    A("Camel","🐪",{category:"mammal",canFly:false,canSwim:false,aquatic:false,isDomestic:true,hasFur:true,hasFeathers:false,hasScales:false,laysEggs:false,numberOfLegs:4,diet:"herbivore",habitat:"desert",size:"large"}),
  ];

  function A(name, emoji, attrs) {
    return { id: slug(name), name, emoji: emoji || "❓", ...attrs };
  }
  function slug(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, "-"); }

  /** ------------------------------
   * State
   * ------------------------------ */
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

  /** ------------------------------
   * Game setup
   * ------------------------------ */
  function newGame() {
    hidden = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
    hintsUsed = 0;
    gameOver = false;
    el.hintBtn.disabled = false;
    el.hintCount.textContent = `Hints used: ${hintsUsed}/${MAX_HINTS}`;
    el.emojiPanel.textContent = "❓";
    el.logList.innerHTML = "";
    logSystem("A new animal has been chosen. Start asking yes/no questions!");
  }

  /** ------------------------------
   * Logging helpers
   * ------------------------------ */
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
  function escapeHtml(s) { return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;', "'":'&#039;'}[c])); }

  /** ------------------------------
   * Question interpretation
   * ------------------------------ */
  function interpretQuestion(q) {
    const t = q.toLowerCase().trim();

    // Direct guess through phrasing "is it a/an ... ?"
    const guessMatch = t.match(/\bis it\s+(a|an|the)?\s*([a-z][a-z\s-]+)\??$/i);
    if (guessMatch) {
      const guessName = guessMatch[2].trim();
      return { type: "direct-guess", value: guessName };
    }

    // Category checks
    const categories = ["mammal","bird","fish","insect","amphibian","reptile","mollusk"];
    for (const c of categories) {
      if (t.includes(c)) {
        return yesNo(hidden.category === c, cap(`It ${hidden.category === c ? "is" : "is not"} a ${c}.`));
      }
    }

    // Flight
    if (/\b(fly|flies|flying|wings?)\b/.test(t)) {
      return yesNo(hidden.canFly, cap(`It ${hidden.canFly ? "can" : "cannot"} fly.`));
    }

    // Swim / water / aquatic
    if (/\b(swim|swims|swimming|water|aquatic|ocean|sea)\b/.test(t)) {
      // prefer canSwim for yes/no
      return yesNo(!!hidden.canSwim || !!hidden.aquatic, cap(`It ${hidden.canSwim || hidden.aquatic ? "can" : "cannot"} swim / lives in water.`));
    }

    // Domesticated / pet / farm
    if (/\b(domestic|domesticated|pet|farm)\b/.test(t)) {
      return yesNo(!!hidden.isDomestic, cap(`It ${hidden.isDomestic ? "is" : "is not"} domesticated.`));
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

    // Diet
    if (/\b(carnivore|herbivore|omnivore|eat meat|eat plants)\b/.test(t)) {
      if (/\b(carnivore|eat meat)\b/.test(t)) return yesNo(hidden.diet.includes("carnivore"), cap(`It ${hidden.diet.includes("carnivore") ? "is" : "is not"} a carnivore.`));
      if (/\b(herbivore|eat plants)\b/.test(t)) return yesNo(hidden.diet.includes("herbivore"), cap(`It ${hidden.diet.includes("herbivore") ? "is" : "is not"} a herbivore.`));
      if (/\b(omnivore)\b/.test(t)) return yesNo(hidden.diet.includes("omnivore"), cap(`It ${hidden.diet.includes("omnivore") ? "is" : "is not"} an omnivore.`));
    }

    // Size
    if (/\b(small|medium|large|big)\b/.test(t)) {
      const wanted = t.match(/\b(small|medium|large|big)\b/)[1];
      const normalized = wanted === "big" ? "large" : wanted;
      return yesNo(hidden.size === normalized, cap(`It ${hidden.size === normalized ? "is" : "is not"} ${normalized}.`));
    }

    // Habitat
    const habitats = ["farm","forest","ocean","river","desert","wetlands","savanna","antarctica","mountains","garden","arctic","home","grassland","meadow","soil","cave","rainforest","varied"];
    for (const h of habitats) {
      if (t.includes(h)) {
        return yesNo(hidden.habitat === h, cap(`Its primary habitat ${hidden.habitat === h ? "includes" : "does not include"} ${h}.`));
      }
    }

    // Nocturnal
    if (/\b(nocturnal|active at night)\b/.test(t)) {
      return yesNo(!!hidden.nocturnal, cap(`It ${hidden.nocturnal ? "is" : "is not"} nocturnal.`));
    }

    // Unknown / unsupported
    return { ok: false, answer: "I can answer about category, flight, swimming, legs, diet, habitat, size, fur/feathers/scales, domestication, eggs. Try: “Is it a mammal?”" };
  }

  function yesNo(cond, phrase) {
    return { ok: true, answer: `${cond ? "Yes." : "No."} ${phrase}` };
  }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  /** ------------------------------
   * Hints
   * ------------------------------ */
  function nextHint() {
    const candidates = [];

    // Build hint candidates from attributes
    candidates.push(`Category: ${cap(hidden.category)}`);
    if (hidden.canFly) candidates.push("It can fly.");
    if (hidden.canSwim || hidden.aquatic) candidates.push("It can swim / lives in water.");
    if (hidden.isDomestic) candidates.push("It is domesticated.");
    if (hidden.hasFur) candidates.push("It has fur.");
    if (hidden.hasFeathers) candidates.push("It has feathers.");
    if (hidden.hasScales) candidates.push("It has scales.");
    if (hidden.laysEggs) candidates.push("It lays eggs.");
    candidates.push(`Legs: ${hidden.numberOfLegs}`);
    candidates.push(`Diet: ${cap(hidden.diet)}`);
    candidates.push(`Size: ${cap(hidden.size)}`);
    candidates.push(`Habitat: ${cap(hidden.habitat)}`);
    if (hidden.nocturnal) candidates.push("It is nocturnal.");

    // Avoid duplicating hints already shown in the log
    const already = Array.from(el.logList.querySelectorAll(".log-hint"))
      .map(li => li.textContent.toLowerCase());
    const fresh = candidates.filter(c => !already.some(a => a.includes(c.toLowerCase())));

    if (fresh.length === 0) return "No more helpful hints available.";
    const pick = fresh[Math.floor(Math.random() * fresh.length)];
    return pick;
  }

  /** ------------------------------
   * UI handlers
   * ------------------------------ */
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
    const found = ANIMALS.find(a => a.name.toLowerCase() === guess || a.id === slug(guess));
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

  // Init
  updateScore();
  newGame();
