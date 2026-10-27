async function loadJSON(path) {
  const response = await fetch(`${path}?v=20261026-portfolio`, { cache: "no-cache" });
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

  const link = element("a", "project-open", "查看完整作品 ↗");
  link.href = `project.html?id=${encodeURIComponent(project.id)}`;
  main.append(link);
  if (Array.isArray(project.sections) && document.getElementById("detail-body")) {
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
  article.append(main);
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


function buildDetailSection(project) {
  const container = document.getElementById("detail-body");
  if (!container) return;
  container.replaceChildren();
  const info = element("div", "detail-info");
  info.append(
    element("div", "detail-fact", "設計提問"),
    element("p", "", project.question || ""),
    element("div", "detail-fact", "設計重點"),
    element("p", "", project.focus || "")
  );
  if (project.role) info.append(element("div", "detail-fact", "我的負責項目"), element("p", "", project.role));
  if (project.collaborators) info.append(element("div", "detail-fact", "合作分工"), element("p", "", project.collaborators));
  container.append(info);
  const gallery = element("div", "detail-gallery");
  (project.sections || []).forEach((section, sectionIndex) => {
    const block = element("section", "detail-section");
    block.append(element("p", "eyebrow", String(sectionIndex + 1).padStart(2, "0") + " / DESIGN PROCESS"));
    block.append(element("h2", "", section.title));
    if (section.description) block.append(element("p", "detail-section-copy", section.description));
    const images = element("div", "detail-images");
    (section.pages || []).forEach(page => {
      const figure = element("figure", "detail-figure");
      const img = element("img", "detail-image");
      img.src = `assets/portfolio/page-${String(page).padStart(2, "0")}.jpg`;
      img.alt = `${project.title}：${section.title}，原作品集第 ${page} 頁`;
      img.loading = "lazy";
      img.addEventListener("error", () => {
        figure.replaceChildren(element("p", "image-missing", `作品集第 ${page} 頁圖片尚未上傳`));
      }, {once:true});
      figure.append(img, element("figcaption", "", `原作品集 P.${page}`));
      images.append(figure);
    });
    block.append(images);
    gallery.append(block);
  });
  container.append(gallery);
}

async function renderProjectDetail() {
  const title = document.getElementById("detail-title");
  if (!title) return;
  try {
    const projects = await loadJSON("data/projects.json");
    const id = new URLSearchParams(location.search).get("id");
    const index = projects.findIndex(project => project.id === id);
    if (index < 0) {
      title.textContent = "找不到這個作品";
      document.getElementById("detail-summary").textContent = "請返回作品選集，選擇要瀏覽的作品。";
      return;
    }
    const project = projects[index];
    title.textContent = project.title;
    document.title = `${project.title} — 隋宜軒作品集`;
    setText("detail-en", project.chineseTitle);
    setText("detail-category", `${project.type} / ${project.status}`);
    setText("detail-summary", project.summary);
    buildDetailSection(project);
    const next = projects[(index + 1) % projects.length];
    const nav = document.getElementById("detail-next");
    nav.append(element("p", "eyebrow", "下一個作品"));
    const link = element("a", "detail-next-link", next.title + " ↗");
    link.href = `project.html?id=${encodeURIComponent(next.id)}`;
    nav.append(link);
  } catch (error) {
    title.textContent = "作品載入失敗";
    console.error("Unable to load project:", error);
  }
}
renderProjectDetail();
