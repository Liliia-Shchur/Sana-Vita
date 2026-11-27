(function () {
  "use strict";

  /* ---------- Mobile menu ---------- */
  var burger = document.querySelector(".burger");
  var nav = document.getElementById("nav");
  if (burger && nav) {
    burger.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "Закрити меню" : "Відкрити меню");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        nav.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Card sliders (reviews, doctors, diseases) ---------- */
  document.querySelectorAll(".slider-controls[data-slider]").forEach(function (controls) {
    var track = document.getElementById(controls.getAttribute("data-slider"));
    if (!track) return;
    var buttons = controls.querySelectorAll("[data-dir]");

    function step() {
      var card = track.firstElementChild;
      if (!card) return track.clientWidth;
      var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      return card.getBoundingClientRect().width + gap;
    }

    function update() {
      var max = track.scrollWidth - track.clientWidth - 2;
      buttons.forEach(function (btn) {
        var dir = Number(btn.getAttribute("data-dir"));
        btn.disabled = dir < 0 ? track.scrollLeft <= 2 : track.scrollLeft >= max;
      });
    }

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        track.scrollBy({ left: Number(btn.getAttribute("data-dir")) * step(), behavior: "smooth" });
      });
    });
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  });

  /* ---------- Appointment form ---------- */
  var form = document.getElementById("appointment-form");
  if (form) {
    var status = form.querySelector(".form__status");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      ["name", "phone"].forEach(function (n) {
        var input = form.elements[n];
        var valid = input.checkValidity();
        input.classList.toggle("is-invalid", !valid);
        if (!valid) ok = false;
      });
      var consent = form.elements.consent;
      consent.closest(".consent").classList.toggle("is-invalid", !consent.checked);
      if (!consent.checked) ok = false;

      status.classList.remove("is-success", "is-error");
      if (!ok) {
        status.textContent = "Будь ласка, заповніть обовʼязкові поля та погодьтеся з умовами.";
        status.classList.add("is-error");
        return;
      }
      // TODO: send to the clinic's booking backend / CRM.
      status.textContent = "Дякуємо! Адміністратор звʼяжеться з вами найближчим часом.";
      status.classList.add("is-success");
      form.reset();
    });
  }
})();
