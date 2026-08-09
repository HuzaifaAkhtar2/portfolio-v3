const RESUME_URL = "docs/Muhammad_Huzaifa_Resume.pdf";
const SKILLS = [
  "HTML5",
  "CSS3",
  "JavaScript (ES6)",
  "Responsive Design",
  "Flexbox",
  "CSS Grid",
  "Semantic HTML",
  "Accessibility",
  "Git",
  "GitHub",
  "VS Code",
  "Chrome DevTools",
];

const isEditable = (element) =>
  element?.matches?.("input, textarea, select, [contenteditable]");

const createTerminal = () => {
  const terminal = document.createElement("dialog");
  terminal.className = "command-terminal";
  terminal.setAttribute("aria-labelledby", "command-terminal-title");
  terminal.innerHTML = `
    <div class="command-terminal__header">
      <p id="command-terminal-title" class="command-terminal__title">Command Interface</p>
      <button class="command-terminal__close" type="button" aria-label="Close command terminal"><i class="ri-close-line" aria-hidden="true"></i></button>
    </div>
    <div class="command-terminal__body">
      <div class="command-terminal__output" aria-live="polite"></div>
      <form class="command-terminal__form" novalidate>
        <span class="command-terminal__prompt" aria-hidden="true">$</span>
        <label class="sr-only" for="command-terminal-input">Enter a command</label>
        <input id="command-terminal-input" class="command-terminal__input" type="text" autocomplete="off" autocapitalize="none" spellcheck="false" />
      </form>
    </div>`;
  document.body.append(terminal);
  return terminal;
};

