document.addEventListener("DOMContentLoaded", () => {

const links = document.querySelectorAll(".nav-link");

links.forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add("active");
  }
});

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

  // DARK MODE
const toggle = document.getElementById("theme-toggle");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

  // SCROLL ANIMATION
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible","active");
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));

  const reveals = document.querySelectorAll(".reveal");

reveals.forEach(el => observer.observe(el));

  // PROJECT FILTERING
  const buttons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".project-card");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {

      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      cards.forEach(card => {
        card.style.display =
          filter === "all" || card.dataset.category === filter
            ? "block"
            : "none";
      });

    });
  });

  // MODALS
  const modal = document.getElementById("project-modal");
  const iframe = document.getElementById("project-frame");
  const closeBtn = document.querySelector(".close-modal");
  const externalLink = document.getElementById("external-link");

  if (modal && iframe && closeBtn && externalLink) {

    document.querySelectorAll(".project-link").forEach(button => {
      button.addEventListener("click", () => {
        const url = button.dataset.url;

        if (!url) return;

        iframe.src = url;
        externalLink.href = url;

        modal.classList.add("show");
        modal.classList.remove("hidden");
        modal.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden"; // prevents background scroll
      });
    });

    function closeModal() {
      modal.classList.remove("show");
      modal.classList.add("hidden");
      iframe.src = "";
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    closeBtn.addEventListener("click", closeModal);

    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });
  }

  function openModal(url) {
    iframe.src = url;
    externalLink.href = url;

    modal.classList.add("show");
    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("show");

    setTimeout(() => {
      modal.classList.add("hidden");
      iframe.src = "";
    }, 200);

    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  const form = document.getElementById("contact-form");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const button = form.querySelector("button");

      button.textContent = "Sending...";

      setTimeout(() => {
        button.textContent = "Message Sent ✓";

        showToast("Thanks! I’ll get back to you soon.");

        form.reset();

        setTimeout(() => {
          button.textContent = "Send Message";
        }, 2000);

      }, 800);
    });
  }

  /* simple toast message (non-intrusive) */
  function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 50);

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }
  });