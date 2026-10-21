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
  const words = value.trim().split(/\s+/);
  if (words.length < 3) {
    title.textContent = value;
    return;
  }
  const ending = words.splice(-2).join(" ");
  title.replaceChildren(
    document.createTextNode(words.join(" ")),
    document.createElement("br")
  );
  const emphasis = document.createElement("em");
  emphasis.textContent = ending;
  title.append(emphasis);
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
    element("h3", "", "Design question"),
    element("p", "", project.question),
    element("h3", "", "Focus"),
    element("p", "", project.focus)
  );
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
      "Project content could not be loaded. Check data/projects.json and refresh the page."));
    console.error("Unable to load projects:", error);
  }
}

renderHome();
renderWorks();
