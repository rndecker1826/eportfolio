document.addEventListener("DOMContentLoaded", () => {

  // ===== PROJECT MODAL (Projects Page) =====
  const modal = document.getElementById("project-modal");
  const iframe = document.getElementById("project-frame");
  const closeBtn = document.querySelector(".close-modal");
  const externalLink = document.getElementById("external-link");

  if (modal && iframe && closeBtn && externalLink) {
    document.querySelectorAll(".project-link").forEach(button => {
      button.addEventListener("click", () => {
        const url = button.dataset.url;
        iframe.src = url;
        externalLink.href = url;
        modal.classList.remove("hidden");
        modal.classList.add("show");
        modal.setAttribute("aria-hidden", "false");
      });
    });

    closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", e => {
      if (e.target === modal) closeModal();
    });
  }

  function closeModal() {
    modal.classList.remove("show");
    modal.classList.add("hidden");
    iframe.src = "";
    modal.setAttribute("aria-hidden", "true");
  }

  // ===== ABOUT PAGE FUN FACT =====
  const revealBtn = document.getElementById("reveal-fact");
  const funFact = document.getElementById("fun-fact");

  if (revealBtn && funFact) {
    revealBtn.addEventListener("click", () => {
      if(funFact.style.display === "none") {
        funFact.style.display = "block";
        revealBtn.textContent = "Hide Fun Fact 🙈";
        launchConfetti();
      } else {
        funFact.style.display = "none";
        revealBtn.textContent = "Click to Reveal Fun Fact 🎉";
      }
    });
  }

  // ===== SKILL HOVER EFFECTS (About Page) =====
  const skills = document.querySelectorAll(".skill-card");
  skills.forEach(skill => {
    skill.addEventListener("mouseenter", () => {
      skill.style.transform = "scale(1.05)";
      skill.style.boxShadow = "0 8px 20px rgba(0,0,0,0.2)";
    });
    skill.addEventListener("mouseleave", () => {
      skill.style.transform = "scale(1)";
      skill.style.boxShadow = "none";
    });
  });

  // ===== IMAGE TOGGLE (About Page) =====
  const profileImg = document.getElementById("profile-img");
  if (profileImg) {
    profileImg.addEventListener("click", () => {
      if (profileImg.src.includes("profile.jpg")) {
        profileImg.src = "images/profile-casual.jpg";
        profileImg.alt = "Rebecca Decker casual photo";
      } else {
        profileImg.src = "images/profile.jpg";
        profileImg.alt = "Rebecca Decker professional photo";
      }
    });
  }

  // ===== FLOATING ICONS FUNCTION (Reusable) =====
  function floatIcons(icons, num = 20, speed = 2) {
    for (let i = 0; i < num; i++) {
      const iconEl = document.createElement('div');
      iconEl.classList.add('floating-icon');
      iconEl.textContent = icons[Math.floor(Math.random() * icons.length)];
      iconEl.style.left = Math.random() * 100 + 'vw';
      iconEl.style.fontSize = (Math.random() * 24 + 16) + 'px';
      iconEl.style.animationDuration = (Math.random() * speed + speed) + 's';
      iconEl.style.opacity = '0.8';
      document.body.appendChild(iconEl);
      iconEl.addEventListener('animationend', () => iconEl.remove());
    }
  }

  // ===== INDEX HERO BUTTON FLOATING ICONS =====
  const heroButtons = document.querySelectorAll('.home .hero-buttons a');
  heroButtons.forEach(btn => {
    if (btn.classList.contains('btn-primary')) {
      btn.addEventListener('mouseenter', () => floatIcons(['📁','💻','🖥️'], 20, 3));
    }
    if (btn.classList.contains('btn-secondary')) {
      btn.addEventListener('mouseenter', () => floatIcons(['✉️','📬','📩'], 20, 3));
    }
  });

  // ===== CONTACT FORM BUTTON HOVER FLOATING ICONS =====
  const submitBtn = document.querySelector('.contact-form button[type="submit"]');
  if (submitBtn) {
    submitBtn.addEventListener('mouseenter', () => floatIcons(['❓','🤔'], 10, 4));
  }

  // ===== CONTACT FORM SUBMISSION =====
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Launch confetti and balloons
      launchConfetti(80);
      launchBalloons(15);

      // Show popup
      showMessagePopup("Your message has been sent! 🎉");

      // Reset form
      contactForm.reset();
    });
  }

  // ===== MESSAGE POPUP =====
  function showMessagePopup(message) {
    const popup = document.createElement('div');
    popup.classList.add('message-popup');
    popup.textContent = message;
    document.body.appendChild(popup);

    setTimeout(() => popup.classList.add('show'), 10);
    setTimeout(() => {
      popup.classList.remove('show');
      setTimeout(() => popup.remove(), 500);
    }, 3000);
  }

  // ===== BALLOONS FUNCTION =====
  function launchBalloons(num = 10) {
    const colors = ['🎈','🎉'];
    for (let i = 0; i < num; i++) {
      const balloon = document.createElement('div');
      balloon.classList.add('floating-icon');
      balloon.textContent = colors[Math.floor(Math.random() * colors.length)];
      balloon.style.left = Math.random() * 100 + 'vw';
      balloon.style.fontSize = (Math.random() * 24 + 18) + 'px';
      balloon.style.animationDuration = (Math.random() * 3 + 3) + 's';
      document.body.appendChild(balloon);
      balloon.addEventListener('animationend', () => balloon.remove());
    }
  }

  // ===== RESUME BUTTON PULSE (Resume Page) =====
  const resumeBtn = document.querySelector('.btn-primary');
  if (resumeBtn) {
    resumeBtn.addEventListener('mouseenter', () => resumeBtn.style.transform = 'scale(1.05)');
    resumeBtn.addEventListener('mouseleave', () => resumeBtn.style.transform = 'scale(1)');
  }

  // ===== CONFETTI FUNCTION (Reusable) =====
  function launchConfetti(num = 100) {
    const colors = ['#FBC02D','#8E24AA','#2E7D32','#FF5722','#2196F3'];
    for (let i = 0; i < num; i++) {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti');
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
      confetti.style.width = confetti.style.height = Math.random() * 8 + 5 + 'px';
      document.body.appendChild(confetti);
      confetti.addEventListener('animationend', () => confetti.remove());
    }
  }

});