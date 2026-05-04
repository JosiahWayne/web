// External JS for the JavaScript Interaction assignment.
// All event handlers are attached to document.body via delegation so that
// they keep working after spa.js replaces <main> on internal navigation.

const STORAGE_KEY = "diffusion-color-mode";

function applyColorMode(mode) {
  const root = document.documentElement;
  if (mode === "dark") {
    root.setAttribute("data-theme", "dark");
  } else {
    root.removeAttribute("data-theme");
  }
  document.querySelectorAll(".color-mode-toggle").forEach((btn) => {
    const isDark = mode === "dark";
    btn.setAttribute("aria-pressed", String(isDark));
    btn.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );
    const sun = btn.querySelector(".icon-sun");
    const moon = btn.querySelector(".icon-moon");
    if (sun && moon) {
      sun.style.display = isDark ? "block" : "none";
      moon.style.display = isDark ? "none" : "block";
    }
  });
}

function toggleColorMode() {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  applyColorMode(next);
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch (e) {
    // ignore storage errors (private mode, etc.)
  }
}

function toggleGlossary(item) {
  const detail = item.getAttribute("data-detail");
  if (!detail) return;

  let expansion = item.querySelector(".glossary-expansion");
  if (expansion) {
    expansion.remove();
    item.classList.remove("is-open");
    return;
  }

  expansion = document.createElement("p");
  expansion.className = "glossary-expansion";
  expansion.textContent = detail;
  item.appendChild(expansion);
  item.classList.add("is-open");
}

function highlightMetric(metric) {
  if (metric.classList.contains("is-highlighted")) {
    metric.classList.remove("is-highlighted");
    metric.style.background = "";
    metric.style.borderColor = "";
    metric.style.transform = "";
    return;
  }
  metric.classList.add("is-highlighted");
  metric.style.background = "var(--highlight-bg, #fff4d6)";
  metric.style.borderColor = "var(--accent)";
  metric.style.transform = "translateY(-2px)";
}

document.body.addEventListener("click", (event) => {
  const toggleBtn = event.target.closest(".color-mode-toggle");
  if (toggleBtn) {
    toggleColorMode();
    return;
  }

  const glossaryItem = event.target.closest(".glossary-item");
  if (glossaryItem) {
    toggleGlossary(glossaryItem);
    return;
  }

  const metric = event.target.closest(".metric");
  if (metric) {
    highlightMetric(metric);
  }
});

(function init() {
  let saved = null;
  try {
    saved = localStorage.getItem(STORAGE_KEY);
  } catch (e) {
    // ignore
  }
  applyColorMode(saved === "dark" ? "dark" : "light");
})();
