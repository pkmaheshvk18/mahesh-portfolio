/* ========================= TYPING EFFECT (SMOOTH) ========================= */
const roles = ["DevOps Engineer", "AWS Specialist", "Kubernetes Expert", "Azure DevOps Engineer"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const element = document.getElementById("typing");
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

/* ========================= SCROLL REVEAL (STAGGER) ========================= */
const revealElements = document.querySelectorAll("section, .card");

function revealOnScroll() {
  const triggerBottom = window.innerHeight - 80;

  revealElements.forEach((el, index) => {
    const boxTop = el.getBoundingClientRect().top;

    if (boxTop < triggerBottom) {
      setTimeout(() => {
        el.classList.add("visible");
      }, index * 120); // 🔥 stagger delay
    }
  });
}

window.addEventListener("scroll", revealOnScroll);

/* ========================= STATS COUNTER ANIMATION ========================= */
const counters = document.querySelectorAll(".stat h2");
let started = false;

function runCounter() {
  if (started) return;

  counters.forEach(counter => {
    const target = parseInt(counter.innerText);
    let count = 0;

    const update = () => {
      count += Math.ceil(target / 40);

      if (count < target) {
        counter.innerText =
          count + (counter.innerText.includes('%') ? '%' : '+');
        requestAnimationFrame(update);
      } else {
        counter.innerText =
          target + (counter.innerText.includes('%') ? '%' : '+');
      }
    };

    update();
  });

  started = true;
}

window.addEventListener("scroll", () => {
  const stats = document.querySelector(".stats");
  if (!stats) return;

  const top = stats.getBoundingClientRect().top;

  if (top < window.innerHeight - 100) {
    runCounter();
  }
});

/* ========================= ACTIVE NAV LINK ========================= */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;

    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

/* ========================= SMOOTH SCROLL ========================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

/* ========================= SCROLL PERFORMANCE BOOST ========================= */
let ticking = false;

function optimizedScroll() {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      revealOnScroll();
      ticking = false;
    });

    ticking = true;
  }
}

window.addEventListener("scroll", optimizedScroll);

/* ========================= INITIAL LOAD ANIMATION ========================= */
window.addEventListener("load", () => {
  revealOnScroll();
});
