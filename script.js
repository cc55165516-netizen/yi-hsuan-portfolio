async function loadJSON(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Could not load ${path}`);
  return response.json();
}

async function renderHome() {
  try {
    const profile = await loadJSON("data/profile.json");
    const setText = (id, value) => {
      const el = document.getElementById(id);
      if (el && value) el.textContent = value;
    };
    setText("intro-kicker", profile.kicker);
    setText("hero-title", profile.heroTitle);
    setText("hero-copy", profile.heroCopy);
    setText("name-en", profile.nameEnglish);
    setText("name-zh", profile.nameChinese);
    setText("bio", profile.bio);
    setText("interests", profile.interests);
    setText("featured-title", profile.featuredTitle);
    setText("featured-summary", profile.featuredSummary);
  } catch (error) {
    console.error(error);
  }
}

async function renderWorks() {
  const container = document.getElementById("works-list");
  if (!container) return;
  try {
    const projects = await loadJSON("data/projects.json");
    container.innerHTML = projects.map((project, index) => `
      <article class="project-row" id="${project.id}">
        <div class="project-index">${String(index + 1).padStart(2, "0")}</div>
        <div>
          <p class="project-meta">${project.type} · ${project.status}</p>
          <h2>${project.title}${project.chineseTitle ? `<span class="zh-title">${project.chineseTitle}</span>` : ""}</h2>
          <p class="project-summary">${project.summary}</p>
        </div>
        <div class="project-detail">
          <h3>Design question</h3><p>${project.question}</p>
          <h3>Focus</h3><p>${project.focus}</p>
        </div>
      </article>`).join("");
  } catch (error) {
    container.innerHTML = '<p class="loading-note">Project content could not be loaded. Please check data/projects.json and run the site through a local server.</p>';
    console.error(error);
  }
}

renderHome();
renderWorks();
