import { projects } from "../data/projects.js";
import { initTerminal } from "./terminal.js";

const grid = document.querySelector("#projects-grid");
const modal = document.querySelector("#project-modal");
const modalContent = document.querySelector("#modal-content");
const themeToggle = document.querySelector(".theme-toggle");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const scrollProgress = document.querySelector(".scroll-progress");
const themeColorMeta = document.querySelector('meta[name="theme-color"]');
const faviconLinks = {
  apple: document.querySelector("#apple-touch-icon"),
  ico: document.querySelector("#favicon-ico"),
  icon32: document.querySelector("#favicon-32"),
  icon16: document.querySelector("#favicon-16"),
};

let lastTrigger;
const projectsForDisplay = [...projects].sort(
  (firstProject, secondProject) =>
    Number(secondProject.id === "portfolio") -
    Number(firstProject.id === "portfolio"),
);

const tutorialAttribution = (project, className = "project-tutorial") => {
  if (!project.tutorialBased) return "";

  const creator = project.tutorialCreator
    ? project.tutorialUrl
      ? ` <a href="${project.tutorialUrl}" target="_blank" rel="noreferrer">${project.tutorialCreator}</a>`
      : ` ${project.tutorialCreator}`
    : "";

  return `<p class="${className}">Tutorial-based${creator ? ` &middot; Based on tutorial by${creator}` : ""}</p>`;
};

const projectCardActions = (project) => {
  const actions = [];

  if (project.demo) {
    actions.push(
      `<a href="${project.demo}" target="_blank" rel="noreferrer">Live Preview <i class="ri-arrow-right-up-line" aria-hidden="true"></i></a>`,
    );
  }

  if (project.github) {
    actions.push(
      `<a href="${project.github}" target="_blank" rel="noreferrer">GitHub <i class="ri-arrow-right-up-line" aria-hidden="true"></i></a>`,
    );
  }

  return actions.join("");
};

const renderProjects = () => {
  grid.innerHTML = projectsForDisplay
    .map(
      (project, index) => `
        <article class="project-card project-card--${project.accent} ${project.id === "portfolio" ? "project-card--featured" : ""}">
          <div class="project-art project-art--image" aria-hidden="true">
            <img src="${project.image}" alt="" width="1280" height="720" loading="lazy" />
          </div>

          <div class="project-card-body">
            <p class="project-status project-status--${project.statusTone}">
              <span aria-hidden="true"></span>${project.status}
            </p>
            <p class="project-type">${project.type}</p>
            <h3>${project.shortTitle || project.title}</h3>
            <p class="project-card__description">${project.description}</p>
            ${tutorialAttribution(project)}

            <div class="project-meta">
              <ul>
                ${project.tech.map((item) => `<li>${item}</li>`).join("")}
              </ul>

              <div class="project-card__actions">
                ${projectCardActions(project)}
                <button
                  class="card-link"
                  type="button"
                  data-project="${project.id}"
                  aria-label="Read more about ${project.title}"
                >
                  Read more
                </button>
              </div>
            </div>
          </div>
        </article>
      `,
    )
    .join("");
};

const openProject = (project, trigger) => {
  lastTrigger = trigger;
  const demoAction = !project.demo
    ? ""
    : `<a class="button button-primary" href="${project.demo}" target="_blank" rel="noreferrer">
          Live demo
          <i class="ri-arrow-right-up-line" aria-hidden="true"></i>
        </a>`;
  const projectMetadata = [
    project.year && `Year ${project.year}`,
    project.category?.replace(/-/g, " "),
    project.client,
    project.role,
    project.featured && "Featured project",
  ].filter(Boolean);
  const renderTextSection = (heading, content) =>
    content
      ? `<section class="case-study-section"><h3>${heading}</h3><p>${content}</p></section>`
      : "";
  const renderListSection = (heading, items, className = "") =>
    items?.length
      ? `<section class="case-study-section ${className}"><h3>${heading}</h3><ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul></section>`
      : "";
  const recreationSection = project.recreation
    ? `<aside class="case-study-disclaimer"><i class="ri-information-line" aria-hidden="true"></i><div><strong>Educational recreation${project.originalSite ? ` of ${project.originalSite}` : ""}</strong><p>${project.disclaimer || "This project was created for educational purposes."}</p></div></aside>`
    : "";

  modalContent.innerHTML = `
    <p class="eyebrow">Project details / ${project.type}</p>
    <p class="project-status project-status--${project.statusTone}">
      <span aria-hidden="true"></span>${project.status}
    </p>
    <h2 id="modal-title">${project.title}</h2>
    ${projectMetadata.length ? `<ul class="case-study-meta">${projectMetadata.map((item) => `<li>${item}</li>`).join("")}</ul>` : ""}

    <div class="modal-hero modal-hero--${project.accent}">
      <img src="${project.image}" alt="${project.title} project preview" />
    </div>

    ${project.updated ? `<p class="project-updated"><i class="ri-time-line" aria-hidden="true"></i> Last updated &middot; ${project.updated}</p>` : ""}

    ${tutorialAttribution(project, "case-study-tutorial")}

    ${recreationSection}
    <div class="case-study-grid">
      ${renderTextSection("Overview", project.overview)}
      ${renderTextSection("Why I built it", project.motivation)}
      ${renderListSection("Goals", project.goals)}
      ${renderListSection("Key features", project.features)}
      ${renderTextSection("Challenge", project.challenge)}
      ${renderTextSection("Solution", project.solution)}
      ${renderTextSection("What I learned", project.lessons)}
      ${renderListSection("Key takeaways", project.takeaways)}
      ${renderListSection("Focus areas", project.focusAreas, "case-study-section--tags")}
      ${renderListSection("SEO", project.seo)}
      ${renderListSection("Accessibility", project.accessibility)}
      ${renderListSection("Architecture", project.architecture)}
    </div>

    <div class="modal-actions">
      ${demoAction}
      <a class="button button-secondary" href="${project.github}" target="_blank" rel="noreferrer">
        GitHub
        <i class="ri-arrow-right-up-line" aria-hidden="true"></i>
      </a>
    </div>
  `;

  modal.showModal();
  document.body.classList.add("modal-open");

  window.requestAnimationFrame(() => modal.classList.add("is-visible"));
  modal.querySelector(".modal-close").focus();
};

