/* =============================================================
   GN128 Solutions — landing page interactions
   Vanilla JS, progressive enhancement. Loaded with `defer`.
   ============================================================= */
(function () {
    "use strict";

    /* ---- Mobile navigation toggle ---- */
    const toggle = document.getElementById("nav-toggle");
    const nav = document.getElementById("primary-nav");

    if (toggle && nav) {
        const setOpen = (open) => {
            nav.classList.toggle("is-open", open);
            toggle.setAttribute("aria-expanded", String(open));
            document.body.style.overflow = open ? "hidden" : "";
        };

        toggle.addEventListener("click", () => {
            setOpen(toggle.getAttribute("aria-expanded") !== "true");
        });

        // Close the menu after tapping a link
        nav.addEventListener("click", (e) => {
            if (e.target.closest("a")) setOpen(false);
        });

        // Reset when resizing back to desktop
        window.addEventListener("resize", () => {
            if (window.innerWidth > 768) setOpen(false);
        });
    }

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
})();
