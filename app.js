(function () {
  var SITE = window.SITE || {};
  var PROJECTS = Array.isArray(window.PROJECTS) ? window.PROJECTS : [];
  var $ = function (id) { return document.getElementById(id); };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[c];
    });
  }
  // Only allow http(s) links or local file paths — blocks javascript: etc.
  function safeUrl(u) {
    u = String(u || "").trim();
    if (!u) return "";
    if (/^(https?:\/\/|mailto:|assets\/|\.\/|\/)/i.test(u)) return u;
    return "";
  }
  function cssUrl(u) { return safeUrl(u).replace(/['"()\\]/g, encodeURIComponent); }

  // Tiny markdown: ## / ### headings, - lists, blank-line paragraphs
  function md(src) {
    var blocks = esc(src || "").split(/\n{2,}/);
    return blocks.map(function (b) {
      b = b.trim(); if (!b) return "";
      if (/^### /.test(b)) return "<h3>" + b.slice(4) + "</h3>";
      if (/^#{1,2} /.test(b)) return "<h2>" + b.replace(/^#{1,2} /, "") + "</h2>";
      if (/^[-*] /m.test(b)) {
        return "<ul>" + b.split("\n").map(function (l) { return "<li>" + l.replace(/^[-*] /, "") + "</li>"; }).join("") + "</ul>";
      }
      return "<p>" + b.replace(/\n/g, "<br>") + "</p>";
    }).join("");
  }

  function videoMarkup(u) {
    u = safeUrl(u); if (!u) return "";
    var m = u.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/);
    if (m) return '<div class="video-frame"><iframe src="https://www.youtube.com/embed/' + m[1] + '" title="VERANO project video" loading="lazy" allow="encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe></div>';
    m = u.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (m) return '<div class="video-frame"><iframe src="https://player.vimeo.com/video/' + m[1] + '" title="VERANO project video" loading="lazy" allow="fullscreen; picture-in-picture" allowfullscreen></iframe></div>';
    return '<video class="case-video" controls playsinline preload="metadata" src="' + esc(u) + '"></video>';
  }

  function renderGrid() {
    var el = $("projectGrid");
    if (!PROJECTS.length) { el.innerHTML = '<div class="empty">Projects will appear here soon.</div>'; return; }
    el.innerHTML = PROJECTS.map(function (p, i) {
      var bg = p.heroImage ? " style=\"background-image:url('" + cssUrl(p.heroImage) + "')\"" : "";
      return '<a class="card' + (i === 0 ? " large" : "") + '" href="#/project/' + encodeURIComponent(p.slug) + '"' + bg + '>' +
        '<span class="tag">' + esc(p.category) + '</span>' +
        '<div class="card-copy"><span class="num">' + String(i + 1).padStart(2, "0") + ' / ' + String(PROJECTS.length).padStart(2, "0") + '</span>' +
        '<h3>' + esc(p.title) + (p.subtitle ? " — " + esc(p.subtitle) : "") + '</h3></div></a>';
    }).join("");
  }

  function renderContact() {
    var mail = SITE.email || "";
    $("mailBtn").href = mail ? "mailto:" + mail : "#contact";
    var links = [["Instagram", SITE.instagram], ["TikTok", SITE.tiktok], ["WhatsApp", SITE.whatsapp]]
      .filter(function (x) { return safeUrl(x[1]); })
      .map(function (x) { return '<a href="' + esc(safeUrl(x[1])) + '" target="_blank" rel="noopener">' + x[0] + '</a>'; });
    if (mail) links.unshift('<a href="mailto:' + esc(mail) + '">' + esc(mail) + '</a>');
    $("socials").innerHTML = links.join("");
  }

  function showCase(p) {
    $("caseCategory").textContent = p.category || "";
    $("caseTitle").textContent = p.title || "";
    $("caseSubtitle").textContent = p.subtitle || "";
    $("caseClient").textContent = p.client ? "Client · " + p.client : "";
    $("caseYear").textContent = p.year ? "Year · " + p.year : "";
    $("caseServices").textContent = (p.services || []).join(" · ");
    var img = $("caseImage");
    img.style.backgroundImage = p.heroImage ? "url('" + cssUrl(p.heroImage) + "')" : "";
    img.style.display = p.heroImage ? "block" : "none";
    $("caseVideoWrap").innerHTML = videoMarkup(p.videoUrl);
    $("caseGallery").innerHTML = (p.gallery || []).map(function (u) {
      return '<img loading="lazy" src="' + esc(safeUrl(u)) + '" alt="' + esc(p.title || "Project image") + '">';
    }).join("");
    var ctaUrl = safeUrl(p.ctaUrl) || (SITE.email ? "mailto:" + SITE.email : "");
    $("caseCta").innerHTML = ctaUrl ? '<a class="btn" href="' + esc(ctaUrl) + '">' + esc(p.ctaLabel || "Start a project") + ' ↗</a>' : "";
    var parts = [['', p.excerpt], ['Challenge', p.challenge], ['Solution', p.solution], ['Results', p.results]]
      .filter(function (x) { return x[1]; })
      .map(function (x) { return '<p class="manifesto">' + (x[0] ? "<strong>" + x[0] + "</strong><br>" : "") + esc(x[1]) + "</p>"; });
    $("caseSummary").innerHTML = '<div class="kicker">Case study</div>' + parts.join("");
    $("caseContent").innerHTML = md(p.content);
    document.title = p.title + " — VERANO";
    $("metaDescription").setAttribute("content", p.seoDescription || p.excerpt || "");
  }

  function route() {
    var h = decodeURIComponent(location.hash || "");
    var m = h.match(/^#\/project\/(.+)$/);
    var home = $("home"), cs = $("case");
    if (m) {
      var p = PROJECTS.filter(function (x) { return x.slug === m[1]; })[0];
      if (p) {
        showCase(p);
        home.hidden = true; cs.hidden = false;
        window.scrollTo(0, 0);
        return;
      }
      location.hash = "#work"; return;
    }
    cs.hidden = true; home.hidden = false;
    document.title = "VERANO — Built for brands that want to be seen.";
    var target = h.length > 1 ? document.getElementById(h.slice(1)) : null;
    if (target) target.scrollIntoView(); else if (!h) window.scrollTo(0, 0);
  }

  renderGrid();
  renderContact();
  window.addEventListener("hashchange", route);
  route();
})();
