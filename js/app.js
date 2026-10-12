/* ==========================================================
   APS Windows : données + motion design
   ========================================================== */

// Les données (catégories, logiciels, accueil) viennent de data/apps.js,
// modifiable depuis le back office admin/index.html
const { categories: CATEGORIES, apps: APPS, hero: HERO_IDS } = window.APS_DATA;

// Échappe le texte inséré via innerHTML (les données sont saisies dans le back office)
const ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
const esc = s => String(s).replace(/[&<>"']/g, c => ESCAPES[c]);

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (sel, root = document) => root.querySelector(sel);

// Lance une View Transition si le navigateur la supporte
function transition(update) {
    if (!document.startViewTransition || reduceMotion) {
        update();
        return { finished: Promise.resolve() };
    }
    const vt = document.startViewTransition(update);
    // Une transition interrompue (onglet en arrière-plan…) n'est pas une erreur : la page est déjà à jour
    vt.ready.catch(() => {});
    vt.finished.catch(() => {});
    return vt;
}

/* ---------- 1. Fenêtre d'installation (accueil) ---------- */
const setupList = $(".setup-list");
const setupStatus = $(".setup-status");
const replayBtn = $(".setup-replay");
// Logiciels montrés dans l'animation d'installation de l'accueil
const heroApps = HERO_IDS.map(id => APPS.find(a => a.id === id)).filter(Boolean);

setupList.innerHTML = heroApps.map(app => `
    <li class="setup-row" data-cat="${app.cat}">
        <span class="tile" aria-hidden="true">${esc(app.abbr)}</span>
        <span class="setup-name">${esc(app.name)}<span class="setup-track"><span></span></span></span>
        <span class="setup-pct">0 %</span>
        <svg class="setup-check" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
    </li>`).join("");

const easeInOut = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
let installRun = 0;

function runInstall(delay) {
    const run = ++installRun;
    const rows = [...setupList.children];
    replayBtn.classList.remove("visible");
    setupStatus.classList.remove("ready");

    // Chaque ligne démarre un peu après la précédente, avec sa propre durée
    const jobs = rows.map((row, i) => ({
        row,
        bar: $(".setup-track span", row),
        pct: $(".setup-pct", row),
        start: i * 380,
        duration: 1100 + ((i * 7919) % 900),
        done: false,
    }));

    jobs.forEach(job => {
        job.row.classList.remove("done");
        job.bar.style.transform = "scaleX(0)";
        job.pct.textContent = "0 %";
    });

    if (reduceMotion) {
        jobs.forEach(job => finishJob(job));
        setReady(jobs.length);
        return;
    }

    const t0 = performance.now() + delay;
    function frame(now) {
        if (run !== installRun) return;
        let current = null;
        jobs.forEach(job => {
            if (job.done) return;
            const t = Math.min(Math.max((now - t0 - job.start) / job.duration, 0), 1);
            if (t > 0 && !current) current = job;
            const v = easeInOut(t);
            job.bar.style.transform = `scaleX(${v})`;
            job.pct.textContent = `${Math.round(v * 100)} %`;
            if (t === 1) finishJob(job);
        });
        if (current) setupStatus.textContent = `Installation de ${$(".setup-name", current.row).firstChild.textContent}…`;
        if (jobs.every(j => j.done)) setReady(jobs.length);
        else requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
}

function finishJob(job) {
    job.done = true;
    job.bar.style.transform = "scaleX(1)";
    job.pct.textContent = "100 %";
    job.row.classList.add("done");
}

function setReady(count) {
    setupStatus.textContent = `${count} logiciels prêts`;
    setupStatus.classList.add("ready");
    replayBtn.classList.add("visible");
}

// Le rejeu démarre tout de suite, sans attendre l'arrivée de la fenêtre
replayBtn.addEventListener("click", () => runInstall(200));

runInstall(1100);

/* ---------- 2. Catalogue : filtres + cartes ---------- */
const grid = $(".grid");
const filters = $(".filters");
const ossToggle = $(".oss-toggle");
let activeCat = "all";
let ossOnly = false;

document.querySelectorAll(".app-count").forEach(el => { el.textContent = APPS.length; });
$(".oss-count").textContent = APPS.filter(a => a.oss).length;

filters.innerHTML = [["all", "Tous"], ...Object.entries(CATEGORIES)].map(([key, label]) => `
    <button type="button" class="chip" data-filter="${key}" ${key !== "all" ? `data-cat="${key}"` : ""} aria-pressed="${key === "all"}">
        ${key !== "all" ? "<i></i>" : ""}${esc(label)} <span class="chip-count"></span>
    </button>`).join("");

// Les compteurs des filtres tiennent compte du mode « open source »
function updateCounts() {
    const pool = APPS.filter(a => !ossOnly || a.oss);
    filters.querySelectorAll(".chip").forEach(chip => {
        const key = chip.dataset.filter;
        $(".chip-count", chip).textContent = pool.filter(a => key === "all" || a.cat === key).length;
    });
}

function renderGrid() {
    const list = APPS.filter(a => (activeCat === "all" || a.cat === activeCat) && (!ossOnly || a.oss));
    grid.innerHTML = list.map((app, i) => `
        <button type="button" class="card" data-cat="${app.cat}" data-id="${app.id}"
            style="--i:${i}; view-transition-name: card-${app.id}">
            <span class="tile" aria-hidden="true">${esc(app.abbr)}</span>
            <span>
                <span class="card-title">${esc(app.name)}</span>
                <span class="card-role">${esc(app.role)}</span>
                <span class="card-meta">${esc(CATEGORIES[app.cat])}${app.oss ? '<span class="oss-badge">Open source</span>' : ""}</span>
            </span>
        </button>`).join("");
}

filters.addEventListener("click", e => {
    const chip = e.target.closest(".chip");
    if (!chip || chip.dataset.filter === activeCat) return;
    activeCat = chip.dataset.filter;
    filters.querySelectorAll(".chip").forEach(c => c.setAttribute("aria-pressed", c === chip));
    // Les cartes glissent vers leur nouvelle place (View Transitions)
    transition(renderGrid);
});

ossToggle.addEventListener("click", () => {
    ossOnly = !ossOnly;
    ossToggle.setAttribute("aria-pressed", ossOnly);
    updateCounts();
    transition(renderGrid);
});

updateCounts();
renderGrid();

// Entrée en cascade du catalogue, une seule fois
const catalog = $(".catalog");
if (!reduceMotion && "IntersectionObserver" in window) {
    catalog.classList.add("armed");
    new IntersectionObserver((entries, obs) => {
        if (entries[0].isIntersecting) {
            catalog.classList.add("in");
            setTimeout(() => catalog.classList.remove("armed", "in"), 1600);
            obs.disconnect();
        }
    }, { threshold: .15 }).observe(grid);
}

/* ---------- 3. Fiche détaillée ---------- */
const drawer = $(".drawer");
const drawerTile = $(".drawer-head .tile", drawer);
let openCard = null;

function fillDrawer(app) {
    drawer.dataset.cat = app.cat;
    drawerTile.textContent = app.abbr;
    $(".drawer-cat", drawer).innerHTML = esc(CATEGORIES[app.cat]) + (app.oss ? '<span class="oss-badge">Open source</span>' : "");
    $("#drawer-title").textContent = app.name;
    $(".drawer-desc", drawer).textContent = app.desc;
    $(".drawer-features", drawer).innerHTML = app.features
        .map(([title, text]) => `<li><b>${esc(title)}</b> : ${esc(text)}</li>`).join("");
    $(".drawer-licence", drawer).textContent = app.licence;
    const dl = $(".dl", drawer);
    dl.href = app.url;
    dl.classList.remove("loading");
    $(".dl-label", dl).textContent = "Télécharger sur le site officiel";
    $(".drawer-domain", drawer).textContent = `Ouvre ${new URL(app.url).hostname}`;
}

/* Animation de la fiche (technique FLIP, Web Animations API) :
   - le panneau glisse depuis la droite ;
   - une copie de la tuile vole de la carte jusqu'à sa place dans la fiche ;
   - le contenu apparaît en cascade.
   Seuls transform et opacity sont animés : tout reste sur le GPU.
   Fermer pendant l'ouverture repart de la position courante, sans saut. */
const panel = $(".drawer-panel", drawer);
const drawerBody = $(".drawer-body", drawer);
const OPEN_MS = 520;
const CLOSE_MS = 360;
const EASE_OUT = "cubic-bezier(.22, 1, .36, 1)";
const EASE_IN = "cubic-bezier(.5, 0, .75, 0)";
const EASE_IN_OUT = "cubic-bezier(.65, 0, .35, 1)";
let running = [];
let flight = null;
let closing = false;

// Fige les animations en cours là où elles en sont, puis les arrête
function stopRunning() {
    running.forEach(a => {
        try { a.commitStyles(); } catch { /* élément déjà retiré */ }
        a.cancel();
    });
    running = [];
    flight?.remove();
    flight = null;
}

function track(animation) {
    running.push(animation);
    return animation.finished;
}

function flyTile(from, to, duration, easing) {
    flight = drawerTile.cloneNode(true);
    flight.classList.add("drawer-flight");
    flight.style.visibility = "visible";
    drawer.append(flight);
    const box = flight.getBoundingClientRect();
    const at = (r) => `translate(${r.left}px, ${r.top}px) scale(${r.width / box.width})`;
    return track(flight.animate([{ transform: at(from) }, { transform: at(to) }], { duration, easing, fill: "both" }));
}

function cardTileOf(card) {
    return card && $(".tile", card);
}

function openDrawer(card) {
    const app = APPS.find(a => a.id === card.dataset.id);
    const cardTile = cardTileOf(card);
    openCard = card;
    closing = false;
    fillDrawer(app);
    drawerBody.scrollTop = 0;
    drawer.showModal();

    if (reduceMotion) {
        drawer.classList.add("is-open");
        return;
    }

    // Mesures : la fiche au repos (arrivée) et la tuile de la carte (départ)
    const to = drawerTile.getBoundingClientRect();
    const from = cardTile.getBoundingClientRect();
    getComputedStyle(drawer, "::backdrop").opacity; // fixe l'état de départ du fond
    drawer.classList.add("is-open");

    drawerTile.style.visibility = "hidden";
    cardTile.style.visibility = "hidden";

    track(panel.animate(
        [{ transform: "translateX(100%)" }, { transform: "none" }],
        { duration: OPEN_MS, easing: EASE_OUT }));

    const landed = flyTile(from, to, OPEN_MS, EASE_OUT);

    const parts = [$(".drawer-head > div", drawer), ...drawer.querySelectorAll(
        ".drawer-desc, .drawer-features li, .drawer-licence, .dl, .drawer-domain")];
    parts.forEach((el, i) => track(el.animate(
        [{ opacity: 0, transform: "translateY(14px)" }, { opacity: 1, transform: "none" }],
        { duration: 420, delay: 140 + i * 35, easing: EASE_OUT, fill: "backwards" })));

    landed.then(() => {
        drawerTile.style.visibility = "";
        flight?.remove();
        flight = null;
        running = [];
    }, () => { /* interrompue par une fermeture */ });
}

function closeDrawer() {
    if (!drawer.open || closing) return;
    closing = true;
    const cardTile = cardTileOf(openCard);

    if (reduceMotion) {
        drawer.close();
        return;
    }

    stopRunning();
    drawer.classList.remove("is-open");

    const from = drawerTile.getBoundingClientRect();
    const to = cardTile?.getBoundingClientRect();
    const cardVisible = to && to.bottom > 0 && to.top < innerHeight;

    const done = [track(panel.animate(
        [{ transform: "translateX(100%)" }],
        { duration: CLOSE_MS, easing: EASE_IN, fill: "forwards" }))];

    // La tuile retourne dans sa carte si celle-ci est à l'écran
    if (cardVisible) {
        drawerTile.style.visibility = "hidden";
        done.push(flyTile(from, to, CLOSE_MS + 60, EASE_IN_OUT));
    }

    Promise.all(done).then(() => drawer.close(), () => { /* interrompue */ });
}

// Remet tout à zéro, quelle que soit la façon dont la fiche s'est fermée
drawer.addEventListener("close", () => {
    stopRunning();
    panel.style.transform = "";
    // Efface les valeurs figées par une fermeture en pleine ouverture
    drawerBody.querySelectorAll("*").forEach(el => { el.style.opacity = ""; el.style.transform = ""; });
    drawerTile.style.visibility = "";
    drawer.classList.remove("is-open");
    const cardTile = cardTileOf(openCard);
    if (cardTile) cardTile.style.visibility = "";
    closing = false;
    openCard?.focus({ preventScroll: true });
});

grid.addEventListener("click", e => {
    const card = e.target.closest(".card");
    if (card && !drawer.open) openDrawer(card);
});

$(".drawer-close").addEventListener("click", closeDrawer);
drawer.addEventListener("cancel", e => { e.preventDefault(); closeDrawer(); });
drawer.addEventListener("click", e => { if (e.target === drawer) closeDrawer(); });

// Le bouton se remplit pendant que le site officiel s'ouvre dans un nouvel onglet
$(".dl", drawer).addEventListener("click", e => {
    const dl = e.currentTarget;
    dl.classList.add("loading");
    $(".dl-label", dl).textContent = "Ouverture du site officiel…";
    setTimeout(() => { $(".dl-label", dl).textContent = "Site ouvert dans un nouvel onglet"; }, 900);
});

/* ---------- 4. Défilement : barre de lecture, rail des étapes ---------- */
const readbar = $(".readbar span");
const readpct = $(".readpct b");
const topbar = $(".topbar");
const stepList = $(".step-list");
const steps = [...stepList.children];
let ticking = false;

function onScroll() {
    const max = document.documentElement.scrollHeight - innerHeight;
    const p = max > 0 ? scrollY / max : 0;
    readbar.style.transform = `scaleX(${p})`;
    readpct.textContent = Math.round(p * 100);
    topbar.classList.toggle("scrolled", scrollY > 8);

    // Le rail se remplit pendant que la section traverse l'écran
    const r = stepList.getBoundingClientRect();
    const rail = Math.min(Math.max((innerHeight * .75 - r.top) / (r.height + innerHeight * .2), 0), 1);
    stepList.style.setProperty("--rail", rail.toFixed(3));
    steps.forEach((li, i) => li.classList.toggle("lit", rail >= i / (steps.length - 1) - .02));
    ticking = false;
}

addEventListener("scroll", () => {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
}, { passive: true });
addEventListener("resize", onScroll);
onScroll();

/* ---------- 5. Inscription ---------- */
const form = $(".signup-form");
const email = $("#email");
const emailError = $("#email-error");

form.addEventListener("submit", e => {
    e.preventDefault();
    let firstInvalid = null;
    form.querySelectorAll("input").forEach(input => {
        const ok = input.checkValidity();
        input.setAttribute("aria-invalid", !ok);
        if (!ok && !firstInvalid) firstInvalid = input;
    });
    emailError.textContent = email.validity.valid ? "" :
        email.value ? "Cette adresse e-mail n'est pas valide. Exemple : nom@exemple.com" : "Indiquez votre adresse e-mail.";
    if (firstInvalid) { firstInvalid.focus(); return; }

    // Pas encore de serveur : l'inscription est seulement simulée côté navigateur
    const done = $(".signup-done", form);
    $("p", done).textContent = `C'est noté, ${$("#prenom").value}. Les nouveautés arriveront à ${email.value}.`;
    done.hidden = false;
    form.classList.add("sent");
});

form.addEventListener("input", e => {
    if (e.target.getAttribute("aria-invalid") === "true" && e.target.checkValidity()) {
        e.target.setAttribute("aria-invalid", "false");
        if (e.target === email) emailError.textContent = "";
    }
});
