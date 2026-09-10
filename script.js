/* =========================================================
   MaNà — CONFIGURAZIONE
   Modifica qui i dati del locale.
   ========================================================= */

const CONFIG = {
  businessName: "MaNà",
  phoneNumber: "3286746005",                 // Esempio: "3751477777"
  whatsappNumber: "3751477777",              // INSERISCI IL NUMERO WHATSAPP, diverso dal telefono
  reservationUrl: "https://man.plateform.app/welcome",
  address: "Via Borgo Giannotti, 435, 55100 Lucca LU",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=MaN%C3%A0%2C%20Via%20Borgo%20Giannotti%20435%2C%2055100%20Lucca",
  mapsEmbed: "https://www.google.com/maps?q=Via%20Borgo%20Giannotti%20435%2C%2055100%20Lucca&output=embed",
  instagramUrl: "",
  facebookUrl: "",
  tiktokUrl: ""
};

/* Telefono ricavato dalle informazioni fornite.
   Puoi lasciarlo così oppure sostituirlo con quello definitivo. */
CONFIG.phoneNumber = "3286746005";

document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const header = document.getElementById("header");
  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobileNav");

  setTimeout(() => loader?.classList.add("hidden"), 450);

  // Header on scroll
  const onScroll = () => header?.classList.toggle("scrolled", window.scrollY > 30);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile menu
  hamburger?.addEventListener("click", () => {
    const open = mobileNav.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("lock", open);
  });

  mobileNav?.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      mobileNav.classList.remove("open");
      hamburger?.setAttribute("aria-expanded", "false");
      document.body.classList.remove("lock");
    });
  });

  // Reservation links
  document.querySelectorAll("[data-reservation]").forEach(link => {
    link.href = CONFIG.reservationUrl;
    link.target = "_blank";
    link.rel = "noopener";
  });

  // Contact
  const phoneDigits = CONFIG.phoneNumber.replace(/\D/g, "");
  const waDigits = CONFIG.whatsappNumber.replace(/\D/g, "");

  const phoneHref = phoneDigits ? `tel:${phoneDigits}` : "#";
  const whatsappHref = waDigits ? `https://wa.me/${waDigits}` : "#";

  const phoneElements = [
    document.getElementById("phoneLink"),
    document.getElementById("callButton"),
    document.getElementById("mobileCall")
  ];
  phoneElements.forEach(el => { if (el) el.href = phoneHref; });

  const phoneText = document.getElementById("phoneText");
  if (phoneText) phoneText.textContent = CONFIG.phoneNumber || "3286746005";

  const waElements = [
    document.getElementById("whatsappLink"),
    document.getElementById("whatsappButton"),
    document.getElementById("mobileWhatsapp"),
    document.getElementById("floatingWhatsapp")
  ];
  waElements.forEach(el => {
    if (el) {
      el.href = whatsappHref;
      if (!waDigits) el.addEventListener("click", e => {
        e.preventDefault();
        alert("3751477777");
      });
    }
  });

  const waText = document.getElementById("whatsappText");
  if (waText) waText.textContent = CONFIG.whatsappNumber || "3751477777";

  // Maps
  const mapsLink = document.getElementById("mapsLink");
  const mapsFrame = document.getElementById("mapsFrame");
  if (mapsLink) mapsLink.href = CONFIG.mapsUrl;
  if (mapsFrame) mapsFrame.src = CONFIG.mapsEmbed;

  // Socials
  const socials = [
    ["instagramLink", CONFIG.instagramUrl],
    ["facebookLink", CONFIG.facebookUrl],
    ["tiktokLink", CONFIG.tiktokUrl]
  ];
  socials.forEach(([id, url]) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (url) el.href = url;
    else {
      el.href = "#";
      el.addEventListener("click", e => {
        e.preventDefault();
        alert("Inserisci il link del social nella sezione CONFIG di script.js.");
      });
    }
  });

  // Scroll reveal
  const revealItems = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(el => observer.observe(el));

  // Gallery lightbox
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxClose = document.getElementById("lightboxClose");

  document.querySelectorAll("[data-image]").forEach(item => {
    item.addEventListener("click", () => {
      const file = item.dataset.image;
      lightboxImage.src = `images/${file}`;
      lightboxImage.alt = item.querySelector("img")?.alt || "Foto MaNà";
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("lock");
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
    document.body.classList.remove("lock");
  };

  lightboxClose?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", e => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeLightbox();
  });
});

/* =========================================================
   EVENTI
   Per aggiungere eventi, puoi sostituire il contenuto
   di #eventsContainer con card HTML come questa:

   <article class="event-card">
     <img src="images/evento-01.jpeg" alt="Nome evento">
     <div>
       <p class="event-date">25 SETTEMBRE · 21:30</p>
       <h3>DJ SET</h3>
       <p>Descrizione dell'evento.</p>
       <a class="button dark" href="#" data-reservation>PRENOTA</a>
     </div>
   </article>
   ========================================================= */

/* V2 — horizontal gallery controls */
document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("galleryScroll");
  const left = document.querySelector(".gallery-arrow.left");
  const right = document.querySelector(".gallery-arrow.right");
  if (!gallery) return;
  const distance = () => Math.min(gallery.clientWidth * 0.72, 720) + 18;
  left?.addEventListener("click", () => gallery.scrollBy({left: -distance(), behavior:"smooth"}));
  right?.addEventListener("click", () => gallery.scrollBy({left: distance(), behavior:"smooth"}));
});
