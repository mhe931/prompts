const byId = (id) => document.getElementById(id);
const state = { manifest: null, items: [], filtered: [], category: 'all', query: '', selectedId: null };

const root = document.documentElement;
const search = byId('search');
const categoriesEl = byId('categories');
const listEl = byId('prompt-list');
const titleEl = byId('prompt-title');
const descEl = byId('prompt-description');
const contentEl = byId('prompt-content');
const statusEl = byId('status');
const copyBtn = byId('copy-btn');
const menuBtn = byId('menu-toggle');
const sidebar = byId('sidebar');

function basePath() {
  const p = window.location.pathname;
  if (p.includes('/prompts/')) return '/prompts/';
  return p.endsWith('/') ? p : `${p.substring(0, p.lastIndexOf('/') + 1)}`;
}

function setTheme(next) {
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
}

function initTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') setTheme(saved);
}

function safeText(text) { return text ?? ''; }

function filterItems() {
  const q = state.query.trim().toLowerCase();
  state.filtered = state.items.filter((i) => {
    const catOk = state.category === 'all' || i.category === state.category;
    if (!catOk) return false;
    if (!q) return true;
    return `${i.title} ${i.description}`.toLowerCase().includes(q);
  });
}

function renderCategories() {
  const cats = ['all', ...(state.manifest?.categories || [])];
  categoriesEl.innerHTML = '';
  for (const c of cats) {
    const b = document.createElement('button');
    b.className = `category-btn${state.category === c ? ' active' : ''}`;
    b.textContent = c === 'all' ? 'All' : c;
    b.type = 'button';
    b.addEventListener('click', () => { state.category = c; render(); });
    categoriesEl.appendChild(b);
  }
}

function renderList() {
  listEl.innerHTML = '';
  if (!state.filtered.length) {
    const li = document.createElement('li');
    li.textContent = 'No prompts found.';
    li.className = 'status';
    listEl.appendChild(li);
    return;
  }
  for (const item of state.filtered) {
    const li = document.createElement('li');
    const b = document.createElement('button');
    b.className = `prompt-btn${state.selectedId === item.id ? ' active' : ''}`;
    b.type = 'button';
    b.innerHTML = `<strong>${item.title}</strong>${item.description ? `<small>${item.description}</small>` : ''}`;
    b.addEventListener('click', () => selectPrompt(item.id, true));
    li.appendChild(b);
    listEl.appendChild(li);
  }
}

async function selectPrompt(id, push = false) {
  const item = state.items.find((x) => x.id === id);
  if (!item) return;
  state.selectedId = id;
  titleEl.textContent = item.title;
  descEl.textContent = safeText(item.description);
  statusEl.textContent = 'Loading prompt...';
  copyBtn.disabled = true;
  try {
    const res = await fetch(new URL(item.path, window.location.origin + basePath()));
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    contentEl.textContent = text;
    statusEl.textContent = `Loaded ${item.file}`;
    copyBtn.disabled = false;
    copyBtn.dataset.copy = text;
    if (push) {
      const url = new URL(window.location.href);
      url.searchParams.set('prompt', id);
      history.pushState({ prompt: id }, '', url);
    }
  } catch (err) {
    contentEl.textContent = 'Could not load prompt content.';
    statusEl.textContent = `Error: ${err.message}`;
  }
  renderList();
}

async function copyPrompt() {
  const text = copyBtn.dataset.copy || '';
  if (!text) return;
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    statusEl.textContent = 'Copied to clipboard.';
  } catch {
    statusEl.textContent = 'Copy failed. Select text manually.';
  }
}

function render() {
  filterItems();
  renderCategories();
  renderList();
}

async function init() {
  initTheme();
  statusEl.textContent = 'Loading manifest...';
  try {
    const manifestUrl = new URL('prompts/manifest.json', window.location.origin + basePath());
    const res = await fetch(manifestUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    state.manifest = await res.json();
    state.items = state.manifest.prompts || [];
    render();
    statusEl.textContent = state.items.length ? 'Ready.' : 'No prompts available yet.';
    const selected = new URL(window.location.href).searchParams.get('prompt');
    if (selected) await selectPrompt(selected);
  } catch (err) {
    statusEl.textContent = `Failed to load manifest: ${err.message}`;
  }
}

search.addEventListener('input', (e) => { state.query = e.target.value; render(); });
byId('theme-toggle').addEventListener('click', () => {
  const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  setTheme(current === 'dark' ? 'light' : 'dark');
});
copyBtn.addEventListener('click', copyPrompt);
menuBtn.addEventListener('click', () => sidebar.classList.toggle('open'));
window.addEventListener('popstate', () => {
  const selected = new URL(window.location.href).searchParams.get('prompt');
  if (selected) selectPrompt(selected);
});

init();
