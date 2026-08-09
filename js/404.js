const themeToggle = document.querySelector(".theme-toggle");
const themeColorMeta = document.querySelector('meta[name="theme-color"]');
const faviconLinks = {
  apple: document.querySelector("#apple-touch-icon"),
  ico: document.querySelector("#favicon-ico"),
  icon32: document.querySelector("#favicon-32"),
  icon16: document.querySelector("#favicon-16"),
};

const setTheme = (theme) => {
  document.documentElement.dataset.theme = theme;
  themeColorMeta.setAttribute(
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
};

let savedTheme = "dark";

try {
  savedTheme = localStorage.getItem("theme") || "dark";
} catch {}

setTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  const nextTheme =
    document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  setTheme(nextTheme);
});