const closeModal = () => {
  if (!modal.open || modal.classList.contains("is-closing")) return;

  modal.classList.add("is-closing");
  modal.classList.remove("is-visible");
  window.setTimeout(() => modal.close(), 220);
};

renderProjects();
document.querySelector("#project-count").textContent = String(
  projects.length,
).padStart(2, "0");

grid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-project]");

  if (!button) return;

  const project = projects.find((item) => item.id === button.dataset.project);
  openProject(project, button);
});

modal.querySelector(".modal-close").addEventListener("click", closeModal);
modal.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});
modal.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeModal();
});
modal.addEventListener("close", () => {
  modal.classList.remove("is-closing", "is-visible");
  document.body.classList.remove("modal-open");
  lastTrigger?.focus();
});

const setTheme = (theme, shouldAnimate = false) => {
  if (shouldAnimate) {
    document.documentElement.classList.add("is-theme-transitioning");
  }

  document.documentElement.dataset.theme = theme;
  themeColorMeta?.setAttribute(
    "content",
    getComputedStyle(document.documentElement).getPropertyValue("--bg").trim(),
  );
  try {
    localStorage.setItem("theme", theme);
  } catch {}

  const faviconTheme = theme === "dark" ? "dark" : "light";
  faviconLinks.apple.href = `favicon/apple-touch-icon-${faviconTheme}.png`;
  faviconLinks.ico.href = `favicon/favicon-${faviconTheme}.ico`;
  faviconLinks.icon32.href = `favicon/favicon-32x32-${faviconTheme}.png`;
  faviconLinks.icon16.href = `favicon/favicon-16x16-${faviconTheme}.png`;

  const nextTheme = theme === "dark" ? "light" : "dark";
  themeToggle.setAttribute("aria-label", `Switch to ${nextTheme} theme`);
  themeToggle.innerHTML = `<i class="ri-${theme === "dark" ? "sun" : "moon"}-line" aria-hidden="true"></i>`;

  if (shouldAnimate) {
    window.setTimeout(() => {
      document.documentElement.classList.remove("is-theme-transitioning");
    }, 220);
  }
};

let savedTheme = "dark";
try {
  savedTheme = localStorage.getItem("theme") || "dark";
} catch {}
setTheme(savedTheme);
themeToggle.addEventListener("click", () => {
  const nextTheme =
    document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  setTheme(nextTheme, true);
});

initTerminal({ setTheme });

const closeMenu = ({ restoreFocus = false } = {}) => {
  nav.classList.remove("is-open");
  menuToggle.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  if (restoreFocus) menuToggle.focus();
};

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");

  menuToggle.classList.toggle("is-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  if (isOpen)
    window.requestAnimationFrame(() => nav.querySelector("a")?.focus());
  else menuToggle.focus();
});

nav.addEventListener("click", () => {
  closeMenu();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && nav.classList.contains("is-open")) {
    closeMenu({ restoreFocus: true });
  }
});

const sectionLinks = [...nav.querySelectorAll('a[href^="#"]')];
const sections = sectionLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const updateActiveLink = (sectionId) => {
  sectionLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${sectionId}`;

    link.classList.toggle("is-active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
};

const updateNavFromScroll = () => {
  const activeSection = [...sections]
    .reverse()
    .find((section) => section.getBoundingClientRect().top <= 120);

  updateActiveLink(activeSection?.id);
};

const updateScrollProgress = () => {
  const totalScrollableDistance =
    document.documentElement.scrollHeight - window.innerHeight;
  const progress =
    totalScrollableDistance > 0 ? window.scrollY / totalScrollableDistance : 0;

  scrollProgress.style.transform = `scaleY(${Math.min(Math.max(progress, 0), 1)})`;
};

const updateScrollEffects = () => {
  updateNavFromScroll();
  updateScrollProgress();
};

window.addEventListener("scroll", updateScrollEffects, { passive: true });
window.addEventListener("resize", updateScrollProgress);
updateNavFromScroll();
updateScrollProgress();

document.querySelector("#year").textContent = new Date().getFullYear();

document
  .querySelector("#contact-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const status = document.querySelector("#form-status");
    const submitButton = form.querySelector('button[type="submit"]');

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    submitButton.disabled = true;
    submitButton.innerHTML =
      'Sending <i class="ri-loader-4-line" aria-hidden="true"></i>';
    status.textContent = "Sending your message...";

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      const result = await response.json();

      if (!response.ok || !result.success) throw new Error(result.message);

      form.reset();
      status.textContent = "Thanks — your message has been sent.";
    } catch (error) {
      status.textContent =
        "Sorry, something went wrong. Please try again or email me directly.";
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML =
        'Send message <i class="ri-arrow-right-line" aria-hidden="true"></i>';
    }
  });
