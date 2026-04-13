/* =========================
   TYPING EFFECT (SMOOTH)
========================= */
const roles = ["DevOps Engineer", "AWS Specialist", "Kubernetes Expert", "Azure DevOps Engineer"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const element = document.getElementById("typing");
  if (!element) return;

  const current = roles[roleIndex];

  if (!isDeleting) {
    element.textContent = current.substring(0, charIndex++);
    if (charIndex > current.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1500);
      return;
    }
  } else {
    element.textContent = current.substring(0, charIndex--);
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeEffect, isDeleting ? 40 : 70);
}
typeEffect();


/* =========================
   SCROLL REVEAL (OPTIMIZED)
========================= */
const revealElements = document.querySelectorAll("section, .card");

function revealOnScroll() {
  const triggerBottom = window.innerHeight - 80;

  revealElements.forEach((el, index) => {
    const boxTop = el.getBoundingClientRect().top;

    if (boxTop < triggerBottom) {
      el.classList.add("visible");
    }
  });
}


/* =========================
   STATS COUNTER
========================= */
const counters = document.querySelectorAll(".stat h2");
let counterStarted = false;

function runCounter() {
  if (counterStarted) return;

  counters.forEach(counter => {
    const original = counter.innerText;
    const target = parseInt(original);
    let count = 0;

    const suffix = original.includes('%') ? '%' : '+';

    const update = () => {
      count += Math.ceil(target / 40);
      if (count < target) {
        counter.innerText = count + suffix;
        requestAnimationFrame(update);
      } else {
        counter.innerText = target + suffix;
      }
    };

    update();
  });

  counterStarted = true;
}


/* =========================
   ACTIVE NAV LINK
========================= */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

function updateActiveNav() {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
}


/* =========================
   SMOOTH SCROLL
========================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});


/* =========================
   🔥 SINGLE OPTIMIZED SCROLL HANDLER
========================= */
let ticking = false;

function handleScroll() {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      revealOnScroll();
      updateActiveNav();

      const stats = document.querySelector(".stats");
      if (stats) {
        const top = stats.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
          runCounter();
        }
      }

      ticking = false;
    });

    ticking = true;
  }
}

window.addEventListener("scroll", handleScroll);


/* =========================
   INITIAL LOAD
========================= */
window.addEventListener("load", () => {
  revealOnScroll();
});
