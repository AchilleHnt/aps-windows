/* ==========================================================
   Back office APS Windows
   Lit data/apps.js, permet d'ajouter / modifier / supprimer /
   réordonner les logiciels, puis réécrit data/apps.js.
   Enregistrement direct avec l'API File System Access (Chrome, Edge),
   sinon téléchargement du fichier à remplacer à la main.
   ========================================================== */

const $ = (sel, root = document) => root.querySelector(sel);
const ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
const esc = s => String(s).replace(/[&<>"']/g, c => ESCAPES[c]);

const HERO_MAX = 6;
const FILE_HEADER = `/* Données du catalogue APS Windows.
   Fichier modifié par le back office (admin/index.html) : évitez de le modifier à la main. */
`;

// Copie de travail : rien n'est écrit sur le disque avant « Enregistrer le fichier »
const data = structuredClone(window.APS_DATA);
let selected = null;   // id du logiciel ouvert, ou "" pour un nouveau
let draft = null;      // contenu du formulaire en cours
let pristine = "";     // état du formulaire à l'ouverture, pour détecter les changements
let dirty = false;     // modifications pas encore écrites dans le fichier
let fileHandle = null;

const form = $(".app-form");
const list = $(".app-list");
const search = $(".search input");
const saveState = $(".save-state");

/* ---------- Utilitaires ---------- */

function slugify(name) {
    return name.normalize("NFD").replace(/[̀-ͯ]/g, "")
        .toLowerCase().replace(/\+/g, "p").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40);
}

function uniqueId(base, except) {
    let id = base || "logiciel";
    for (let n = 2; data.apps.some(a => a.id === id && a.id !== except); n++) id = `${base}-${n}`;
    return id;
}

// Première lettre + une lettre suivante, en évitant les tuiles déjà prises
function suggestAbbr(name, except) {
    const chars = name.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^A-Za-z0-9]/g, "");
    if (!chars) return "";
    const taken = new Set(data.apps.filter(a => a.id !== except).map(a => a.abbr.toLowerCase()));
    const first = chars[0].toUpperCase();
    for (const c of chars.slice(1)) {
        const abbr = first + c.toLowerCase();
        if (!taken.has(abbr.toLowerCase())) return abbr;
    }
    return (first + (chars[1] || "x").toLowerCase());
}

function emptyApp() {
    return { id: "", abbr: "", name: "", cat: Object.keys(data.categories)[0], oss: true,
        role: "", desc: "", features: [["", ""]], licence: "", url: "" };
}

function hostname(url) {
    try { return new URL(url).hostname; } catch { return ""; }
}

/* ---------- État d'enregistrement ---------- */

function setDirty(value) {
    dirty = value;
    saveState.classList.toggle("dirty", dirty);
    saveState.classList.remove("saved");
    saveState.textContent = dirty ? "Modifications non enregistrées" : "";
}

function setSaved(message) {
    dirty = false;
    saveState.classList.remove("dirty");
    saveState.classList.add("saved");
    saveState.textContent = message;
}

addEventListener("beforeunload", e => {
    if (dirty || formChanged()) e.preventDefault();
});

/* ---------- Liste ---------- */

const ARROW = d => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${d}" /></svg>`;

function renderList() {
    const q = search.value.trim().toLowerCase();
    const shown = data.apps.filter(a => !q || a.name.toLowerCase().includes(q)
        || data.categories[a.cat].toLowerCase().includes(q));
    $(".list-count").textContent = data.apps.length;

    if (!shown.length) {
        list.innerHTML = `<li class="list-empty">Aucun logiciel ne correspond à « ${esc(search.value)} ».</li>`;
        return;
    }

    list.innerHTML = shown.map(app => {
        const i = data.apps.indexOf(app);
        const tags = [esc(data.categories[app.cat]), app.oss && "Open source", data.hero.includes(app.id) && "<b>Accueil</b>"]
            .filter(Boolean).join(", ");
        return `
        <li class="app-row" data-cat="${esc(app.cat)}" data-id="${esc(app.id)}" aria-current="${app.id === selected}">
            <button type="button" class="app-pick">
                <span class="tile" aria-hidden="true">${esc(app.abbr)}</span>
                <span class="app-pick-text">
                    <span class="app-pick-name">${esc(app.name)}</span>
                    <span class="app-pick-meta">${tags}</span>
                </span>
            </button>
            <span class="move">
                <button type="button" data-move="-1" aria-label="Monter ${esc(app.name)}" ${i === 0 || q ? "disabled" : ""}>${ARROW("M6 15l6-6 6 6")}</button>
                <button type="button" data-move="1" aria-label="Descendre ${esc(app.name)}" ${i === data.apps.length - 1 || q ? "disabled" : ""}>${ARROW("M6 9l6 6 6-6")}</button>
            </span>
        </li>`;
    }).join("");
}

