const onScroll = () => {
    document.body.classList.toggle("is-scrolled", window.scrollY > 20);
    const nav = document.querySelector(".menu-top");
    if (nav) {
        nav.classList.toggle("scrolled", window.scrollY > 20);
    }
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// --- TEXT SPLITTING ---
const splitToChars = (element, withWords = false) => {
    if (!element || element.dataset.split === "true") return;
    const original = element.innerText.trim();
    element.innerHTML = "";
    element.style.setProperty("--chars", original.length);

    if (withWords) {
        original.split(" ").forEach((wordText, wordIndex, allWords) => {
            const wordSpan = document.createElement("span");
            wordSpan.classList.add("word");

            wordText.split("").forEach((char, charIndex) => {
                const charSpan = document.createElement("span");
                charSpan.classList.add("char");
                charSpan.style.setProperty("--i", charIndex);
                charSpan.innerText = char;
                wordSpan.appendChild(charSpan);
            });

            element.appendChild(wordSpan);

            if (wordIndex < allWords.length - 1) {
                element.appendChild(document.createTextNode(" "));
            }
        });
    } else {
        original.split("").forEach((char, charIndex) => {
            const charSpan = document.createElement("span");
            charSpan.classList.add("char");
            charSpan.style.setProperty("--i", charIndex);
            charSpan.innerText = char;
            element.appendChild(charSpan);
        });
    }

    element.dataset.split = "true";
};

// Hero title
splitToChars(document.querySelector(".hero h1"), true);

// Nav links hacker text effect
const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
document.querySelectorAll(".menu-lista a").forEach((link) => {
    const original = link.innerText.trim();
    link.dataset.text = original;

    link.addEventListener("mouseenter", (event) => {
        let iter = 0;
        const target = event.currentTarget;
        const base = target.dataset.text;
        clearInterval(target._hackInterval);

        target._hackInterval = setInterval(() => {
            target.innerText = base
                .split("")
                .map((char, i) => {
                    if (i < iter) return base[i];
                    return alpha[Math.floor(Math.random() * alpha.length)];
                })
                .join("");

            if (iter >= base.length) {
                clearInterval(target._hackInterval);
                target.innerText = base;
            }
            iter += 1 / 3;
        }, 30);
    });

    link.addEventListener("mouseleave", (event) => {
        const target = event.currentTarget;
        clearInterval(target._hackInterval);
        target.innerText = target.dataset.text;
    });
});

// Expanding options (economia)
document.querySelectorAll(".options").forEach((options) => {
    options.querySelectorAll(".option").forEach((option) => {
        option.addEventListener("click", () => {
            options.querySelectorAll(".option").forEach((el) => el.classList.remove("active"));
            option.classList.add("active");
        });
    });
});

// Drawer (composicion)
document.querySelectorAll(".img-open").forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        const id = link.getAttribute("data-drawer");
        const drawer = document.getElementById(id);
        if (drawer) {
            const name =
                link.closest(".agent-card")?.querySelector(".agent-name")?.textContent?.trim() ||
                link.querySelector("img")?.getAttribute("alt") ||
                "Agente";

            const title = drawer.querySelector("h3");
            if (title) title.textContent = name;

            const descriptions = {
                Omen: "Controlador de humos y reposicionamiento rápido para cortar visión y crear flancos.",
                Astra: "Controladora de control global que coloca utilidades a distancia y moldea zonas.",
                Viper: "Controladora de veneno que aísla líneas con cortinas y niebla persistente.",
                Harbor: "Controlador de agua que bloquea visión con muros y niebla en avance.",
                Clove: "Controladora híbrida con humos agresivos y utilidad de reingreso.",
                Brimstone: "Controlador de humos con apoyo de área y utilidad de ejecución.",
                Miks: "Agente flexible con enfoque en duelos y control puntual de espacios.",
                Iso: "Duelista de duelos aislados y presión directa con protección temporal.",
                Jett: "Duelista móvil para entradas rápidas y reposicionamiento instantáneo.",
                Neon: "Duelista de velocidad para abrir ángulos y forzar rotaciones.",
                Phoenix: "Duelista autosustentable con utilidad de curación y reinicio.",
                Raze: "Duelista explosiva para despejar posiciones y tomar sitio.",
                Reyna: "Duelista de snowball que se fortalece con bajas.",
                Waylay: "Duelista de hostigamiento con control rápido de espacio.",
                Yoru: "Duelista de engaño y flanqueo con teletransporte.",
                Chamber: "Centinela de pick con control de espacio y armas propias.",
                Cypher: "Centinela de información con trampas y cámaras.",
                Deadlock: "Centinela de contención con control de zonas y ralentización.",
                Killjoy: "Centinela de utilidad automática para control y defensa.",
                Sage: "Centinela de soporte con curación, muro y control de avance.",
                Veto: "Centinela de control táctico con enfoque en defensa del sitio.",
                Vyse: "Centinela de control reactivo para frenar empujes.",
                Breach: "Iniciador de utilidad fuerte para despejar ángulos con aturdimientos.",
                Fade: "Iniciadora de rastreo para revelar y cazar enemigos.",
                Gekko: "Iniciador con criaturas para info y desactivar/plantar.",
                "KAY/O": "Iniciador de supresión que corta habilidades clave.",
                Skye: "Iniciadora de apoyo con curación e información.",
                Sova: "Iniciador de reconocimiento con dardos y drones.",
                Tejo: "Iniciador táctico de presión y control en ejecuciones.",
            };

            let desc = drawer.querySelector(".drawer-desc");
            const subtitle = drawer.querySelector(".drawer-subtitle");
            if (!desc) {
                desc = document.createElement("p");
                desc.className = "drawer-desc";
                if (subtitle) {
                    subtitle.insertAdjacentElement("beforebegin", desc);
                } else {
                    drawer.querySelector(".drawer-panel")?.appendChild(desc);
                }
            }
            desc.textContent = descriptions[name] || "Agente versátil para ejecutar roles clave del equipo.";

            const iconMap = {
                Astra: "galeria/agentes/astra.png",
                Omen: "galeria/agentes/Omen_icon.webp",
                Chamber: "galeria/agentes/chamber.png",
                Sage: "galeria/agentes/sage.png",
                Reyna: "galeria/agentes/reyna.png",
                Phoenix: "galeria/agentes/phoenix.png",
                Jett: "galeria/agentes/jett.png",
                Fade: "galeria/agentes/fade.png",
                Gekko: "galeria/agentes/gekko.png",
                Sova: "galeria/agentes/sova.png",
                Neon: "galeria/agentes/neon.png",
                Killjoy: "galeria/agentes/killjoy.png",
                Viper: "galeria/agentes/viper.png",
                Clove: "galeria/agentes/Clove_icon.webp",
                Miks: "galeria/agentes/Miks_icon.webp",
                Harbor: "galeria/agentes/harbor.png",
                Raze: "galeria/agentes/raze.png",
                Breach: "galeria/agentes/breach.png",
                Cypher: "galeria/agentes/cypher.png",
                Skye: "galeria/agentes/skye.png",
                Brimstone: "galeria/agentes/brimstone.png",
                Iso: "galeria/agentes/iso.png",
                Waylay: "galeria/agentes/waylay.png",
                Yoru: "galeria/agentes/yoru.png",
                Deadlock: "galeria/agentes/Deadlock_icon.webp",
                Veto: "galeria/agentes/Veto_icon.webp",
                Vyse: "galeria/agentes/vyse.png",
                "KAY/O": "galeria/agentes/kayo.png",
            };

            const agentCompData = {
                Breach: [
                    {
                        rank: 1,
                        agents: ["Breach", "Clove", "Sage", "Reyna", "Raze"],
                        win: "58.29%",
                        round: "52.91%",
                        matches: "808",
                    },
                    {
                        rank: 2,
                        agents: ["Breach", "Clove", "Sage", "Jett", "Neon"],
                        win: "57.68%",
                        round: "53.34%",
                        matches: "801",
                    },
                    {
                        rank: 3,
                        agents: ["Breach", "Clove", "Chamber", "Jett", "Phoenix"],
                        win: "55.84%",
                        round: "52.72%",
                        matches: "788",
                    },
                    {
                        rank: 4,
                        agents: ["Breach", "Clove", "Sage", "Reyna", "Neon"],
                        win: "55.09%",
                        round: "52.62%",
                        matches: "962",
                    },
                    {
                        rank: 5,
                        agents: ["Breach", "Clove", "Chamber", "Jett", "Neon"],
                        win: "54.78%",
                        round: "52.19%",
                        matches: "1,391",
                    },
                ],
                Fade: [
                    {
                        rank: 1,
                        agents: ["Fade", "Clove", "Sage", "Jett", "Raze"],
                        win: "60.27%",
                        round: "53.77%",
                        matches: "1,017",
                    },
                    {
                        rank: 2,
                        agents: ["Fade", "Clove", "Killjoy", "Jett", "Phoenix"],
                        win: "58.38%",
                        round: "53.59%",
                        matches: "901",
                    },
                    {
                        rank: 3,
                        agents: ["Fade", "Clove", "Sage", "Reyna", "Raze"],
                        win: "56.83%",
                        round: "52.74%",
                        matches: "1,691",
                    },
                    {
                        rank: 4,
                        agents: ["Fade", "Clove", "Killjoy", "Reyna", "Neon"],
                        win: "56.59%",
                        round: "52.79%",
                        matches: "1,101",
                    },
                    {
                        rank: 5,
                        agents: ["Fade", "Clove", "Sage", "Jett", "Phoenix"],
                        win: "56.50%",
                        round: "52.58%",
                        matches: "1,308",
                    },
                ],
                Gekko: [
                    {
                        rank: 1,
                        agents: ["Gekko", "Sage", "Brimstone", "Reyna", "Raze"],
                        win: "58.40%",
                        round: "53.30%",
                        matches: "762",
                    },
                    {
                        rank: 2,
                        agents: ["Gekko", "Clove", "Killjoy", "Reyna", "Jett"],
                        win: "57.59%",
                        round: "53.12%",
                        matches: "962",
                    },
                    {
                        rank: 3,
                        agents: ["Gekko", "Clove", "Sage", "Jett", "Raze"],
                        win: "56.55%",
                        round: "53.28%",
                        matches: "1,015",
                    },
                    {
                        rank: 4,
                        agents: ["Gekko", "Clove", "Sage", "Jett", "Neon"],
                        win: "56.54%",
                        round: "53.13%",
                        matches: "1,070",
                    },
                    {
                        rank: 5,
                        agents: ["Gekko", "Clove", "Sage", "Reyna", "Phoenix"],
                        win: "55.90%",
                        round: "52.78%",
                        matches: "1,558",
                    },
                ],
                "KAY/O": [
                    {
                        rank: 1,
                        agents: ["KAY/O", "Clove", "Sage", "Reyna", "Neon"],
                        win: "51.58%",
                        round: "51.27%",
                        matches: "919",
                    },
                    {
                        rank: 2,
                        agents: ["KAY/O", "Clove", "Sage", "Reyna", "Jett"],
                        win: "51.28%",
                        round: "51.64%",
                        matches: "1,905",
                    },
                    {
                        rank: 3,
                        agents: ["KAY/O", "Sage", "Brimstone", "Reyna", "Jett"],
                        win: "50.49%",
                        round: "51.13%",
                        matches: "824",
                    },
                    {
                        rank: 4,
                        agents: ["KAY/O", "Clove", "Chamber", "Reyna", "Jett"],
                        win: "49.92%",
                        round: "50.50%",
                        matches: "2,354",
                    },
                    {
                        rank: 5,
                        agents: ["KAY/O", "Chamber", "Miks", "Reyna", "Raze"],
                        win: "49.37%",
                        round: "50.39%",
                        matches: "800",
                    },
                ],
                Skye: [
                    {
                        rank: 1,
                        agents: ["Skye", "Cypher", "Clove", "Neon", "Raze"],
                        win: "57.95%",
                        round: "52.76%",
                        matches: "761",
                    },
                    {
                        rank: 2,
                        agents: ["Skye", "Clove", "Chamber", "Neon", "Waylay"],
                        win: "56.90%",
                        round: "53.14%",
                        matches: "986",
                    },
                    {
                        rank: 3,
                        agents: ["Skye", "Clove", "Sage", "Jett", "Phoenix"],
                        win: "56.65%",
                        round: "53.22%",
                        matches: "1,354",
                    },
                    {
                        rank: 4,
                        agents: ["Skye", "Clove", "Chamber", "Sage", "Reyna"],
                        win: "56.62%",
                        round: "53.30%",
                        matches: "966",
                    },
                    {
                        rank: 5,
                        agents: ["Skye", "Clove", "Sage", "Jett", "Raze"],
                        win: "56.32%",
                        round: "53.14%",
                        matches: "1,488",
                    },
                ],
                Sova: [
                    {
                        rank: 1,
                        agents: ["Sova", "Clove", "Killjoy", "Jett", "Neon"],
                        win: "59.12%",
                        round: "53.85%",
                        matches: "1,179",
                    },
                    {
                        rank: 2,
                        agents: ["Sova", "Clove", "Sage", "Reyna", "Phoenix"],
                        win: "57.77%",
                        round: "53.66%",
                        matches: "1,326",
                    },
                    {
                        rank: 3,
                        agents: ["Sova", "Clove", "Killjoy", "Jett", "Phoenix"],
                        win: "56.98%",
                        round: "53.31%",
                        matches: "1,125",
                    },
                    {
                        rank: 4,
                        agents: ["Sova", "Cypher", "Clove", "Jett", "Neon"],
                        win: "56.22%",
                        round: "52.72%",
                        matches: "1,382",
                    },
                    {
                        rank: 5,
                        agents: ["Sova", "Clove", "Chamber", "Sage", "Jett"],
                        win: "56.15%",
                        round: "52.96%",
                        matches: "1,179",
                    },
                ],
                Tejo: [
                    {
                        rank: 1,
                        agents: ["Tejo", "Clove", "Sage", "Reyna", "Phoenix"],
                        win: "54.98%",
                        round: "52.72%",
                        matches: "764",
                    },
                    {
                        rank: 2,
                        agents: ["Tejo", "Clove", "Sage", "Reyna", "Neon"],
                        win: "54.87%",
                        round: "52.46%",
                        matches: "1,037",
                    },
                    {
                        rank: 3,
                        agents: ["Tejo", "Clove", "Chamber", "Jett", "Neon"],
                        win: "54.45%",
                        round: "52.00%",
                        matches: "832",
                    },
                    {
                        rank: 4,
                        agents: ["Tejo", "Clove", "Chamber", "Reyna", "Neon"],
                        win: "53.40%",
                        round: "51.85%",
                        matches: "1,309",
                    },
                    {
                        rank: 5,
                        agents: ["Tejo", "Clove", "Chamber", "Jett", "Phoenix"],
                        win: "53.40%",
                        round: "51.96%",
                        matches: "751",
                    },
                ],
                Vyse: [
                    {
                        rank: 1,
                        agents: ["Vyse", "Clove", "Neon", "Fade", "Phoenix"],
                        win: "58.22%",
                        round: "53.35%",
                        matches: "1,381",
                    },
                    {
                        rank: 2,
                        agents: ["Vyse", "Clove", "Sage", "Reyna", "Neon"],
                        win: "57.68%",
                        round: "53.26%",
                        matches: "886",
                    },
                    {
                        rank: 3,
                        agents: ["Vyse", "Clove", "Reyna", "Neon", "Gekko"],
                        win: "57.49%",
                        round: "52.71%",
                        matches: "1,289",
                    },
                    {
                        rank: 4,
                        agents: ["Vyse", "Clove", "Sage", "Reyna", "Phoenix"],
                        win: "57.34%",
                        round: "53.34%",
                        matches: "926",
                    },
                    {
                        rank: 5,
                        agents: ["Vyse", "Clove", "Sage", "KAY/O", "Reyna"],
                        win: "57.34%",
                        round: "53.39%",
                        matches: "783",
                    },
                ],
                Sage: [
                    {
                        rank: 1,
                        agents: ["Sage", "Clove", "Jett", "Fade", "Raze"],
                        win: "60.27%",
                        round: "53.77%",
                        matches: "1,017",
                    },
                    {
                        rank: 2,
                        agents: ["Sage", "Brimstone", "Reyna", "Gekko", "Raze"],
                        win: "58.40%",
                        round: "53.30%",
                        matches: "762",
                    },
                    {
                        rank: 3,
                        agents: ["Sage", "Clove", "Breach", "Reyna", "Raze"],
                        win: "58.29%",
                        round: "52.91%",
                        matches: "808",
                    },
                    {
                        rank: 4,
                        agents: ["Sage", "Clove", "Chamber", "Reyna", "Neon"],
                        win: "57.94%",
                        round: "53.04%",
                        matches: "1,291",
                    },
                    {
                        rank: 5,
                        agents: ["Sage", "Clove", "Sova", "Reyna", "Phoenix"],
                        win: "57.77%",
                        round: "53.66%",
                        matches: "1,326",
                    },
                ],
                Veto: [
                    {
                        rank: 1,
                        agents: ["Veto", "Clove", "Sova", "Sage", "Jett"],
                        win: "58.02%",
                        round: "53.27%",
                        matches: "1,422",
                    },
                    {
                        rank: 2,
                        agents: ["Veto", "Clove", "Sage", "Reyna", "Phoenix"],
                        win: "57.00%",
                        round: "52.98%",
                        matches: "1,279",
                    },
                    {
                        rank: 3,
                        agents: ["Veto", "Clove", "Neon", "Fade", "Phoenix"],
                        win: "56.92%",
                        round: "53.27%",
                        matches: "975",
                    },
                    {
                        rank: 4,
                        agents: ["Veto", "Clove", "Jett", "Gekko", "Phoenix"],
                        win: "56.77%",
                        round: "53.24%",
                        matches: "1,115",
                    },
                    {
                        rank: 5,
                        agents: ["Veto", "Clove", "Sova", "Jett", "Phoenix"],
                        win: "56.65%",
                        round: "52.94%",
                        matches: "2,964",
                    },
                ],
                Chamber: [
                    {
                        rank: 1,
                        agents: ["Chamber", "Clove", "Sage", "Reyna", "Neon"],
                        win: "57.94%",
                        round: "53.04%",
                        matches: "1,291",
                    },
                    {
                        rank: 2,
                        agents: ["Chamber", "Clove", "Sage", "Jett", "Phoenix"],
                        win: "57.42%",
                        round: "53.25%",
                        matches: "1,045",
                    },
                    {
                        rank: 3,
                        agents: ["Chamber", "Clove", "Sage", "Jett", "Raze"],
                        win: "56.90%",
                        round: "52.94%",
                        matches: "812",
                    },
                    {
                        rank: 4,
                        agents: ["Chamber", "Clove", "Skye", "Neon", "Waylay"],
                        win: "56.90%",
                        round: "53.14%",
                        matches: "986",
                    },
                    {
                        rank: 5,
                        agents: ["Chamber", "Clove", "Sage", "Skye", "Reyna"],
                        win: "56.62%",
                        round: "53.30%",
                        matches: "966",
                    },
                ],
                Cypher: [
                    {
                        rank: 1,
                        agents: ["Cypher", "Clove", "Skye", "Neon", "Raze"],
                        win: "57.95%",
                        round: "52.76%",
                        matches: "761",
                    },
                    {
                        rank: 2,
                        agents: ["Cypher", "Clove", "Sage", "Reyna", "Jett"],
                        win: "57.02%",
                        round: "52.97%",
                        matches: "1,147",
                    },
                    {
                        rank: 3,
                        agents: ["Cypher", "Clove", "Sova", "Jett", "Neon"],
                        win: "56.22%",
                        round: "52.72%",
                        matches: "1,382",
                    },
                    {
                        rank: 4,
                        agents: ["Cypher", "Clove", "Reyna", "Neon", "Fade"],
                        win: "56.04%",
                        round: "52.29%",
                        matches: "1,299",
                    },
                    {
                        rank: 5,
                        agents: ["Cypher", "Clove", "Sova", "Reyna", "Neon"],
                        win: "55.77%",
                        round: "52.22%",
                        matches: "1,343",
                    },
                ],
                Deadlock: [
                    {
                        rank: 1,
                        agents: ["Deadlock", "Clove", "Sage", "Reyna", "Jett"],
                        win: "54.71%",
                        round: "52.44%",
                        matches: "850",
                    },
                    {
                        rank: 2,
                        agents: ["Deadlock", "Clove", "Skye", "Reyna", "Jett"],
                        win: "54.68%",
                        round: "52.28%",
                        matches: "1,198",
                    },
                    {
                        rank: 3,
                        agents: ["Deadlock", "Clove", "Sova", "Reyna", "Jett"],
                        win: "54.48%",
                        round: "52.19%",
                        matches: "883",
                    },
                    {
                        rank: 4,
                        agents: ["Deadlock", "Clove", "Reyna", "Jett", "Gekko"],
                        win: "52.63%",
                        round: "51.98%",
                        matches: "779",
                    },
                    {
                        rank: 5,
                        agents: ["Deadlock", "Clove", "Reyna", "Jett", "Fade"],
                        win: "51.06%",
                        round: "51.41%",
                        matches: "989",
                    },
                ],
                Killjoy: [
                    {
                        rank: 1,
                        agents: ["Killjoy", "Clove", "Sova", "Jett", "Neon"],
                        win: "59.12%",
                        round: "53.85%",
                        matches: "1,179",
                    },
                    {
                        rank: 2,
                        agents: ["Killjoy", "Clove", "Jett", "Fade", "Phoenix"],
                        win: "58.38%",
                        round: "53.59%",
                        matches: "901",
                    },
                    {
                        rank: 3,
                        agents: ["Killjoy", "Clove", "Reyna", "Jett", "Gekko"],
                        win: "57.59%",
                        round: "53.12%",
                        matches: "962",
                    },
                    {
                        rank: 4,
                        agents: ["Killjoy", "Clove", "Sova", "Jett", "Phoenix"],
                        win: "56.98%",
                        round: "53.31%",
                        matches: "1,125",
                    },
                    {
                        rank: 5,
                        agents: ["Killjoy", "Clove", "Reyna", "Neon", "Fade"],
                        win: "56.59%",
                        round: "52.79%",
                        matches: "1,101",
                    },
                ],
                Yoru: [
                    {
                        rank: 1,
                        agents: ["Yoru", "Sova", "Astra", "Viper", "Neon"],
                        win: "57.86%",
                        round: "52.61%",
                        matches: "795",
                    },
                    {
                        rank: 2,
                        agents: ["Yoru", "Clove", "Sage", "Jett", "Phoenix"],
                        win: "56.77%",
                        round: "52.38%",
                        matches: "1,138",
                    },
                    {
                        rank: 3,
                        agents: ["Yoru", "Clove", "Sage", "Deadlock", "Raze"],
                        win: "56.31%",
                        round: "52.17%",
                        matches: "904",
                    },
                    {
                        rank: 4,
                        agents: ["Yoru", "Cypher", "Clove", "Sage", "Raze"],
                        win: "55.93%",
                        round: "52.85%",
                        matches: "1,046",
                    },
                    {
                        rank: 5,
                        agents: ["Yoru", "Clove", "Killjoy", "Sage", "Fade"],
                        win: "55.91%",
                        round: "52.75%",
                        matches: "1,016",
                    },
                ],
                Waylay: [
                    {
                        rank: 1,
                        agents: ["Waylay", "Clove", "Chamber", "Skye", "Neon"],
                        win: "56.90%",
                        round: "53.14%",
                        matches: "986",
                    },
                    {
                        rank: 2,
                        agents: ["Waylay", "Clove", "Chamber", "Fade", "Phoenix"],
                        win: "54.61%",
                        round: "52.07%",
                        matches: "835",
                    },
                    {
                        rank: 3,
                        agents: ["Waylay", "Clove", "Chamber", "Skye", "Raze"],
                        win: "53.26%",
                        round: "51.59%",
                        matches: "828",
                    },
                    {
                        rank: 4,
                        agents: ["Waylay", "Clove", "Chamber", "Sova", "Jett"],
                        win: "53.22%",
                        round: "51.86%",
                        matches: "1,227",
                    },
                    {
                        rank: 5,
                        agents: ["Waylay", "Clove", "Chamber", "Skye", "Jett"],
                        win: "52.94%",
                        round: "51.95%",
                        matches: "1,409",
                    },
                ],
                Reyna: [
                    {
                        rank: 1,
                        agents: ["Reyna", "Sage", "Brimstone", "Gekko", "Raze"],
                        win: "58.40%",
                        round: "53.30%",
                        matches: "762",
                    },
                    {
                        rank: 2,
                        agents: ["Reyna", "Clove", "Sage", "Breach", "Raze"],
                        win: "58.29%",
                        round: "52.91%",
                        matches: "808",
                    },
                    {
                        rank: 3,
                        agents: ["Reyna", "Clove", "Chamber", "Sage", "Neon"],
                        win: "57.94%",
                        round: "53.04%",
                        matches: "1,291",
                    },
                    {
                        rank: 4,
                        agents: ["Reyna", "Clove", "Sova", "Sage", "Phoenix"],
                        win: "57.77%",
                        round: "53.66%",
                        matches: "1,326",
                    },
                    {
                        rank: 5,
                        agents: ["Reyna", "Clove", "Killjoy", "Jett", "Gekko"],
                        win: "57.59%",
                        round: "53.12%",
                        matches: "962",
                    },
                ],
                Raze: [
                    {
                        rank: 1,
                        agents: ["Raze", "Clove", "Sage", "Jett", "Fade"],
                        win: "60.27%",
                        round: "53.77%",
                        matches: "1,017",
                    },
                    {
                        rank: 2,
                        agents: ["Raze", "Sage", "Brimstone", "Reyna", "Gekko"],
                        win: "58.40%",
                        round: "53.30%",
                        matches: "762",
                    },
                    {
                        rank: 3,
                        agents: ["Raze", "Clove", "Sage", "Breach", "Reyna"],
                        win: "58.29%",
                        round: "52.91%",
                        matches: "808",
                    },
                    {
                        rank: 4,
                        agents: ["Raze", "Cypher", "Clove", "Skye", "Neon"],
                        win: "57.95%",
                        round: "52.76%",
                        matches: "761",
                    },
                    {
                        rank: 5,
                        agents: ["Raze", "Clove", "Chamber", "Sage", "Jett"],
                        win: "56.90%",
                        round: "52.94%",
                        matches: "812",
                    },
                ],
                Phoenix: [
                    {
                        rank: 1,
                        agents: ["Phoenix", "Clove", "Killjoy", "Jett", "Fade"],
                        win: "58.38%",
                        round: "53.59%",
                        matches: "901",
                    },
                    {
                        rank: 2,
                        agents: ["Phoenix", "Clove", "Sova", "Sage", "Reyna"],
                        win: "57.77%",
                        round: "53.66%",
                        matches: "1,326",
                    },
                    {
                        rank: 3,
                        agents: ["Phoenix", "Clove", "Chamber", "Sage", "Jett"],
                        win: "57.42%",
                        round: "53.25%",
                        matches: "1,045",
                    },
                    {
                        rank: 4,
                        agents: ["Phoenix", "Clove", "Killjoy", "Sova", "Jett"],
                        win: "56.98%",
                        round: "53.31%",
                        matches: "1,125",
                    },
                    {
                        rank: 5,
                        agents: ["Phoenix", "Clove", "Sage", "Skye", "Jett"],
                        win: "56.65%",
                        round: "53.22%",
                        matches: "1,354",
                    },
                ],
                Neon: [
                    {
                        rank: 1,
                        agents: ["Neon", "Clove", "Killjoy", "Sova", "Jett"],
                        win: "59.12%",
                        round: "53.85%",
                        matches: "1,179",
                    },
                    {
                        rank: 2,
                        agents: ["Neon", "Cypher", "Clove", "Skye", "Raze"],
                        win: "57.95%",
                        round: "52.76%",
                        matches: "761",
                    },
                    {
                        rank: 3,
                        agents: ["Neon", "Clove", "Chamber", "Sage", "Reyna"],
                        win: "57.94%",
                        round: "53.04%",
                        matches: "1,291",
                    },
                    {
                        rank: 4,
                        agents: ["Neon", "Clove", "Sage", "Breach", "Jett"],
                        win: "57.68%",
                        round: "53.34%",
                        matches: "801",
                    },
                    {
                        rank: 5,
                        agents: ["Neon", "Clove", "Chamber", "Skye", "Waylay"],
                        win: "56.90%",
                        round: "53.14%",
                        matches: "986",
                    },
                ],
                Jett: [
                    {
                        rank: 1,
                        agents: ["Jett", "Clove", "Sage", "Fade", "Raze"],
                        win: "60.27%",
                        round: "53.77%",
                        matches: "1,017",
                    },
                    {
                        rank: 2,
                        agents: ["Jett", "Clove", "Killjoy", "Sova", "Neon"],
                        win: "59.12%",
                        round: "53.85%",
                        matches: "1,179",
                    },
                    {
                        rank: 3,
                        agents: ["Jett", "Clove", "Killjoy", "Fade", "Phoenix"],
                        win: "58.38%",
                        round: "53.59%",
                        matches: "901",
                    },
                    {
                        rank: 4,
                        agents: ["Jett", "Clove", "Sage", "Breach", "Neon"],
                        win: "57.68%",
                        round: "53.34%",
                        matches: "801",
                    },
                    {
                        rank: 5,
                        agents: ["Jett", "Clove", "Killjoy", "Reyna", "Gekko"],
                        win: "57.59%",
                        round: "53.12%",
                        matches: "962",
                    },
                ],
                Iso: [
                    {
                        rank: 1,
                        agents: ["Iso", "Clove", "Sage", "Reyna", "Gekko"],
                        win: "55.43%",
                        round: "52.44%",
                        matches: "929",
                    },
                    {
                        rank: 2,
                        agents: ["Iso", "Chamber", "Miks", "Neon", "Fade"],
                        win: "54.69%",
                        round: "51.87%",
                        matches: "832",
                    },
                    {
                        rank: 3,
                        agents: ["Iso", "Clove", "Chamber", "Jett", "Fade"],
                        win: "53.70%",
                        round: "52.04%",
                        matches: "1,108",
                    },
                    {
                        rank: 4,
                        agents: ["Iso", "Clove", "Chamber", "Sova", "Jett"],
                        win: "50.40%",
                        round: "51.28%",
                        matches: "1,256",
                    },
                    {
                        rank: 5,
                        agents: ["Iso", "Sage", "Miks", "Reyna", "Gekko"],
                        win: "50.26%",
                        round: "51.22%",
                        matches: "766",
                    },
                ],
                Miks: [
                    {
                        rank: 1,
                        agents: ["Miks", "Iso", "Chamber", "Neon", "Fade"],
                        win: "54.69%",
                        round: "51.87%",
                        matches: "832",
                    },
                    {
                        rank: 2,
                        agents: ["Miks", "Cypher", "Sage", "Reyna", "Jett"],
                        win: "54.03%",
                        round: "51.95%",
                        matches: "770",
                    },
                    {
                        rank: 3,
                        agents: ["Miks", "Sage", "Jett", "Fade", "Phoenix"],
                        win: "53.60%",
                        round: "51.52%",
                        matches: "1,362",
                    },
                    {
                        rank: 4,
                        agents: ["Miks", "Chamber", "Neon", "Gekko", "Phoenix"],
                        win: "53.23%",
                        round: "51.51%",
                        matches: "774",
                    },
                    {
                        rank: 5,
                        agents: ["Miks", "Sova", "Sage", "Jett", "Phoenix"],
                        win: "53.18%",
                        round: "51.86%",
                        matches: "1,431",
                    },
                ],
                Brimstone: [
                    {
                        rank: 1,
                        agents: ["Brimstone", "Sage", "Reyna", "Gekko", "Raze"],
                        win: "58.40%",
                        round: "53.30%",
                        matches: "762",
                    },
                    {
                        rank: 2,
                        agents: ["Brimstone", "Sage", "Reyna", "Neon", "Gekko"],
                        win: "54.09%",
                        round: "52.08%",
                        matches: "856",
                    },
                    {
                        rank: 3,
                        agents: ["Brimstone", "Sage", "Reyna", "Jett", "Fade"],
                        win: "53.96%",
                        round: "51.47%",
                        matches: "1,264",
                    },
                    {
                        rank: 4,
                        agents: ["Brimstone", "Chamber", "Jett", "Fade", "Phoenix"],
                        win: "53.40%",
                        round: "51.85%",
                        matches: "779",
                    },
                    {
                        rank: 5,
                        agents: ["Brimstone", "Sage", "Skye", "Reyna", "Jett"],
                        win: "53.39%",
                        round: "51.64%",
                        matches: "1,504",
                    },
                ],
                Clove: [
                    {
                        rank: 1,
                        agents: ["Clove", "Sage", "Jett", "Fade", "Raze"],
                        win: "60.27%",
                        round: "53.77%",
                        matches: "1,017",
                    },
                    {
                        rank: 2,
                        agents: ["Clove", "Killjoy", "Sova", "Jett", "Neon"],
                        win: "59.12%",
                        round: "53.85%",
                        matches: "1,179",
                    },
                    {
                        rank: 3,
                        agents: ["Clove", "Killjoy", "Jett", "Fade", "Phoenix"],
                        win: "58.38%",
                        round: "53.59%",
                        matches: "901",
                    },
                    {
                        rank: 4,
                        agents: ["Clove", "Sage", "Breach", "Reyna", "Raze"],
                        win: "58.29%",
                        round: "52.91%",
                        matches: "808",
                    },
                    {
                        rank: 5,
                        agents: ["Clove", "Cypher", "Skye", "Neon", "Raze"],
                        win: "57.95%",
                        round: "52.76%",
                        matches: "761",
                    },
                ],
                Harbor: [
                    {
                        rank: 1,
                        agents: ["Harbor", "Clove", "Chamber", "Sova", "Jett"],
                        win: "52.60%",
                        round: "51.25%",
                        matches: "1,559",
                    },
                    {
                        rank: 2,
                        agents: ["Harbor", "Sova", "Sage", "Jett", "Phoenix"],
                        win: "50.93%",
                        round: "51.59%",
                        matches: "856",
                    },
                    {
                        rank: 3,
                        agents: ["Harbor", "Chamber", "Sage", "Jett", "Gekko"],
                        win: "50.77%",
                        round: "50.98%",
                        matches: "1,101",
                    },
                    {
                        rank: 4,
                        agents: ["Harbor", "Sova", "Sage", "Reyna", "Jett"],
                        win: "50.75%",
                        round: "50.86%",
                        matches: "3,659",
                    },
                    {
                        rank: 5,
                        agents: ["Harbor", "Chamber", "Sova", "Sage", "Reyna"],
                        win: "50.55%",
                        round: "51.02%",
                        matches: "1,183",
                    },
                ],
                Viper: [
                    {
                        rank: 1,
                        agents: ["Viper", "Clove", "Chamber", "Sova", "Jett"],
                        win: "55.38%",
                        round: "52.60%",
                        matches: "995",
                    },
                    {
                        rank: 2,
                        agents: ["Viper", "Chamber", "Sova", "Jett", "Neon"],
                        win: "53.67%",
                        round: "52.26%",
                        matches: "2,819",
                    },
                    {
                        rank: 3,
                        agents: ["Viper", "Chamber", "Sova", "Reyna", "Neon"],
                        win: "50.23%",
                        round: "50.89%",
                        matches: "1,105",
                    },
                    {
                        rank: 4,
                        agents: ["Viper", "Chamber", "Sova", "Miks", "Jett"],
                        win: "49.65%",
                        round: "50.61%",
                        matches: "1,573",
                    },
                    {
                        rank: 5,
                        agents: ["Viper", "Chamber", "Sova", "Reyna", "Jett"],
                        win: "49.61%",
                        round: "50.92%",
                        matches: "3,818",
                    },
                ],
                Astra: [
                    {
                        rank: 1,
                        agents: ["Astra", "Chamber", "Jett", "Fade", "Phoenix"],
                        win: "52.43%",
                        round: "51.57%",
                        matches: "1,009",
                    },
                    {
                        rank: 2,
                        agents: ["Astra", "Chamber", "Sova", "Jett", "Neon"],
                        win: "51.91%",
                        round: "51.39%",
                        matches: "1,986",
                    },
                    {
                        rank: 3,
                        agents: ["Astra", "Killjoy", "Reyna", "Jett", "Fade"],
                        win: "51.68%",
                        round: "51.39%",
                        matches: "805",
                    },
                    {
                        rank: 4,
                        agents: ["Astra", "Chamber", "Sova", "Reyna", "Neon"],
                        win: "50.65%",
                        round: "51.03%",
                        matches: "1,149",
                    },
                    {
                        rank: 5,
                        agents: ["Astra", "Chamber", "Sova", "Viper", "Jett"],
                        win: "49.12%",
                        round: "50.89%",
                        matches: "798",
                    },
                ],
                Omen: [
                    {
                        rank: 1,
                        agents: ["Omen", "Chamber", "Sage", "Reyna", "Phoenix"],
                        win: "55.72%",
                        round: "52.53%",
                        matches: "874",
                    },
                    {
                        rank: 2,
                        agents: ["Omen", "Chamber", "Sage", "Jett", "Fade"],
                        win: "54.23%",
                        round: "51.81%",
                        matches: "852",
                    },
                    {
                        rank: 3,
                        agents: ["Omen", "Chamber", "Sage", "Reyna", "Gekko"],
                        win: "53.13%",
                        round: "51.70%",
                        matches: "1,133",
                    },
                    {
                        rank: 4,
                        agents: ["Omen", "Chamber", "Sova", "Sage", "Jett"],
                        win: "52.97%",
                        round: "51.65%",
                        matches: "1,231",
                    },
                    {
                        rank: 5,
                        agents: ["Omen", "Sova", "Sage", "Reyna", "Phoenix"],
                        win: "52.51%",
                        round: "51.11%",
                        matches: "1,076",
                    },
                ],
            };

            const getAgentIcon = (agentName) =>
                iconMap[agentName] || link.querySelector("img")?.getAttribute("src") || "";

            let body = drawer.querySelector(".agent-table-body");
            if (!body) {
                const table = drawer.querySelector(".agent-table");
                if (table) {
                    body = document.createElement("div");
                    body.className = "agent-table-body";
                    table.appendChild(body);
                }
            }
            if (body) {
                body.innerHTML = "";
                drawer.querySelectorAll(".agent-table-row").forEach((row) => row.remove());
                const rows = (agentCompData[name] || []).slice(0, 5);
                rows.forEach((rowData) => {
                    const row = document.createElement("div");
                    row.className = "agent-table-row";

                    const rank = document.createElement("span");
                    rank.className = "rank";
                    rank.textContent = String(rowData.rank);

                    const agents = document.createElement("div");
                    agents.className = "agents";
                    rowData.agents.forEach((agent) => {
                        const img = document.createElement("img");
                        img.src = getAgentIcon(agent);
                        img.alt = agent;
                        agents.appendChild(img);
                    });

                    const win = document.createElement("span");
                    win.className = "win";
                    win.textContent = rowData.win;

                    const round = document.createElement("span");
                    round.className = "round-rate";
                    round.textContent = rowData.round;

                    const matches = document.createElement("span");
                    matches.className = "matches";
                    matches.textContent = rowData.matches;

                    row.append(rank, agents, win, round, matches);
                    body.appendChild(row);
                });
            }

            drawer.classList.add("is-open");
            document.body.classList.add("drawer-open");
        }
    });
});

