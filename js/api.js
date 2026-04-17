// ============================================================
// api.js — all data fetching from your backend
// ============================================================

const API_BASE_URL = 'https://gauntlet-tiers-backend-production-5614.up.railway.app/api';

async function apiFetch(path, options = {}) {
  const token = localStorage.getItem('gt_token');
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(API_BASE_URL + path, { ...options, headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Error');
  return data;
}

// ── Players ────────────────────────────────────────────────
async function getPlayers(mode = 'overall') {
  return apiFetch(`/players?mode=${mode}`);
}

async function getPlayer(id) {
  return apiFetch(`/players/${id}`);
}

// ── Stats ──────────────────────────────────────────────────
async function getStats() {
  return apiFetch('/stats');
}

// ── Admin ──────────────────────────────────────────────────
async function addPlayer(data) {
  return apiFetch('/admin/players', { method: 'POST', body: JSON.stringify(data) });
}

async function updatePlayerTier(playerId, mode, tier) {
  return apiFetch(`/admin/players/${playerId}/tier`, {
    method: 'PATCH',
    body: JSON.stringify({ mode, tier })
  });
}

async function deletePlayer(playerId) {
  return apiFetch(`/admin/players/${playerId}`, { method: 'DELETE' });
}

async function getAllUsers() {
  return apiFetch('/admin/users');
}

async function setUserAdmin(userId, isAdmin) {
  return apiFetch(`/admin/users/${userId}/admin`, {
    method: 'PATCH',
    body: JSON.stringify({ is_admin: isAdmin })
  });
}