list.addEventListener("click", e => {
    const row = e.target.closest(".app-row");
    if (!row) return;
    const move = e.target.closest("[data-move]");
    if (move) {
        moveApp(row.dataset.id, +move.dataset.move);
        return;
    }
    if (e.target.closest(".app-pick")) openApp(row.dataset.id);
});

function moveApp(id, delta) {
    const i = data.apps.findIndex(a => a.id === id);
    const j = i + delta;
    if (j < 0 || j >= data.apps.length) return;
    [data.apps[i], data.apps[j]] = [data.apps[j], data.apps[i]];
    setDirty(true);
    renderList();
    $(`.app-row[data-id="${CSS.escape(id)}"] [data-move="${delta}"]`)?.focus();
}

search.addEventListener("input", renderList);

/* ---------- Formulaire ---------- */

$("#f-cat").innerHTML = Object.entries(data.categories)
    .map(([key, label]) => `<option value="${esc(key)}">${esc(label)}</option>`).join("");

function confirmLeave() {
    return !formChanged() || confirm("La fiche en cours a des modifications non validées. Les abandonner ?");
}

function openApp(id) {
    if (id === selected) return;
    if (!confirmLeave()) return;
    selected = id;
    const app = id ? data.apps.find(a => a.id === id) : emptyApp();
    draft = structuredClone(app);
    draft.hero = id ? data.hero.includes(id) : false;
    if (!draft.features.length) draft.features.push(["", ""]);
    fillForm();
    renderList();
    $('.app-row[aria-current="true"]')?.scrollIntoView({ block: "nearest" });
    $(".editor-head h2").textContent = id ? app.name : "Nouveau logiciel";
    $(".editor-sub").textContent = id
        ? "Modifiez la fiche, validez-la, puis enregistrez le fichier."
        : "Remplissez la fiche. Les lettres de la tuile et l'identifiant se remplissent à partir du nom.";
    $(".delete-btn").hidden = !id;
    $(".apply-btn").textContent = id ? "Valider la fiche" : "Ajouter au catalogue";
    form.hidden = false;
    $(".preview").hidden = false;
    $("#f-name").focus();
}

$(".new-btn").addEventListener("click", () => {
    selected = null; // force l'ouverture même si un nouveau était déjà en cours
    openApp("");
});

function fillForm() {
    const f = form.elements;
    f.name.value = draft.name;
    f.abbr.value = draft.abbr;
    f.id.value = draft.id;
    f.cat.value = draft.cat;
    f.oss.checked = !!draft.oss;
    f.hero.checked = draft.hero;
    f.role.value = draft.role;
    f.desc.value = draft.desc;
    f.licence.value = draft.licence;
    f.url.value = draft.url;
    // Pour un nouveau logiciel, l'identifiant et les lettres suivent le nom tant qu'on n'y touche pas
    f.id.dataset.auto = f.abbr.dataset.auto = selected ? "" : "1";
    renderFeatures();
    clearErrors();
    pristine = JSON.stringify(readForm());
    updatePreview();
}

