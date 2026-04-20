// Persistent audio across page navigations
// Intercepts internal links and swaps content via fetch so audio keeps playing

(function () {
  const player = document.getElementById("persistent-player");
  if (!player) return;

  const internalLinks = () =>
    document.querySelectorAll('a[href$=".html"]');

  function updateActiveNav() {
    const current = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-list a").forEach((a) => {
      const href = a.getAttribute("href");
      if (href === current) {
        a.setAttribute("aria-current", "page");
      } else {
        a.removeAttribute("aria-current");
      }
    });
  }

  async function loadPage(url, pushState) {
    try {
      // Update URL first so updateActiveNav reads the correct path
      if (pushState) {
        history.pushState(null, "", url);
      }

      // Update nav highlight immediately (no waiting for fetch)
      updateActiveNav();

      const res = await fetch(url);
      const html = await res.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      // Swap main content
      const newMain = doc.querySelector("main");
      const oldMain = document.querySelector("main");
      if (newMain && oldMain) oldMain.replaceWith(newMain);

      // Swap footer
      const newFooter = doc.querySelector(".footer");
      const oldFooter = document.querySelector(".footer");
      if (newFooter && oldFooter) oldFooter.replaceWith(newFooter);

      // Update title
      document.title = doc.title;

      // Re-bind links in new content
      bindLinks();

      // Scroll to top
      window.scrollTo(0, 0);
    } catch (e) {
      // Fallback to normal navigation if fetch fails
      location.href = url;
    }
  }

  function bindLinks() {
    internalLinks().forEach((link) => {
      link.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        // Only intercept local .html links
        if (href && !href.startsWith("http")) {
          e.preventDefault();
          loadPage(href, true);
        }
      });
    });
  }

  // Handle browser back/forward
  window.addEventListener("popstate", function () {
    loadPage(location.href, false);
  });

  // Initial bind
  bindLinks();
})();
