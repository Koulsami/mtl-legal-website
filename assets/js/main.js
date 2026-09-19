/* MTL Legal LLP — site behaviour */
(function () {
  "use strict";

  /* ---------------------------------------------- mobile navigation */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------------------------------------------- header on scroll */
  var header = document.querySelector(".site-header");
  var transparentAtTop = header && header.dataset.transparent === "true";

  function onScroll() {
    if (!header) return;
    var scrolled = window.scrollY > 40;
    header.classList.toggle("site-header--scrolled", scrolled);
    if (transparentAtTop) {
      header.classList.toggle("site-header--transparent", !scrolled);
    }
  }

  if (transparentAtTop) header.classList.add("site-header--transparent");
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------------------------------------------- reveal on scroll */
  var revealables = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealables.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var delay = parseInt(el.dataset.delay || "0", 10);
          setTimeout(function () {
            el.classList.add("is-visible");
          }, delay);
          io.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    revealables.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealables.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---------------------------------------------- current year */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------------------------------------------- Bar Council disclaimer */
  var modal = document.getElementById("disclaimer");

  if (modal) {
    var accepted = false;
    try {
      accepted = window.sessionStorage.getItem("mtl-disclaimer") === "1";
    } catch (err) {
      accepted = false;
    }

    if (!accepted) {
      modal.hidden = false;
      document.documentElement.style.overflow = "hidden";
      var agree = modal.querySelector("[data-agree]");
      if (agree) agree.focus();
    }

    modal.addEventListener("click", function (e) {
      if (e.target.hasAttribute("data-agree")) {
        modal.hidden = true;
        document.documentElement.style.overflow = "";
        try {
          window.sessionStorage.setItem("mtl-disclaimer", "1");
        } catch (err) {
          /* storage unavailable — no persistence, modal reappears next load */
        }
      }
    });
  }

})();
