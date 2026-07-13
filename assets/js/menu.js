/* =============================================================
   GN128 Solutions — mobile overlay menu
   Side-wipe effect adapted from Osmo (https://osmo.supply/).
   Builds the menu DOM, loads GSAP on demand, and animates open/close.
   The panel slides fully off-screen so nothing is ever left peeking.
   ============================================================= */
(function () {
    "use strict";

    var LINKS = [
        { label: "Home", href: "index.html" },
        { label: "Services", href: "services.html" },
        { label: "Projects", href: "projects.html" },
        { label: "Contact Us", href: "contact.html" },
        { label: "FAQ", href: "faq.html" }
    ];
    var SOCIALS = [
        { label: "Instagram", href: "#" },
        { label: "LinkedIn", href: "#" },
        { label: "X / Twitter", href: "#" }
    ];

    // ---- Build the menu DOM and append to <body> ----
    var menu = document.createElement("div");
    menu.className = "site-menu";
    menu.setAttribute("data-nav", "closed");
    menu.setAttribute("aria-hidden", "true");
    menu.innerHTML =
        '<div class="site-menu__overlay" data-menu-toggle></div>' +
        '<nav class="site-menu__panel" aria-label="Mobile navigation">' +
            '<div class="site-menu__bg">' +
                '<div class="site-menu__bg-panel first"></div>' +
                '<div class="site-menu__bg-panel second"></div>' +
                '<div class="site-menu__bg-panel"></div>' +
            '</div>' +
            '<div class="site-menu__inner">' +
                '<ul class="site-menu__list">' +
                    LINKS.map(function (l, i) {
                        return '<li class="site-menu__item">' +
                            '<a href="' + l.href + '" class="site-menu__link">' +
                                '<span class="site-menu__heading">' + l.label + '</span>' +
                                '<span class="site-menu__eyebrow">0' + (i + 1) + '</span>' +
                                '<span class="site-menu__link-bg" aria-hidden="true"></span>' +
                            '</a></li>';
                    }).join("") +
                '</ul>' +
                '<div class="site-menu__details">' +
                    '<p class="site-menu__label" data-menu-fade>Socials</p>' +
                    '<div class="site-menu__socials">' +
                        SOCIALS.map(function (s) {
                            return '<a data-menu-fade href="' + s.href + '" class="site-menu__social">' + s.label + '</a>';
                        }).join("") +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</nav>';
    document.body.appendChild(menu);

    var toggleBtn = document.getElementById("nav-toggle");
    var toggles = [].slice.call(menu.querySelectorAll("[data-menu-toggle]"));
    if (toggleBtn) toggles.push(toggleBtn);

    var panel = menu.querySelector(".site-menu__panel");
    var overlay = menu.querySelector(".site-menu__overlay");
    var bgPanels = menu.querySelectorAll(".site-menu__bg-panel");
    var links = menu.querySelectorAll(".site-menu__link");
    var fades = menu.querySelectorAll("[data-menu-fade]");

    // ---- Load GSAP (shared loader from transition.js), then wire up ----
    function withGSAP(cb) {
        if (window.__loadGSAP) { window.__loadGSAP().then(function () { cb(); }); return; }
        if (window.gsap) return cb();
        var s = document.createElement("script");
        s.src = "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js";
        s.onload = function () {
            var c = document.createElement("script");
            c.src = "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/CustomEase.min.js";
            c.onload = cb;
            c.onerror = cb;
            document.head.appendChild(c);
        };
        s.onerror = function () { cb(); };
        document.head.appendChild(s);
    }

    withGSAP(function () {
        var hasGSAP = !!window.gsap;
        var tl;

        if (hasGSAP) {
            if (window.CustomEase) {
                try {
                    gsap.registerPlugin(CustomEase);
                    CustomEase.create("menuEase", "0.65, 0.01, 0.05, 0.99");
                } catch (e) { /* noop */ }
            }
            gsap.defaults({ ease: window.CustomEase ? "menuEase" : "power3.inOut", duration: 0.7 });
            gsap.set(menu, { display: "none" });
            tl = gsap.timeline();
        }

        function setState(open) {
            menu.setAttribute("data-nav", open ? "open" : "closed");
            menu.setAttribute("aria-hidden", open ? "false" : "true");
            if (toggleBtn) toggleBtn.setAttribute("aria-expanded", String(open));
            document.body.style.overflow = open ? "hidden" : "";
        }

        function openNav() {
            setState(true);
            if (!hasGSAP) { menu.style.display = "block"; return; }
            tl.clear()
                .set(menu, { display: "block" })
                .set(panel, { xPercent: 0 }, "<")
                .fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1 }, "<")
                .fromTo(bgPanels, { xPercent: 101 }, { xPercent: 0, stagger: 0.1, duration: 0.5 }, "<")
                .fromTo(links, { yPercent: 140, rotate: 8 }, { yPercent: 0, rotate: 0, stagger: 0.05 }, "<+=0.3")
                .fromTo(fades, { autoAlpha: 0, yPercent: 40 }, { autoAlpha: 1, yPercent: 0, stagger: 0.04 }, "<+=0.2");
        }

        function closeNav() {
            setState(false);
            if (!hasGSAP) { menu.style.display = "none"; return; }
            tl.clear()
                .to(overlay, { autoAlpha: 0 })
                .to(panel, { xPercent: 120 }, "<")
                .set(menu, { display: "none" });
        }

        toggles.forEach(function (t) {
            t.addEventListener("click", function () {
                if (menu.getAttribute("data-nav") === "open") closeNav();
                else openNav();
            });
        });

        // Close after choosing a destination
        links.forEach(function (l) {
            l.addEventListener("click", closeNav);
        });

        // Escape closes
        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape" && menu.getAttribute("data-nav") === "open") closeNav();
        });
    });
})();
