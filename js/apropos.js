/* ==========================================================
   Page « Le créateur » : motion design
   ========================================================== */

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (sel, root = document) => root.querySelector(sel);

/* ---------- 1. Fenêtre « Propriétés » : les valeurs s'écrivent ---------- */
const values = [...document.querySelectorAll(".props-list dd")];

if (!reduceMotion) {
    const texts = values.map(dd => dd.textContent);
    values.forEach(dd => { dd.textContent = ""; });

    async function typeAll() {
        await new Promise(r => setTimeout(r, 1200)); // laisse la fenêtre arriver
        for (const [i, dd] of values.entries()) {
            dd.classList.add("typing");
            for (const ch of texts[i]) {
                dd.textContent += ch;
                await new Promise(r => setTimeout(r, 18));
            }
            dd.classList.remove("typing");
            await new Promise(r => setTimeout(r, 90));
        }
    }
    typeAll();
}

/* ---------- 2. La course 227 s / 41 s ---------- */
const race = $(".race");
const bars = [...race.querySelectorAll(".race-bar")];
const max = Math.max(...bars.map(b => +b.dataset.value));
bars.forEach(b => b.style.setProperty("--w", (b.dataset.value / max) * 100));

// Le compteur suit la barre : même durée, même courbe
function count(el, duration, ease) {
    const to = +el.dataset.to;
    const t0 = performance.now();
    (function frame(now) {
        const t = Math.min((now - t0) / duration, 1);
        el.textContent = Math.round(ease(t) * to);
        if (t < 1) requestAnimationFrame(frame);
    })(t0);
}

function runRace() {
    race.classList.add("run");
    const [before, after] = race.querySelectorAll(".race-time b");
    if (reduceMotion) {
        before.textContent = before.dataset.to;
        after.textContent = after.dataset.to;
        return;
    }
    count(before, 2200, t => t);
    count(after, 400, t => 1 - Math.pow(1 - t, 3));
}

if ("IntersectionObserver" in window) {
    new IntersectionObserver((entries, obs) => {
        if (entries[0].isIntersecting) { runRace(); obs.disconnect(); }
    }, { threshold: .5 }).observe(race);
} else {
    runRace();
}

/* ---------- 3. Défilement : barre de lecture, rail du parcours ---------- */
const readbar = $(".readbar span");
const readpct = $(".readpct b");
const topbar = $(".topbar");
const timeline = $(".timeline");
const items = [...timeline.children];
let ticking = false;

if (!reduceMotion) timeline.classList.add("armed");

function onScroll() {
    const maxScroll = document.documentElement.scrollHeight - innerHeight;
    const p = maxScroll > 0 ? scrollY / maxScroll : 0;
    readbar.style.transform = `scaleX(${p})`;
    readpct.textContent = Math.round(p * 100);
    topbar.classList.toggle("scrolled", scrollY > 8);

    // Le rail descend avec le défilement et allume chaque étape au passage
    const r = timeline.getBoundingClientRect();
    const rail = Math.min(Math.max((innerHeight * .6 - r.top) / r.height, 0), 1);
    timeline.style.setProperty("--rail", rail.toFixed(3));
    items.forEach(li => {
        const reached = li.offsetTop <= rail * r.height;
        li.classList.toggle("lit", reached || reduceMotion);
    });
    ticking = false;
}

addEventListener("scroll", () => {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
}, { passive: true });
addEventListener("resize", onScroll);
onScroll();