export const initTerminal = ({ setTheme }) => {
  const terminal = createTerminal();
  const output = terminal.querySelector(".command-terminal__output");
  const form = terminal.querySelector(".command-terminal__form");
  const input = terminal.querySelector(".command-terminal__input");
  const closeButton = terminal.querySelector(".command-terminal__close");
  const history = [];
  let historyIndex = 0;
  let lastTrigger = null;
  let secretEditModeEnabled = false;

  const scrollOutputToEnd = () => {
    output.scrollTop = output.scrollHeight;
  };

  const addEntry = (text, tone = "") => {
    const entry = document.createElement("p");
    entry.className = `terminal-entry${tone ? ` terminal-entry--${tone}` : ""}`;
    entry.textContent = text;
    output.append(entry);
    scrollOutputToEnd();
    return entry;
  };

  const addLink = (label, href) => {
    const entry = document.createElement("p");
    const link = document.createElement("a");
    entry.className = "terminal-entry";
    link.href = href;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = label;
    entry.append(link);
    output.append(entry);
    scrollOutputToEnd();
  };

  const addAchievements = () => {
    const entry = document.createElement("p");
    const incompleteIcon = document.createElement("i");
    const incompleteLabel = document.createElement("span");

    entry.className = "terminal-entry";
    incompleteIcon.className = "ri-checkbox-blank-line";
    incompleteIcon.setAttribute("aria-hidden", "true");
    incompleteLabel.className = "sr-only";
    incompleteLabel.textContent = "Not yet completed: ";

    entry.append(
      "ACHIEVEMENTS\n\n[✓] Built my first website\n[✓] Shipped real client work\n[✓] Experimented with Three.js\n[✓] Built Portfolio V3\n",
      incompleteLabel,
      incompleteIcon,
      " Carved something into the internet's memory.",
    );
    output.append(entry);
    scrollOutputToEnd();
  };

  const enableSecretEditMode = () => {
    const editableSelectors = [
      ".hero h1",
      ".hero-intro",
      ".hero-tagline",
      ".about-grid > div > p",
      ".enjoy-building p:not(.eyebrow)",
      ".project-card h3",
      ".project-card-body > p:not(.project-status):not(.project-type)",
      ".archive-hero h1",
      ".archive-heading h2",
      ".archive-section h2",
      ".archive-card h3",
      ".archive-origin h3",
      ".portfolio-timeline h3",
      ".archive-component h3",
      ".motion-card h3",
      ".archive-more h2",
      ".contact-section h2",
      ".site-footer .footer-copy p",
    ];

    document
      .querySelectorAll(editableSelectors.join(","))
      .forEach((element) => {
        element.contentEditable = "true";
        element.classList.add("is-secret-editable");
      });
    secretEditModeEnabled = true;
  };

  const disableSecretEditMode = () => {
    document.querySelectorAll(".is-secret-editable").forEach((element) => {
      element.removeAttribute("contenteditable");
      element.classList.remove("is-secret-editable");
    });
    secretEditModeEnabled = false;
  };

  const closeAndNavigate = (destination) => {
    closeTerminal();
    window.setTimeout(() => {
      const section = document.querySelector(destination);

      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.assign(`index.html${destination}`);
      }
    }, 220);
  };
  const commandGroups = [
    [
      "navigation",
      ["/home", "/projects", "/archive", "/about", "/contact", "/resume"],
    ],
    [
      "extras",
      ["/whoami", "/inventory", "/achievements", "/coffee", "/secret"],
    ],
    ["system", ["/theme", "/clear"]],
  ];
  const commands = new Map();
  const register = (name, handler) => commands.set(name, handler);

  register("/help", () => {
    const help = ["$ /help", ""];
    commandGroups.forEach(([group, names]) => {
      help.push(group, ...names.map((name) => `  ${name}`), "");
    });
    addEntry(help.join("\n"));
  });
  register("/home", () => closeAndNavigate("#home"));
  register("/projects", () => closeAndNavigate("#projects"));
  register("/archive", () => {
    closeTerminal();
    window.setTimeout(() => window.location.assign("archive.html"), 220);
  });
  register("/about", () => closeAndNavigate("#about"));
  register("/contact", () => closeAndNavigate("#contact"));
  register("/resume", () => {
    addEntry("Resume ready:");
    addLink("Open resume PDF ->", RESUME_URL);
  });
  register("/whoami", () =>
    addEntry(
      "Muhammad Huzaifa\nFrontend Developer\n\nI'll take what I've learned...\nand carve it into the internet's memory.",
    ),
  );
  register("/inventory", () => addEntry(`INVENTORY\n\n${SKILLS.join("\n")}`));
  register("/achievements", addAchievements);
  register("/coffee", () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      addEntry("Coffee acquired. ☕", "success");
      return;
    }
    addEntry("Brewing...", "success");
    const entry = document.createElement("p");
    entry.className =
      "terminal-entry terminal-entry--success terminal-entry--progress";
    entry.setAttribute("aria-hidden", "true");
    entry.textContent = "[....................] 0%";
    output.append(entry);
    scrollOutputToEnd();
    let progress = 0;
    const progressTimer = window.setInterval(() => {
      progress += 10;
      const completed = progress / 5;
      entry.textContent = `[${"█".repeat(completed)}${".".repeat(20 - completed)}] ${progress}%`;
      scrollOutputToEnd();
      if (progress === 100) {
        window.clearInterval(progressTimer);
        addEntry("Coffee acquired. ☕", "success");
      }
    }, 70);
  });
  register("/secret", () => {
    if (secretEditModeEnabled) {
      disableSecretEditMode();
      addEntry(
        "[ EDIT MODE DISABLED ]\n\nReality restored... mostly.",
        "success",
      );
      return;
    }

    enableSecretEditMode();
    addEntry(
      "You found it.\n\nThe site is yours now.\nClick any highlighted text to rewrite it.\n\n[ EDIT MODE ENABLED ]\n\nType /secret to lock the text again.\nRefresh to restore reality.",
      "success",
    );
  });
  register("/theme", () => {
    const nextTheme =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    setTheme(nextTheme, true);
    addEntry(`${nextTheme} theme enabled.`, "success");
  });
  register("/clear", () => {
    output.replaceChildren();
    history.length = 0;
    historyIndex = 0;
    addEntry("type /help for available commands", "success");
  });

  const runCommand = (value) => {
    const command = value.trim().toLowerCase();
    if (!command) return;
    addEntry(`$ ${command}`, "command");
    const handler = commands.get(command);
    if (handler) handler();
    else addEntry(`command not found: ${command}\ntry /help`, "error");
  };

  const openTerminal = (trigger = document.activeElement) => {
    lastTrigger = trigger;
    if (!terminal.open) {
      output.replaceChildren();
      addEntry(
        "command interface initialized\nwelcome to command interface\ntype /help for available commands",
        "success",
      );
      terminal.showModal();
      document.body.classList.add("terminal-open");
      window.requestAnimationFrame(() => terminal.classList.add("is-visible"));
    }
    window.requestAnimationFrame(() => input.focus());
  };

  const closeTerminal = () => {
    if (!terminal.open || terminal.classList.contains("is-closing")) return;
    terminal.classList.add("is-closing");
    terminal.classList.remove("is-visible");
    window.setTimeout(() => terminal.close(), 220);
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const command = input.value;
    if (command.trim()) {
      history.push(command);
      historyIndex = history.length;
      runCommand(command);
    }
    input.value = "";
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      historyIndex = Math.max(0, historyIndex - 1);
      input.value = history[historyIndex] || "";
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      historyIndex = Math.min(history.length, historyIndex + 1);
      input.value = history[historyIndex] || "";
    } else if (event.key === "Tab") {
      const match = [...commands.keys()].find((name) =>
        name.startsWith(input.value.trim().toLowerCase()),
      );
      if (match) {
        event.preventDefault();
        input.value = match;
      }
    }
  });

  closeButton.addEventListener("click", closeTerminal);
  terminal.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeTerminal();
  });
  terminal.addEventListener("close", () => {
    terminal.classList.remove("is-closing", "is-visible");
    document.body.classList.remove("terminal-open");
    lastTrigger?.focus();
  });
  document.addEventListener("keydown", (event) => {
    const isTerminalShortcut = event.key === "/" && event.ctrlKey;
    const canToggleTerminal =
      !isEditable(event.target) || event.target === input;

    if (!isTerminalShortcut || !canToggleTerminal) return;

    event.preventDefault();
    if (terminal.open) closeTerminal();
    else openTerminal();
  });
  document.querySelectorAll("[data-terminal-trigger]").forEach((button) => {
    button.addEventListener("click", () => openTerminal(button));
  });
  return { openTerminal };
};
