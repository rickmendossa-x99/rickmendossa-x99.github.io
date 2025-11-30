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
        // APERTURA
        collapseHeaderItems.classList.remove("tw-w-0", "tw-opacity-0", "tw-pointer-events-none")
        collapseHeaderItems.classList.add("tw-w-full", "tw-opacity-100", "tw-pointer-events-auto")
        
        // Forza Z-Index altissimo
        collapseHeaderItems.style.zIndex = "9999"
        collapseHeaderItems.style.position = "fixed"
        collapseHeaderItems.style.top = "0"
        collapseHeaderItems.style.left = "0" // Assicura che parta da sinistra

        // Modifica bottone
        collapseBtn.classList.remove("bi-list", "tw-relative")
        collapseBtn.classList.add("bi-x", "tw-fixed")
        
        // Forza posizione bottone via stile inline per vincere su tutto
        collapseBtn.style.position = "fixed"
        collapseBtn.style.top = "24px" // 6 * 4px (tailwnd tw-top-6)
        collapseBtn.style.right = "5%"
        collapseBtn.style.zIndex = "10000" // Sopra al menu

        isHeaderCollapsed = false
        document.body.style.overflow = "hidden" // Blocca scroll

        setTimeout(() => window.addEventListener("click", onHeaderClickOutside), 100)
    } else {
        // CHIUSURA
        collapseHeaderItems.classList.remove("tw-w-full", "tw-opacity-100", "tw-pointer-events-auto")
        collapseHeaderItems.classList.add("tw-w-0", "tw-opacity-0", "tw-pointer-events-none")
        
        // Reset stili bottone
        collapseBtn.classList.remove("bi-x", "tw-fixed")
        collapseBtn.classList.add("bi-list", "tw-relative")
        
        // Rimuovi stili inline forzati
        collapseBtn.style.position = ""
        collapseBtn.style.top = ""
        collapseBtn.style.right = ""
        collapseBtn.style.zIndex = ""

        isHeaderCollapsed = true
        document.body.style.overflow = "" // Sblocca scroll

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

