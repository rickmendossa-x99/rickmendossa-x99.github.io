// initialization
const RESPONSIVE_WIDTH = 1024

let headerWhiteBg = false
// Di default su schermi piccoli è chiuso (true)
let isHeaderCollapsed = window.innerWidth < RESPONSIVE_WIDTH

const collapseBtn = document.getElementById("collapse-btn")
const collapseHeaderItems = document.getElementById("collapsed-header-items")

function onHeaderClickOutside(e) {
    // Se clicco fuori dal menu E non sul pulsante menu stesso
    if (!collapseHeaderItems.contains(e.target) && !collapseBtn.contains(e.target)) {
        toggleHeader()
    }
}

function toggleHeader() {
    if (isHeaderCollapsed) {
        // APERTURA MENU
        // Rimuove opacità 0 (quindi diventa visibile)
        collapseHeaderItems.classList.remove("tw-opacity-0", "tw-pointer-events-none")
        collapseHeaderItems.classList.add("tw-opacity-100", "tw-pointer-events-auto")
        
        // Larghezza piena su mobile per vedere bene i link
        collapseHeaderItems.style.width = "100vw" 
        
        // Cambio icona menu -> X
        collapseBtn.classList.remove("bi-list")
        collapseBtn.classList.add("bi-x", "max-lg:tw-fixed", "tw-text-coach-text")
        
        // Segno come aperto
        isHeaderCollapsed = false

        // Aggiungo listener per chiudere cliccando fuori
        setTimeout(() => window.addEventListener("click", onHeaderClickOutside), 100)

    } else {
        // CHIUSURA MENU
        collapseHeaderItems.classList.remove("tw-opacity-100", "tw-pointer-events-auto")
        collapseHeaderItems.classList.add("tw-opacity-0", "tw-pointer-events-none")
        
        // Larghezza zero
        collapseHeaderItems.style.width = "0vw"
        
        // Cambio icona X -> menu
        collapseBtn.classList.remove("bi-x", "max-lg:tw-fixed")
        collapseBtn.classList.add("bi-list")
        
        // Segno come chiuso
        isHeaderCollapsed = true
        
        // Rimuovo listener
        window.removeEventListener("click", onHeaderClickOutside)
    }
}

function responsive() {
    if (window.innerWidth > RESPONSIVE_WIDTH) {
        // Su desktop resetta tutto
        collapseHeaderItems.style.width = ""
        collapseHeaderItems.classList.remove("tw-opacity-0", "tw-pointer-events-none")
        collapseHeaderItems.classList.add("tw-opacity-100", "tw-pointer-events-auto")
    } else {
        // Su mobile resetta a chiuso
        isHeaderCollapsed = true
        collapseHeaderItems.style.width = "0vw"
        collapseHeaderItems.classList.add("tw-opacity-0", "tw-pointer-events-none")
    }
}

window.addEventListener("resize", responsive)

/**
 * Animations
 */

gsap.registerPlugin(ScrollTrigger)

// Animazione iniziale degli elementi reveal-up (nascosti e spostati giù)
gsap.set(".reveal-up", {
    opacity: 0,
    y: 50, // meno estremo di "100%"
})

// straightens the slanting image
gsap.to("#dashboard", {
    scale: 1,
    translateY: 0,
    rotateX: "0deg",
    scrollTrigger: {
        trigger: "#hero-section",
        start: "top 80%",
        end: "bottom bottom",
        scrub: 1,
    }
})

// FAQ Accordion (corretto per funzionare con i nuovi bottoni)
// Nota: nell'HTML nuovo abbiamo cambiato classi e struttura per le FAQ
// Questo codice gestisce l'HTML che ti ho dato nell'ultimo step.
const faqButtons = document.querySelectorAll('.faq-btn')

faqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const content = btn.nextElementSibling;
        const icon = btn.querySelector('i');
        
        // Se è nascosto, mostralo
        if (content.classList.contains('tw-hidden')) {
            // Chiudi tutti gli altri prima (opzionale, ma elegante)
            document.querySelectorAll('.faq-content').forEach(c => c.classList.add('tw-hidden'));
            document.querySelectorAll('.faq-btn i').forEach(i => {
                i.classList.remove('bi-dash', 'tw-text-coach-coral');
                i.classList.add('bi-plus');
            });

            // Apri corrente
            content.classList.remove('tw-hidden');
            icon.classList.remove('bi-plus');
            icon.classList.add('bi-dash', 'tw-text-coach-coral');
        } else {
            // Se è già aperto, chiudilo
            content.classList.add('tw-hidden');
            icon.classList.remove('bi-dash', 'tw-text-coach-coral');
            icon.classList.add('bi-plus');
        }
    });
});

// ------------- reveal section animations ---------------

const sections = gsap.utils.toArray("section")

sections.forEach((sec) => {
    // Selettore sicuro: anima solo se ci sono elementi .reveal-up dentro
    const revealItems = sec.querySelectorAll(".reveal-up");
    
    if(revealItems.length > 0) {
        gsap.to(revealItems, {
            scrollTrigger: {
                trigger: sec,
                start: "top 80%", 
                end: "bottom 90%",
                // markers: true, // debug
            },
            opacity: 1,
            duration: 0.8,
            y: 0,
            stagger: 0.2,
            ease: "power2.out"
        })
    }
})

