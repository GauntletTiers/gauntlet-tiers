// ============================================================
// auth.js — handles all authentication state
// Works with your backend API (see BACKEND_GUIDE.md)
// ============================================================

const API_BASE = 'https://gauntlet-tiers-backend-production-5614.up.railway.app/api';

// ── Token helpers ──────────────────────────────────────────
function getToken() { return localStorage.getItem('gt_token'); }
function setToken(t) { localStorage.setItem('gt_token', t); }
function removeToken() { localStorage.removeItem('gt_token'); }

function getUser() {
  const u = localStorage.getItem('gt_user');
  return u ? JSON.parse(u) : null;
}
function setUser(u) { localStorage.setItem('gt_user', JSON.stringify(u)); }
function removeUser() { localStorage.removeItem('gt_user'); }

// ── API helper ─────────────────────────────────────────────
async function apiFetch(path, options = {}) {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(API_BASE + path, { ...options, headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

// ── Update navbar based on auth state ─────────────────────
function updateNav() {
  const user = getUser();
  const navUser = document.querySelector('.nav-user');
  const navLogin = document.querySelector('.nav-login');
  const navAdmin = document.querySelector('.nav-admin');

  if (user) {
    if (navUser) {
      navUser.classList.add('visible');
      const nameEl = navUser.querySelector('.nav-username');
      if (nameEl) nameEl.textContent = user.username || user.email;
    }
    if (navLogin) navLogin.classList.add('hidden');
    if (navAdmin && user.is_admin) navAdmin.style.display = 'inline-flex';
  } else {
    if (navUser) navUser.classList.remove('visible');
    if (navLogin) navLogin.classList.remove('hidden');
    if (navAdmin) navAdmin.style.display = 'none';
  }
}

// ── Login ──────────────────────────────────────────────────
async function login(email, password) {
  const data = await apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
  setToken(data.token);
  setUser(data.user);
  return data;
}

// ── Register ───────────────────────────────────────────────
async function register(username, email, password) {
  const data = await apiFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ username, email, password })
  });
  setToken(data.token);
  setUser(data.user);
  return data;
}

// ── Logout ─────────────────────────────────────────────────
function logout() {
  removeToken();
  removeUser();
  window.location.href = getRootPath() + 'index.html';
}

// ── Get root path (works from /pages/ too) ─────────────────
function getRootPath() {
  const path = window.location.pathname;
  return path.includes('/pages/') ? '../' : '';
}

// ── Run on every page ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  updateNav();

  // Logout button
  const logoutBtn = document.querySelector('.logout-btn');
  if (logoutBtn) logoutBtn.addEventListener('click', logout);

  // Protect admin page
  if (window.location.pathname.includes('admin.html')) {
    const user = getUser();
    if (!user || !user.is_admin) {
      document.querySelector('.admin-content').style.display = 'none';
      document.querySelector('.admin-access-denied').style.display = 'block';
    }
  }

  // Redirect if already logged in (on login/signup pages)
  const isAuthPage = window.location.pathname.includes('login.html') ||
    window.location.pathname.includes('signup.html');
  if (isAuthPage && getUser()) {
    window.location.href = getRootPath() + 'index.html';
  }
});