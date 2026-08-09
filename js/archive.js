import {
  archiveCategories,
  archiveProjects,
} from "../data/archive-projects.js";
import { initTerminal } from "./terminal.js";

const themeToggle = document.querySelector(".theme-toggle");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const scrollProgress = document.querySelector(".scroll-progress");
const themeColorMeta = document.querySelector('meta[name="theme-color"]');
const filters = document.querySelector("#archive-filters");
const archiveContent = document.querySelector("#archive-content");
const filterStatus = document.querySelector("#archive-filter-status");
const faviconLinks = {
  apple: document.querySelector("#apple-touch-icon"),
  ico: document.querySelector("#favicon-ico"),
  icon32: document.querySelector("#favicon-32"),
  icon16: document.querySelector("#favicon-16"),
};

let activeCategory = "all";

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const setTheme = (theme, shouldAnimate = false) => {
  if (shouldAnimate)
    document.documentElement.classList.add("is-theme-transitioning");

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
  themeToggle.setAttribute(
    "aria-label",
    `Switch to ${theme === "dark" ? "light" : "dark"} theme`,
  );
  themeToggle.innerHTML = `<i class="ri-${theme === "dark" ? "sun" : "moon"}-line" aria-hidden="true"></i>`;

  if (shouldAnimate) {
    window.setTimeout(
      () => document.documentElement.classList.remove("is-theme-transitioning"),
      220,
    );
  }
};

const projectMedia = (project) => {
  if (project.image) {
    return `<div class="archive-card__media"><img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title)} screenshot" width="1672" height="936" loading="lazy"></div>`;
  }

  return `<div class="archive-card__media" aria-hidden="true"><span class="archive-card__placeholder">Preview unavailable</span></div>`;
};

const projectActions = (project) => {
  const actions = [];

  if (project.demo) {
    actions.push(
      `<a href="${escapeHtml(project.demo)}" target="_blank" rel="noreferrer">Live Preview <i class="ri-arrow-right-up-line" aria-hidden="true"></i></a>`,
    );
  }
  if (project.source) {
    actions.push(
      `<a href="${escapeHtml(project.source)}" target="_blank" rel="noreferrer">GitHub <i class="ri-arrow-right-up-line" aria-hidden="true"></i></a>`,
    );
  }

  return actions.length
    ? `<div class="archive-card__actions">${actions.join("")}</div>`
    : "";
};

const compactActions = (project) => {
  const actions = [];

  if (project.demo) {
    actions.push(
      `<a href="${escapeHtml(project.demo)}" target="_blank" rel="noreferrer">Live Preview <i class="ri-arrow-right-up-line" aria-hidden="true"></i></a>`,
    );
  }
  if (project.source) {
    actions.push(
      `<a href="${escapeHtml(project.source)}" target="_blank" rel="noreferrer">GitHub <i class="ri-arrow-right-up-line" aria-hidden="true"></i></a>`,
    );
  }

  return actions.length
    ? `<div class="archive-compact-actions">${actions.join("")}</div>`
    : "";
};

const compactTechnologies = (project) =>
  project.technologies.length
    ? `<ul class="archive-card__technologies archive-compact-technologies">${project.technologies.map((technology) => `<li>${escapeHtml(technology)}</li>`).join("")}</ul>`
    : "";

const projectCard = (project, { highlight = false } = {}) => {
  const technologyList = project.technologies.length
    ? `<ul class="archive-card__technologies">${project.technologies.map((technology) => `<li>${escapeHtml(technology)}</li>`).join("")}</ul>`
    : "";
  const tutorial = project.tutorialBased
    ? `<p class="archive-card__tutorial">Tutorial-based${project.tutorialCreator ? ` · Based on tutorial by ${project.tutorialUrl ? `<a href="${escapeHtml(project.tutorialUrl)}" target="_blank" rel="noreferrer">${escapeHtml(project.tutorialCreator)}</a>` : escapeHtml(project.tutorialCreator)}` : ""}</p>`
    : "";
  const metadata = [project.type, project.year]
    .filter(Boolean)
    .map((item) => `<span>${escapeHtml(item)}</span>`)
    .join("");

  return `<article class="archive-card${highlight ? " archive-card--highlight" : ""}">
    ${highlight ? projectMedia(project) : ""}
    <p class="archive-card__meta">${metadata}</p>
    <h3>${escapeHtml(project.title)}</h3>
    ${project.featuredOnHome ? '<p class="archive-card__tutorial">Featured project <i class="ri-arrow-right-up-line" aria-hidden="true"></i></p>' : ""}
    ${project.description ? `<p class="archive-card__description">${escapeHtml(project.description)}</p>` : ""}
    ${technologyList}
    ${tutorial}
    ${projectActions(project)}
  </article>`;
};

const sectionHeading = (title, count, description = "") =>
  `<div class="archive-section__heading"><h2>${title}</h2><p><span>${count}</span> project${count === 1 ? "" : "s"}</p></div>${description ? `<p class="archive-section__intro">${description}</p>` : ""}`;

const groupedSection = (title, projects, options = {}) => {
  if (!projects.length) return "";
  return `<section class="archive-section">${sectionHeading(title, projects.length, options.description)}<div class="archive-card-grid${options.highlights ? " archive-card-grid--highlights" : ""}">${projects.map((project) => projectCard(project, { highlight: options.highlights })).join("")}</div></section>`;
};

