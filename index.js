// initialization
const RESPONSIVE_WIDTH = 1024

let headerWhiteBg = false
// Di default su schermi piccoli è chiuso (true)
let isHeaderCollapsed = window.innerWidth < RESPONSIVE_WIDTH

const collapseBtn = document.getElementById("collapse-btn")
const collapseHeaderItems = document.getElementById("collapsed-header-items")

// Variabile per tracciare l'ultima larghezza e ignorare i resize verticali (address bar)
let lastWindowWidth = window.innerWidth;

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
        
        // Forza Z-Index altissimo e posizione fissa
        collapseHeaderItems.style.zIndex = "9999"
        collapseHeaderItems.style.position = "fixed"
        collapseHeaderItems.style.top = "0"
        collapseHeaderItems.style.left = "0"

        // Modifica pulsante in "X"
        collapseBtn.classList.remove("bi-list", "tw-relative")
        collapseBtn.classList.add("bi-x", "tw-fixed")
        
        // Stili inline per fissare il pulsante sopra il menu bianco
        collapseBtn.style.position = "fixed"
        collapseBtn.style.top = "24px" 
        collapseBtn.style.right = "5%"
        collapseBtn.style.zIndex = "10000" 

        isHeaderCollapsed = false
        document.body.style.overflow = "hidden" // Blocca scroll sotto

        setTimeout(() => window.addEventListener("click", onHeaderClickOutside), 100)
    } else {
        // CHIUSURA
        collapseHeaderItems.classList.remove("tw-w-full", "tw-opacity-100", "tw-pointer-events-auto")
        collapseHeaderItems.classList.add("tw-w-0", "tw-opacity-0", "tw-pointer-events-none")
        
        // Reset pulsante
        collapseBtn.classList.remove("bi-x", "tw-fixed")
        collapseBtn.classList.add("bi-list", "tw-relative")
        
        // Rimuovi stili inline
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
    // FIX: Ignora il resize se la larghezza non è cambiata (es. scroll address bar su mobile)
    if (window.innerWidth === lastWindowWidth) return;
    
    // Aggiorna l'ultima larghezza conosciuta
    lastWindowWidth = window.innerWidth;

    if (window.innerWidth > RESPONSIVE_WIDTH) {
        // Su desktop resetta tutto per mostrare il menu orizzontale
        collapseHeaderItems.style.width = ""
        collapseHeaderItems.classList.remove("tw-opacity-0", "tw-pointer-events-none", "tw-w-0")
        collapseHeaderItems.classList.add("tw-opacity-100", "tw-pointer-events-auto")
        
        // Pulisci eventuali stili inline rimasti
        collapseHeaderItems.style.position = ""
        collapseHeaderItems.style.zIndex = ""
        document.body.style.overflow = ""
    } else {
        // Su mobile, chiudiamo il menu SOLO se stiamo passando da Desktop a Mobile
        // Non forziamo la chiusura se siamo già su mobile (evita bug strani)
        if (!isHeaderCollapsed) {
             toggleHeader(); // Usa la funzione toggle per chiudere pulito
        }
    }
}

window.addEventListener("resize", responsive)


/**
 * Animations
 */

gsap.registerPlugin(ScrollTrigger)

// Animazione iniziale degli elementi reveal-up
gsap.set(".reveal-up", {
    opacity: 0,
    y: 50,
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

// FAQ Accordion Logic (Gestita qui, rimuovi script dall'HTML)
const faqButtons = document.querySelectorAll('.faq-btn')

faqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const content = btn.nextElementSibling;
        const icon = btn.querySelector('i');
        
        // Se è nascosto, mostralo
        if (content.classList.contains('tw-hidden')) {
            // Chiudi tutti gli altri prima
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
    const revealItems = sec.querySelectorAll(".reveal-up");
    
    if(revealItems.length > 0) {
        gsap.to(revealItems, {
            scrollTrigger: {
                trigger: sec,
                start: "top 80%", 
                end: "bottom 90%",
            },
            opacity: 1,
            duration: 0.8,
            y: 0,
            stagger: 0.2,
            ease: "power2.out"
        })
    }
})
