/* ============================================================
   ЕДИНЫЙ ФАЙЛ КОНТАКТОВ + UI-СКРИПТЫ
   Меняете контакты здесь — обновляется на всех страницах.
   ============================================================ */

const CONTACTS = {
  phone: "+79950055958",
  phoneDisplay: "+7 (995) 005-59-58",
  email: "vitaliyberyoza@yandex.ru",
  telegram: "https://t.me/S989809",
  telegramDisplay: "@S989809",
  hours: "Пн–Сб, 10:00–20:00, по записи",
  city: "Краснодар",
  brand: "Виталий Берёза",
  domain: "https://bereza-psy.ru"
};

const CONTACT_TEXT = {
  phone: CONTACTS.phoneDisplay,
  phoneDisplay: CONTACTS.phoneDisplay,
  email: CONTACTS.email,
  telegram: "Написать в Telegram",
  telegramDisplay: CONTACTS.telegramDisplay,
  hours: CONTACTS.hours,
  city: CONTACTS.city,
  brand: CONTACTS.brand
};

const CONTACT_HREF = {
  phone: "tel:" + CONTACTS.phone,
  phoneDisplay: "tel:" + CONTACTS.phone,
  email: "mailto:" + CONTACTS.email,
  telegram: CONTACTS.telegram
};

document.addEventListener("DOMContentLoaded", function () {

  /* --- Подстановка контактов --- */
  document.querySelectorAll("[data-contact]").forEach(function (el) {
    const key = el.getAttribute("data-contact");
    if (el.tagName === "A" && CONTACT_HREF[key]) {
      el.setAttribute("href", CONTACT_HREF[key]);
      if (key === "telegram") {
        el.setAttribute("target", "_blank");
        el.setAttribute("rel", "noopener");
      }
    }
    if (el.children.length === 0) {
      const custom = el.getAttribute("data-contact-text");
      el.textContent = custom || CONTACT_TEXT[key] || "";
    }
  });

  /* --- Год в футере --- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* --- Тень у шапки при скролле --- */
  const header = document.querySelector(".header");
  if (header) {
    const onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* --- Мобильное меню --- */
  const burger  = document.querySelector(".burger");
  const nav     = document.querySelector(".nav");
  const overlay = document.querySelector(".nav-overlay");

  if (burger && nav && overlay) {
    const toggleMenu = function () {
      const isOpen = nav.classList.toggle("nav--open");
      overlay.classList.toggle("is-active", isOpen);
      burger.classList.toggle("is-active", isOpen);
      burger.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.classList.toggle("no-scroll", isOpen);
    };
    burger.addEventListener("click", toggleMenu);
    overlay.addEventListener("click", toggleMenu);
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (nav.classList.contains("nav--open")) toggleMenu();
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("nav--open")) toggleMenu();
    });
  }

  /* --- Плавное появление блоков [data-reveal] --- */
  const reveals = document.querySelectorAll("[data-reveal]");
  if (reveals.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }
});