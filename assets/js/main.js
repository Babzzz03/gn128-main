/* =============================================================
   GN128 Solutions — landing page interactions
   Vanilla JS, progressive enhancement. Loaded with `defer`.
   ============================================================= */
(function () {
    "use strict";

    /* Mobile navigation is handled by menu.js (Osmo-style wipe overlay). */

    /* ---- Sticky header shadow on scroll ---- */
    const header = document.getElementById("site-header");
    if (header) {
        const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
    }

    /* ---- Scroll-reveal animations ---- */
    const revealEls = document.querySelectorAll("[data-reveal]");
    if ("IntersectionObserver" in window && revealEls.length) {
        const io = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
        );
        revealEls.forEach((el) => io.observe(el));
    } else {
        // Fallback: show everything if IO isn't supported
        revealEls.forEach((el) => el.classList.add("is-visible"));
    }

    /* ---- Current year in footer ---- */
    const year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();

    /* ---- Live date/time in the contact hero ---- */
    const dt = document.getElementById("hero-datetime");
    if (dt) {
        const render = () => {
            const now = new Date();
            const date = now.toLocaleDateString("en-US", {
                weekday: "long", month: "long", day: "numeric", year: "numeric"
            });
            const time = now.toLocaleTimeString("en-US", {
                hour: "numeric", minute: "2-digit"
            });
            dt.textContent = `${date}  /  ${time}`;
        };
        render();
        setInterval(render, 30000);
    }

    /* ---- Marquee: duplicate cards for a seamless infinite loop ---- */
    const tracks = document.querySelectorAll(".marquee__track");
    tracks.forEach((track) => {
        const clone = track.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        // Move clones into the same track so the 0 -> -50% animation loops seamlessly
        Array.from(clone.children).forEach((child) => {
            child.setAttribute("aria-hidden", "true");
            track.appendChild(child);
        });
    });

    /* ---- Project category filters ---- */
    const filters = document.querySelectorAll("[data-filter]");
    const projects = document.querySelectorAll("[data-category]");
    if (filters.length && projects.length) {
        filters.forEach((btn) => {
            btn.addEventListener("click", () => {
                const cat = btn.getAttribute("data-filter");
                filters.forEach((b) => b.classList.toggle("is-active", b === btn));
                projects.forEach((card) => {
                    const cats = (card.getAttribute("data-category") || "").split(" ");
                    card.hidden = cat !== "all" && !cats.includes(cat);
                });
            });
        });
    }

    /* ---- Contact form (client-side confirmation) ---- */
    const form = document.getElementById("contact-form");
    if (form) {
        const status = form.querySelector(".form-status");
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }
            const name = (form.querySelector("#full-name")?.value || "there").split(" ")[0];
            if (status) {
                status.classList.remove("is-error");
                status.textContent = `Thanks, ${name}! Your message has been sent — we'll be in touch shortly.`;
            }
            form.reset();
        });
    }
})();