const originsSection = (projects) => {
  if (!projects.length) return "";
  return `<section class="archive-section">${sectionHeading("Where it started.", projects.length, "The two early websites that made building for the web feel possible.")}<p class="archive-section__intro archive-section__intro--notice">These projects were built very early in my web development journey, before I learned responsive design. They are best viewed on larger screens.</p><div class="archive-origin">${projects.map((project) => `<article class="archive-origin__card"><h3>${escapeHtml(project.title)}</h3>${project.description ? `<p>${escapeHtml(project.description)}</p>` : ""}${compactTechnologies(project)}${projectActions(project)}</article>`).join("")}</div></section>`;
};

const portfolioSection = (projects) => {
  const ordered = projects
    .filter((project) => Number.isFinite(project.portfolioOrder))
    .sort((first, second) => first.portfolioOrder - second.portfolioOrder);
  if (!ordered.length) return "";
  return `<section class="archive-section">${sectionHeading("Portfolio iterations", ordered.length, "A timeline of how my portfolio evolved alongside my frontend skills and design taste.")}<div class="portfolio-timeline">${ordered.map((project) => `<article class="portfolio-timeline__item"><h3>${escapeHtml(project.title)}</h3><p class="portfolio-timeline__type">${escapeHtml(project.type)}${project.featuredOnHome ? " &middot; Featured Project" : ""}</p>${project.description ? `<p class="portfolio-timeline__description">${escapeHtml(project.description)}</p>` : ""}${compactTechnologies(project)}${project.isCurrent ? '<span class="portfolio-timeline__current">You are here</span>' : ""}${compactActions(project)}</article>`).join("")}</div></section>`;
};

const componentSection = (projects) => {
  if (!projects.length) return "";
  return `<section class="archive-section">${sectionHeading("UI components", projects.length, "Small interface exercises focused on layout, interaction, and reusable UI patterns.")}<div class="archive-component-grid">${projects.map((project) => `<article class="archive-component"><h3>${escapeHtml(project.title)}</h3>${project.description ? `<p class="archive-component__description">${escapeHtml(project.description)}</p>` : ""}${compactTechnologies(project)}${compactActions(project)}</article>`).join("")}</div></section>`;
};

const motionSection = (projects) => {
  if (!projects.length) return "";
  return `<section class="archive-section">${sectionHeading("Motion Lab", projects.length, "Small CSS and DOM experiments with motion, interaction, and visual effects.")}<div class="motion-gallery">${projects.map((project) => `<article class="motion-card"><div class="motion-card__mark" aria-hidden="true"><i class="ri-sparkling-2-line"></i></div><h3>${escapeHtml(project.title)}</h3>${project.description ? `<p class="motion-card__description">${escapeHtml(project.description)}</p>` : ""}${compactTechnologies(project)}${compactActions(project)}</article>`).join("")}</div></section>`;
};

const renderAll = () => {
  const byCategory = (category) =>
    archiveProjects.filter((project) => project.category === category);
  const highlights = archiveProjects.filter((project) => project.highlight);

  archiveContent.innerHTML = [
    groupedSection("Archive highlights", highlights, {
      highlights: true,
      description:
        "A few projects that pushed me further in logic, interaction, or visual experimentation.",
    }),
    originsSection(archiveProjects.filter((project) => project.origin)),
    groupedSection("Apps & games", byCategory("app")),
    groupedSection("Recreations", byCategory("recreation"), {
      description:
        "Unofficial recreations made for learning and practice. They are not affiliated with the original brands.",
    }),
    groupedSection("Websites & landing pages", byCategory("website")),
    portfolioSection(byCategory("portfolio")),
    componentSection(byCategory("ui")),
    motionSection(byCategory("motion")),
  ].join("");
};

const renderFiltered = () => {
  const category = archiveCategories.find((item) => item.id === activeCategory);
  const projects = archiveProjects.filter(
    (project) => project.category === activeCategory,
  );
  archiveContent.innerHTML = `<section class="archive-section"><div class="archive-filtered-grid">${projects.map((project) => projectCard(project)).join("")}</div></section>`;
};

const renderArchive = () => {
  [...filters.children].forEach((button) =>
    button.setAttribute(
      "aria-pressed",
      String(button.dataset.category === activeCategory),
    ),
  );
  if (activeCategory === "all") renderAll();
  else renderFiltered();

  const category = archiveCategories.find((item) => item.id === activeCategory);
  const count =
    activeCategory === "all"
      ? archiveProjects.length
      : archiveProjects.filter((project) => project.category === activeCategory)
          .length;
  filterStatus.textContent = `${count} ${category?.label || "archive"} project${count === 1 ? "" : "s"} shown.`;
};

const renderFilters = () => {
  filters.innerHTML = archiveCategories
    .map(
      (category) =>
        `<button class="archive-filter" type="button" data-category="${category.id}" aria-pressed="${category.id === activeCategory}">${category.label}</button>`,
    )
    .join("");
};

filters.addEventListener("click", (event) => {
  const button = event.target.closest(".archive-filter");
  if (!button) return;
  activeCategory = button.dataset.category;
  renderArchive();
});

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

themeToggle.addEventListener("click", () =>
  setTheme(
    document.documentElement.dataset.theme === "dark" ? "light" : "dark",
    true,
  ),
);

initTerminal({ setTheme });

const updateScrollProgress = () => {
  const totalScrollableDistance =
    document.documentElement.scrollHeight - window.innerHeight;
  const progress =
    totalScrollableDistance > 0 ? window.scrollY / totalScrollableDistance : 0;
  scrollProgress.style.transform = `scaleY(${Math.min(Math.max(progress, 0), 1)})`;
};

let savedTheme = "dark";
try {
  savedTheme = localStorage.getItem("theme") || "dark";
} catch {}
setTheme(savedTheme);
document.querySelector("#year").textContent = new Date().getFullYear();
renderFilters();
renderArchive();
window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", updateScrollProgress);
updateScrollProgress();