document.querySelectorAll(".drawer [data-close]").forEach((el) => {
    el.addEventListener("click", () => {
        const drawer = el.closest(".drawer");
        if (drawer) {
            drawer.classList.remove("is-open");
            document.body.classList.remove("drawer-open");
        }
    });
});

// Meta table (1-29 rows)
const metaTable = document.querySelector("[data-meta-table]");
if (metaTable && document.body.classList.contains("meta")) {
    const body = metaTable.querySelector(".agent-table-body");
    if (body) {
        const metaIconMap = {
            Clove: "galeria/agentes/Clove_icon.webp",
            Sage: "galeria/agentes/sage.png",
            Jett: "galeria/agentes/jett.png",
            Fade: "galeria/agentes/fade.png",
            Raze: "galeria/agentes/raze.png",
            Killjoy: "galeria/agentes/killjoy.png",
            Sova: "galeria/agentes/sova.png",
            Neon: "galeria/agentes/neon.png",
            Brimstone: "galeria/agentes/brimstone.png",
            Reyna: "galeria/agentes/reyna.png",
            Gekko: "galeria/agentes/gekko.png",
            Phoenix: "galeria/agentes/phoenix.png",
            Breach: "galeria/agentes/breach.png",
            Cypher: "galeria/agentes/cypher.png",
            Skye: "galeria/agentes/skye.png",
            Chamber: "galeria/agentes/chamber.png",
            Waylay: "galeria/agentes/waylay.png",
        };

        const metaTableData = [
            { rank: 1, agents: ["Clove","Sage","Jett","Fade","Raze"], win: "60.27%", round: "53.77%", matches: "1,017" },
            { rank: 2, agents: ["Clove","Killjoy","Sova","Jett","Neon"], win: "59.12%", round: "53.85%", matches: "1,179" },
            { rank: 3, agents: ["Sage","Brimstone","Reyna","Gekko","Raze"], win: "58.40%", round: "53.30%", matches: "762" },
            { rank: 4, agents: ["Clove","Killjoy","Jett","Fade","Phoenix"], win: "58.38%", round: "53.59%", matches: "901" },
            { rank: 5, agents: ["Clove","Sage","Breach","Reyna","Raze"], win: "58.29%", round: "52.91%", matches: "808" },
            { rank: 6, agents: ["Cypher","Clove","Skye","Neon","Raze"], win: "57.95%", round: "52.76%", matches: "761" },
            { rank: 7, agents: ["Clove","Chamber","Sage","Reyna","Neon"], win: "57.94%", round: "53.04%", matches: "1,291" },
            { rank: 8, agents: ["Clove","Sova","Sage","Reyna","Phoenix"], win: "57.77%", round: "53.66%", matches: "1,326" },
            { rank: 9, agents: ["Clove","Sage","Breach","Jett","Neon"], win: "57.68%", round: "53.34%", matches: "801" },
            { rank: 10, agents: ["Clove","Killjoy","Reyna","Jett","Gekko"], win: "57.59%", round: "53.12%", matches: "962" },
            { rank: 11, agents: ["Clove","Chamber","Sage","Jett","Phoenix"], win: "57.42%", round: "53.25%", matches: "1,045" },
            { rank: 12, agents: ["Cypher","Clove","Sage","Reyna","Jett"], win: "57.02%", round: "52.97%", matches: "1,147" },
            { rank: 13, agents: ["Clove","Killjoy","Sova","Jett","Phoenix"], win: "56.98%", round: "53.31%", matches: "1,125" },
            { rank: 14, agents: ["Clove","Chamber","Sage","Jett","Raze"], win: "56.90%", round: "52.94%", matches: "812" },
            { rank: 15, agents: ["Clove","Chamber","Skye","Neon","Waylay"], win: "56.90%", round: "53.14%", matches: "986" },
            { rank: 16, agents: ["Clove","Sage","Reyna","Fade","Raze"], win: "56.83%", round: "52.74%", matches: "1,691" },
            { rank: 17, agents: ["Clove","Sage","Skye","Jett","Phoenix"], win: "56.65%", round: "53.22%", matches: "1,354" },
            { rank: 18, agents: ["Clove","Chamber","Sage","Skye","Reyna"], win: "56.62%", round: "53.30%", matches: "966" },
            { rank: 19, agents: ["Clove","Killjoy","Reyna","Neon","Fade"], win: "56.59%", round: "52.79%", matches: "1,101" },
            { rank: 20, agents: ["Clove","Sage","Jett","Gekko","Raze"], win: "56.55%", round: "53.28%", matches: "1,015" },
            { rank: 21, agents: ["Clove","Sage","Jett","Neon","Gekko"], win: "56.54%", round: "53.13%", matches: "1,070" },
            { rank: 22, agents: ["Clove","Sage","Jett","Fade","Phoenix"], win: "56.50%", round: "52.58%", matches: "1,308" },
            { rank: 23, agents: ["Clove","Chamber","Sage","Reyna","Jett"], win: "56.48%", round: "52.95%", matches: "3,304" },
            { rank: 24, agents: ["Clove","Sage","Reyna","Neon","Fade"], win: "56.37%", round: "52.89%", matches: "1,687" },
            { rank: 25, agents: ["Clove","Sage","Skye","Jett","Raze"], win: "56.32%", round: "53.14%", matches: "1,488" },
            { rank: 26, agents: ["Cypher","Clove","Sova","Jett","Neon"], win: "56.22%", round: "52.72%", matches: "1,382" },
            { rank: 27, agents: ["Clove","Chamber","Sova","Sage","Jett"], win: "56.15%", round: "52.96%", matches: "1,179" },
            { rank: 28, agents: ["Clove","Chamber","Reyna","Neon","Fade"], win: "56.08%", round: "52.62%", matches: "4,119" },
            { rank: 29, agents: ["Clove","Sage","Skye","Reyna","Phoenix"], win: "56.06%", round: "52.49%", matches: "1,229" },
        ];

        body.innerHTML = "";
        metaTableData.forEach((rowData) => {
            const row = document.createElement("div");
            row.className = "agent-table-row";

            const rank = document.createElement("span");
            rank.className = "rank";
            rank.textContent = String(rowData.rank);

            const agents = document.createElement("div");
            agents.className = "agents";
            rowData.agents.forEach((agent) => {
                const img = document.createElement("img");
                img.src = metaIconMap[agent] || "galeria/agentes/jett.png";
                img.alt = agent;
                agents.appendChild(img);
            });

            const win = document.createElement("span");
            win.className = "win";
            win.textContent = rowData.win;

            const round = document.createElement("span");
            round.className = "round-rate";
            round.textContent = rowData.round;

            const matches = document.createElement("span");
            matches.className = "matches";
            matches.textContent = rowData.matches;

            row.append(rank, agents, win, round, matches);
            body.appendChild(row);
        });
    }
}
