/* English copy and bilingual UI, independent of layout and project data. */
window.PortfolioI18n = (() => {
  const projects = {
  "guling-theatre": {
    "type": "Architectural Design",
    "status": "Portfolio Project",
    "title": "Family Theatre on Guling Street",
    "summary": "A family-oriented theatre on Guling Street, exploring how performance spaces and public areas can create a shared cultural setting for children and parents.",
    "question": "How can a family theatre support both performances and everyday public activities?",
    "focus": "Concept development, theatre spaces, architectural massing and physical models.",
    "sections": [
      {
        "title": "Concept and Design Presentation",
        "description": "Portfolio page 2 presents exterior and interior renderings, conceptual diagrams and architectural models."
      }
    ]
  },
  "collective-living": {
    "type": "Collective Housing",
    "status": "Collaborative Project",
    "title": "Imagining Collective Living",
    "summary": "An exploration of collective housing through shared daily life, social interaction and architectural form, reconsidering the relationship between private and communal living.",
    "question": "How can spatial organization connect private homes with collective life?",
    "focus": "Design concepts, massing development, architectural drawings and renderings.",
    "sections": [
      {
        "title": "Architectural Overview",
        "description": "Overall architectural rendering of the collective housing proposal."
      },
      {
        "title": "Design Concept",
        "description": "A living environment shaped around social interaction, community, housing and ecology."
      },
      {
        "title": "Massing Development",
        "description": "An exploration of site conditions, form generation, carving and program distribution."
      },
      {
        "title": "Architectural Drawings",
        "description": "Site plans, floor plans, elevations and sections."
      }
    ]
  },
  "huaxia-campus": {
    "type": "Campus Planning",
    "status": "Team Project",
    "title": "Toward a New Campus — Huaxia Campus Planning",
    "summary": "A campus-scale planning proposal for Huaxia, using site organization and architectural plans to reimagine the campus environment.",
    "question": "How can a campus master plan reconnect buildings and open spaces?",
    "focus": "Campus layout, spatial planning, architectural drawings and team coordination.",
    "sections": [
      {
        "title": "Campus Plan and Drawings",
        "description": "Portfolio page 7 presents the campus layout and related architectural plans."
      }
    ]
  },
  "huaxia-dorm": {
    "type": "Student Housing",
    "status": "Collaborative Project",
    "title": "Toward a New Campus — Student Dormitory",
    "summary": "A student dormitory proposal within the new campus plan, exploring how building form, floor organization and façades shape residential life on campus.",
    "question": "How can student housing, shared activities and building form create a new campus living environment?",
    "focus": "Dormitory design, massing studies, floor-by-floor organization, drawings and façade renderings.",
    "sections": [
      {
        "title": "Exterior Perspective",
        "description": "Overall exterior rendering of the student dormitory."
      },
      {
        "title": "Design Concept",
        "description": "An exploration of modular living and shared activity spaces."
      },
      {
        "title": "Massing Development",
        "description": "Studies of architectural form and program organization."
      },
      {
        "title": "Floor-by-Floor Organization",
        "description": "The arrangement of different floors and communal areas."
      },
      {
        "title": "Architectural Drawings",
        "description": "Plans, sections, elevations and architectural details."
      }
    ]
  }
};
  const profile = {
  "kicker": "SPATIAL OBSERVATION / ARCHITECTURAL PRACTICE",
  "heroTitle": "Designing for|everyday life.",
  "heroCopy": "Starting with people's everyday experiences, I explore connections between architecture, cities and daily life.",
  "bio": "I study Architecture at National Taiwan University of Science and Technology. My design process begins by observing how people inhabit spaces, focusing on how everyday life shapes neighborhoods and how architecture can reconnect overlooked urban places.",
  "interests": "Interests: urban regeneration, public space, collective housing and the everyday culture of traditional markets."
};
  const pageStrings = {
  "index.html": {
    ".header-note": "ARCHITECTURE · 2026",
    ".hero-rule span:first-child": "PORTFOLIO / 01—02",
    ".hero-rule span:last-child": "TAIWAN · 2026",
    ".intro-grid .eyebrow": "01 / ABOUT ME",
    ".intro-grid h2": "Observing the city,<br><em>reconnecting everyday life.</em>",
    ".intro-text .text-link": "Explore selected works <span>↗</span>",
    ".principles > .eyebrow": "02 / DESIGN APPROACH",
    ".principle-list article:nth-child(1) h3": "Observe",
    ".principle-list article:nth-child(1) p": "Understand a place through its existing rhythms, boundaries and everyday needs.",
    ".principle-list article:nth-child(2) h3": "Connect",
    ".principle-list article:nth-child(2) p": "Rethink the relationships between people, programs and shared spaces.",
    ".principle-list article:nth-child(3) h3": "Reimagine",
    ".principle-list article:nth-child(3) p": "Turn site research and spatial constraints into meaningful design questions.",
    ".contact > .eyebrow": "03 / GET IN TOUCH",
    ".contact h2": "Good design<br>begins with <em>dialogue.</em>",
    ".contact .muted": "Open to conversations about architecture, design and spatial experiences.",
    ".contact-phone": "Phone: <a href='tel:0900000000' id='contact-phone'>0900-000-000</a>"
  },
  "works.html": {
    ".header-note": "SELECTED WORKS · 2026",
    ".works-heading .eyebrow": "PORTFOLIO / 02",
    ".works-heading h1": "Selected works<br><em>& spatial studies.</em>",
    ".heading-description": "Four architectural projects spanning theatre design, collective housing and campus planning. Explore each project to discover its concepts, drawings and design process.",
    ".works-heading .hero-rule span:first-child": "ARCHITECTURE / URBAN SPACE",
    ".content-note .eyebrow": "ABOUT THIS PORTFOLIO",
    ".content-note > p:last-child": "These projects document different stages of architectural learning and design. Project descriptions are maintained separately in <code>data/projects.json</code> for easy updates."
  },
  "project.html": {
    ".detail-back": "← Back to all projects"
  }
};
  const lang = (() => {
    const query = new URLSearchParams(window.location.search).get("lang");
    if (query === "en" || query === "zh") {
      try { localStorage.setItem("portfolio-lang", query); } catch (_) {}
      return query;
    }
    try { return localStorage.getItem("portfolio-lang") === "en" ? "en" : "zh"; } catch (_) { return "zh"; }
  })();
  const isEnglish = lang === "en";
  const labels = {
    about: isEnglish ? "About" : "關於我",
    works: isEnglish ? "Works" : "作品選集",
    contact: isEnglish ? "Contact" : "聯絡",
    open: isEnglish ? "View full project ↗" : "查看完整作品 ↗",
    question: isEnglish ? "DESIGN QUESTION" : "設計提問",
    focus: isEnglish ? "DESIGN FOCUS" : "設計重點",
    next: isEnglish ? "NEXT PROJECT" : "下一個作品",
    page: isEnglish ? "Portfolio p." : "原作品集 P.",
    missing: isEnglish ? "Image not available: portfolio page " : "作品集第 ",
    loadingError: isEnglish ? "Unable to load project data. Please refresh the page." : "作品資料載入失敗，請重新整理頁面。"
  };
  function translateProfile(data) { return isEnglish ? { ...data, ...profile } : data; }
  function translateProjects(data) {
    if (!isEnglish || !Array.isArray(data)) return data;
    return data.map(project => {
      const translation = projects[project.id];
      if (!translation) return project;
      return { ...project, ...translation, chineseTitle: project.title,
        sections: (project.sections || []).map((section, i) => ({
          ...section, ...(translation.sections[i] || {})
        }))
      };
    });
  }
  function applyStatic() {
    document.documentElement.lang = isEnglish ? "en" : "zh-Hant";
    const path = window.location.pathname.split("/").pop() || "index.html";
    const nav = document.querySelectorAll(".site-header nav a");
    [labels.about,labels.works,labels.contact].forEach((value,i) => { if (nav[i]) nav[i].textContent=value; });
    const footer = document.querySelector(".site-footer");
    if (footer) {
      const spans = footer.querySelectorAll("span");
      if (spans[1]) spans[1].textContent = isEnglish ? "DESIGN IN PROGRESS · 2026" : "持續觀察與設計 · 2026";
      const back = footer.querySelector("a");
      if (back) back.textContent = path === "index.html" ? (isEnglish ? "Back to top ↑" : "回到頂端 ↑") : path === "works.html" ? (isEnglish ? "Back to about ↑" : "返回關於我 ↑") : (isEnglish ? "All projects ↑" : "所有作品 ↑");
    }
    if (isEnglish) {
      for (const [selector, html] of Object.entries(pageStrings[path] || {})) {
        const node = document.querySelector(selector);
        if (node) node.innerHTML = html;
      }
      document.title = path === "index.html" ? "Yi-Hsuan Sui — Architecture Portfolio" : path === "works.html" ? "Selected Works — Yi-Hsuan Sui" : "Project — Yi-Hsuan Sui";
      const description = document.querySelector('meta[name="description"]');
      if (description) description.content = "Yi-Hsuan Sui's architecture and spatial design portfolio.";
    }
    const header = document.querySelector(".site-header");
    if (header) {
      const switcher = document.createElement("div");
      switcher.className = "language-switch";
      switcher.setAttribute("aria-label", "Language / 語言");
      for (const code of ["zh", "en"]) {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = code === "zh" ? "中文" : "EN";
        button.className = code === lang ? "selected" : "";
        button.setAttribute("aria-pressed", String(code === lang));
        button.addEventListener("click", () => {
          if (code === lang) return;
          try { localStorage.setItem("portfolio-lang", code); } catch (_) {}
          const url = new URL(window.location.href);
          url.searchParams.set("lang", code);
          window.location.assign(url.href);
        });
        switcher.append(button);
      }
      header.append(switcher);
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", applyStatic);
  else applyStatic();
  return { lang, isEnglish, labels, translateProfile, translateProjects };
})();