const REMOVE_ICON = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>`;

function renderFeatures() {
    $(".feature-list").innerHTML = draft.features.map(([title, text], i) => `
        <li class="feature-row">
            <input type="text" aria-label="Fonction ${i + 1} : titre" placeholder="Titre" value="${esc(title)}" data-part="0">
            <input type="text" aria-label="Fonction ${i + 1} : explication" placeholder="Explication courte" value="${esc(text)}" data-part="1">
            <button type="button" aria-label="Retirer la fonction ${i + 1}" data-remove="${i}">${REMOVE_ICON}</button>
        </li>`).join("");
}

function readForm() {
    const f = form.elements;
    const features = [...form.querySelectorAll(".feature-row")].map(row =>
        [...row.querySelectorAll("input")].map(input => input.value.trim()));
    return {
        id: f.id.value.trim(),
        abbr: f.abbr.value.trim(),
        name: f.name.value.trim(),
        cat: f.cat.value,
        oss: f.oss.checked,
        role: f.role.value.trim(),
        desc: f.desc.value.trim(),
        features,
        licence: f.licence.value.trim(),
        url: f.url.value.trim(),
        hero: f.hero.checked,
    };
}

function formChanged() {
    return !form.hidden && JSON.stringify(readForm()) !== pristine;
}

form.addEventListener("input", e => {
    const f = form.elements;
    if (e.target === f.name) {
        if (f.id.dataset.auto) f.id.value = uniqueId(slugify(f.name.value), selected);
        if (f.abbr.dataset.auto) f.abbr.value = suggestAbbr(f.name.value, selected);
    }
    if (e.target === f.id) f.id.dataset.auto = "";
    if (e.target === f.abbr) f.abbr.dataset.auto = "";
    if (e.target.getAttribute("aria-invalid") === "true") e.target.removeAttribute("aria-invalid");
    updatePreview();
});

form.addEventListener("change", updatePreview);

$(".suggest-abbr").addEventListener("click", () => {
    const f = form.elements;
    f.abbr.value = suggestAbbr(f.name.value, selected);
    updatePreview();
});

$(".add-feature").addEventListener("click", () => {
    draft.features = readForm().features;
    draft.features.push(["", ""]);
    renderFeatures();
    $(".feature-list li:last-child input").focus();
    updatePreview();
});

$(".feature-list").addEventListener("click", e => {
    const btn = e.target.closest("[data-remove]");
    if (!btn) return;
    draft.features = readForm().features;
    draft.features.splice(+btn.dataset.remove, 1);
    if (!draft.features.length) draft.features.push(["", ""]);
    renderFeatures();
    updatePreview();
});

$(".reset-btn").addEventListener("click", () => {
    const keep = selected;
    selected = null;
    pristine = "";
    form.hidden = true; // évite la question « abandonner ? » : c'est justement la demande
    openApp(keep);
});

/* ---------- Validation ---------- */

function clearErrors() {
    form.querySelectorAll(".error").forEach(p => { p.textContent = ""; });
    form.querySelectorAll("[aria-invalid]").forEach(el => el.removeAttribute("aria-invalid"));
}

function validate(app) {
    const errors = {};
    const others = data.apps.filter(a => a.id !== selected);
    if (!app.name) errors.name = "Indiquez le nom du logiciel.";
    else if (others.some(a => a.name.toLowerCase() === app.name.toLowerCase())) errors.name = "Ce logiciel est déjà dans le catalogue.";

    if (!/^[A-Za-z0-9]{2}$/.test(app.abbr)) errors.abbr = "Deux lettres ou chiffres, par exemple « 7z » ou « Vl ».";
    else if (others.some(a => a.abbr.toLowerCase() === app.abbr.toLowerCase())) errors.abbr = `« ${app.abbr} » est déjà utilisé par ${others.find(a => a.abbr.toLowerCase() === app.abbr.toLowerCase()).name}.`;

    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(app.id)) errors.id = "Uniquement des minuscules, des chiffres et des tirets, par exemple « notepad-pp ».";
    else if (others.some(a => a.id === app.id)) errors.id = "Cet identifiant est déjà utilisé.";

    if (!app.role) errors.role = "Décrivez le rôle en une phrase courte.";
    if (!app.desc) errors.desc = "Ajoutez une description de deux phrases.";

    const filled = app.features.filter(([t, x]) => t || x);
    if (!filled.length) errors.features = "Ajoutez au moins une fonction clé.";
    else if (filled.some(([t, x]) => !t || !x)) errors.features = "Chaque fonction a besoin d'un titre et d'une explication.";

    if (!app.licence) errors.licence = "Indiquez la licence et le prix, par exemple « Gratuit et open source ».";

    let url = null;
    try { url = new URL(app.url); } catch { /* adresse invalide */ }
    if (!url) errors.url = "Collez l'adresse complète, par exemple https://www.7-zip.org/";
    else if (url.protocol !== "https:") errors.url = "L'adresse doit commencer par https:// pour un téléchargement sûr.";

    const heroCount = data.hero.filter(id => id !== selected).length;
    if (app.hero && heroCount >= HERO_MAX) errors.hero = `L'accueil montre déjà ${HERO_MAX} logiciels. Retirez-en un d'abord.`;
    return errors;
}

function showErrors(errors) {
    clearErrors();
    const fieldFor = { features: ".feature-row input", hero: "[name=hero]" };
    let first = null;
    for (const [key, message] of Object.entries(errors)) {
        $(`.error[data-for="${key}"]`, form).textContent = message;
        const el = $(fieldFor[key] || `[name="${key}"]`, form);
        if (el) {
            el.setAttribute("aria-invalid", "true");
            first ||= el;
        }
    }
    first?.focus();
}

// Applique la fiche au catalogue en mémoire. Renvoie false si elle n'est pas valide.
function applyForm() {
    const app = readForm();
    const errors = validate(app);
    if (Object.keys(errors).length) {
        showErrors(errors);
        return false;
    }
    clearErrors();
    const { hero, ...clean } = app;
    clean.features = app.features.filter(([t, x]) => t && x);

    // Garde la position dans l'accueil si le logiciel y était déjà
    const heroIndex = selected ? data.hero.indexOf(selected) : -1;
    data.hero = data.hero.filter(id => id !== selected && id !== clean.id);
    if (hero) {
        if (heroIndex >= 0) data.hero.splice(heroIndex, 0, clean.id);
        else data.hero.push(clean.id);
    }

    if (selected) {
        data.apps[data.apps.findIndex(a => a.id === selected)] = clean;
    } else {
        data.apps.push(clean);
    }

    const wasNew = !selected;
    selected = clean.id;
    draft = { ...structuredClone(clean), hero };
    pristine = JSON.stringify(readForm());
    $(".editor-head h2").textContent = clean.name;
    $(".delete-btn").hidden = false;
    $(".apply-btn").textContent = "Valider la fiche";
    form.elements.id.dataset.auto = form.elements.abbr.dataset.auto = "";
    setDirty(true);
    saveState.textContent = wasNew ? `${clean.name} ajouté. Enregistrez le fichier pour publier.` : "Fiche validée. Enregistrez le fichier pour publier.";
    renderList();
    return true;
}

form.addEventListener("submit", e => {
    e.preventDefault();
    applyForm();
});

$(".delete-btn").addEventListener("click", () => {
    const app = data.apps.find(a => a.id === selected);
    if (!app || !confirm(`Supprimer ${app.name} du catalogue ?`)) return;
    data.apps = data.apps.filter(a => a.id !== selected);
    data.hero = data.hero.filter(id => id !== selected);
    selected = null;
    form.hidden = true;
    $(".preview").hidden = true;
    $(".editor-head h2").textContent = "Choisissez un logiciel";
    $(".editor-sub").textContent = `${app.name} a été retiré. Enregistrez le fichier pour publier la suppression.`;
    setDirty(true);
    renderList();
});

/* ---------- Aperçu en direct ---------- */

function updatePreview() {
    const app = readForm();
    const name = app.name || "Nom du logiciel";
    const cat = data.categories[app.cat];
    const badge = app.oss ? '<span class="oss-badge">Open source</span>' : "";
    const ph = (value, fallback) => value ? esc(value) : `<span class="placeholder">${fallback}</span>`;

    $(".preview").dataset.cat = app.cat;
    $(".preview-card").innerHTML = `
        <div class="card" data-cat="${esc(app.cat)}">
            <span class="tile" aria-hidden="true">${esc(app.abbr || "?")}</span>
            <span>
                <span class="card-title">${esc(name)}</span>
                <span class="card-role">${ph(app.role, "Rôle en une phrase")}</span>
                <span class="card-meta">${esc(cat)}${badge}</span>
            </span>
        </div>`;

    const features = app.features.filter(([t, x]) => t || x);
    $(".preview-sheet").innerHTML = `
        <div class="drawer-head" data-cat="${esc(app.cat)}">
            <span class="tile tile-lg" aria-hidden="true">${esc(app.abbr || "?")}</span>
            <div>
                <p class="drawer-cat">${esc(cat)}${badge}</p>
                <h3>${esc(name)}</h3>
            </div>
        </div>
        <p class="drawer-desc">${ph(app.desc, "Description")}</p>
        <ul class="drawer-features">${features.length
            ? features.map(([t, x]) => `<li><b>${esc(t)}</b> : ${esc(x)}</li>`).join("")
            : '<li><span class="placeholder">Fonctions clés</span></li>'}</ul>
        <p class="drawer-licence">${ph(app.licence, "Licence et prix")}</p>
        <span class="dl"><span class="dl-label">Télécharger sur le site officiel</span></span>
        <p class="drawer-domain">${hostname(app.url) ? `Ouvre ${esc(hostname(app.url))}` : "Lien officiel à renseigner"}</p>`;

    $(".role-count").textContent = form.elements.role.value.length;
    const host = hostname(app.url);
    $(".url-hint").textContent = host ? `Le bouton ouvrira ${host}.` : "Uniquement le site de l'éditeur, en https.";
}

/* ---------- Enregistrement du fichier ---------- */

function serialize() {
    return `${FILE_HEADER}window.APS_DATA = ${JSON.stringify(data, null, 2)};\n`;
}

// Le dernier fichier choisi est mémorisé pour ne pas le redemander à chaque fois
const store = {
    db: () => new Promise((resolve, reject) => {
        const req = indexedDB.open("aps-admin", 1);
        req.onupgradeneeded = () => req.result.createObjectStore("handles");
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    }),
    async get() {
        try {
            const db = await this.db();
            return await new Promise(r => {
                const q = db.transaction("handles").objectStore("handles").get("apps");
                q.onsuccess = () => r(q.result || null);
                q.onerror = () => r(null);
            });
        } catch { return null; }
    },
    async set(handle) {
        try {
            const db = await this.db();
            db.transaction("handles", "readwrite").objectStore("handles").put(handle, "apps");
        } catch { /* mémorisation facultative */ }
    },
};

async function pickDataFile() {
    const [handle] = await window.showOpenFilePicker({
        id: "aps-data",
        types: [{ description: "Données du catalogue (apps.js)", accept: { "text/javascript": [".js"] } }],
    });
    const text = await (await handle.getFile()).text();
    if (!text.includes("window.APS_DATA")) {
        throw new Error("Ce fichier n'est pas data/apps.js. Choisissez le fichier apps.js du dossier data du site.");
    }
    await store.set(handle);
    return handle;
}

async function saveFile() {
    // Une fiche ouverte et modifiée est validée avant l'écriture
    if (formChanged() && !applyForm()) {
        saveState.classList.add("dirty");
        saveState.textContent = "Corrigez la fiche avant d'enregistrer.";
        return;
    }

    if (!window.showOpenFilePicker) {
        downloadFile();
        return;
    }

    try {
        fileHandle ||= await store.get();
        if (fileHandle && (await fileHandle.requestPermission({ mode: "readwrite" })) !== "granted") fileHandle = null;
        if (!fileHandle) {
            saveState.textContent = "Choisissez le fichier data/apps.js du site…";
            fileHandle = await pickDataFile();
            if ((await fileHandle.requestPermission({ mode: "readwrite" })) !== "granted") {
                throw new Error("L'accès en écriture à apps.js a été refusé.");
            }
        }
        const writable = await fileHandle.createWritable();
        await writable.write(serialize());
        await writable.close();
        const time = new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
        setSaved(`Enregistré dans ${fileHandle.name} à ${time}`);
    } catch (err) {
        if (err.name === "AbortError") {
            saveState.textContent = dirty ? "Modifications non enregistrées" : "";
            return;
        }
        fileHandle = null;
        saveState.classList.add("dirty");
        saveState.textContent = err.message || "L'enregistrement a échoué.";
    }
}

// Navigateurs sans accès direct aux fichiers (Firefox, Safari)
function downloadFile() {
    const blob = new Blob([serialize()], { type: "text/javascript" });
    const a = Object.assign(document.createElement("a"), { href: URL.createObjectURL(blob), download: "apps.js" });
    a.click();
    URL.revokeObjectURL(a.href);
    setSaved("apps.js téléchargé : remplacez data/apps.js du site par ce fichier.");
}

$(".save-btn").addEventListener("click", saveFile);

addEventListener("keydown", e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        saveFile();
    }
});

/* ---------- Démarrage ---------- */

renderList();
if (!window.showOpenFilePicker) {
    $(".save-btn").textContent = "Télécharger apps.js";
}
