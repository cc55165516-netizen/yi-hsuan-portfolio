async function loadJSON(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Could not load ${path}`);
  return response.json();
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (element && typeof value === "string") element.textContent = value;
}

function renderEditorialTitle(value) {
  const title = document.getElementById("hero-title");
  if (!title || !value) return;
  const parts = value.split("|");
  if (parts.length !== 2) {
    title.textContent = value;
    return;
  }
  const emphasis = document.createElement("em");
  emphasis.textContent = parts[1];
  title.replaceChildren(document.createTextNode(parts[0]), document.createElement("br"), emphasis);
}

async function renderHome() {
  if (!document.getElementById("hero-title")) return;
  try {
    const profile = await loadJSON("data/profile.json");
    setText("intro-kicker", profile.kicker);
    renderEditorialTitle(profile.heroTitle);
    setText("hero-copy", profile.heroCopy);
    setText("name-en", profile.nameEnglish);
    setText("name-zh", profile.nameChinese);
    setText("bio", profile.bio);
    setText("interests", profile.interests);
    setText("featured-title", profile.featuredTitle);
    setText("featured-summary", profile.featuredSummary);
  } catch (error) {
    console.error("Unable to load profile data:", error);
  }
}

function element(tag, className, value) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (value != null) node.textContent = String(value);
  return node;
}

function projectCard(project, index) {
  const article = element("article", "project-row");
  article.id = project.id;
  article.append(element("div", "project-index", String(index + 1).padStart(2, "0")));

  const main = document.createElement("div");
  main.append(element("p", "project-meta", `${project.type} · ${project.status}`));
  const heading = element("h2", "", project.title);
  if (project.chineseTitle) heading.append(element("span", "zh-title", project.chineseTitle));
  main.append(heading, element("p", "project-summary", project.summary));

  const detail = element("div", "project-detail");
  detail.append(
    element("h3", "", "設計提問"),
    element("p", "", project.question),
    element("h3", "", "設計重點"),
    element("p", "", project.focus)
  );
  if (project.role) detail.append(element("h3", "", "我的負責項目"), element("p", "", project.role));
  if (project.collaborators) detail.append(element("h3", "", "合作分工"), element("p", "", project.collaborators));
  if (Array.isArray(project.sections)) {
    const gallery = element("div", "project-gallery");
    project.sections.forEach(section => {
      const block = element("section", "gallery-section");
      block.append(element("h3", "", section.title), element("p", "", section.description));
      const pages = element("div", "gallery-pages");
      (section.pages || []).forEach(page => {
        const figure = element("figure", "portfolio-page");
        const img = element("img", "portfolio-image");
        img.src = `assets/portfolio/page-${String(page).padStart(2, "0")}.jpg`;
        img.alt = `${project.title}－${section.title}，原作品集第 ${page} 頁`;
        img.loading = "lazy";
        img.addEventListener("error", () => {
          figure.replaceChildren(element("p", "image-missing", `原作品集第 ${page} 頁圖面，待上傳圖片`));
        }, {once:true});
        figure.append(img, element("figcaption", "", `作品集 P.${page}`));
        pages.append(figure);
      });
      block.append(pages);
      gallery.append(block);
    });
    main.append(gallery);
  }
  article.append(main, detail);
  return article;
}

async function renderWorks() {
  const container = document.getElementById("works-list");
  if (!container) return;
  try {
    const projects = await loadJSON("data/projects.json");
    if (!Array.isArray(projects)) throw new Error("Project data must be an array");
    container.replaceChildren(...projects.map(projectCard));
    if (location.hash) {
      const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (target) target.scrollIntoView();
    }
  } catch (error) {
    container.replaceChildren(element("p", "loading-note",
      "作品資料載入失敗，請檢查 data/projects.json 並重新整理頁面。"));
    console.error("Unable to load projects:", error);
  }
}

renderHome();
renderWorks();
