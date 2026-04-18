// ============================================================
// skeleton.js — skeleton loading helpers
// ============================================================

const skeleton = {

  // Skeleton rows for tier list table (single mode: 4 cols)
  tierRows(count = 8, cols = 4) {
    const colMap = {
      0: 'rank',
      1: 'name',
      2: 'region',
      3: 'tier',
    };
    return Array.from({ length: count }, () => `
      <tr class="skeleton-row">
        <td><span class="skeleton skeleton-rank"></span></td>
        <td>
          <div style="display:flex;align-items:center;gap:10px;">
            <span class="skeleton skeleton-avatar"></span>
            <span class="skeleton skeleton-name" style="width:${80 + Math.random() * 60 | 0}px;"></span>
          </div>
        </td>
        <td><span class="skeleton skeleton-region"></span></td>
        ${cols > 4
          ? Array.from({ length: cols - 3 }, () =>
              `<td><span class="skeleton skeleton-tier"></span></td>`
            ).join('')
          : `<td><span class="skeleton skeleton-tier"></span></td>`
        }
      </tr>`).join('');
  },

  // Skeleton rows for overall (7 mode columns)
  overallRows(count = 6) {
    return Array.from({ length: count }, () => `
      <tr class="skeleton-row">
        <td><span class="skeleton skeleton-rank"></span></td>
        <td>
          <div style="display:flex;align-items:center;gap:10px;">
            <span class="skeleton skeleton-avatar"></span>
            <span class="skeleton skeleton-name" style="width:${80 + Math.random() * 60 | 0}px;"></span>
          </div>
        </td>
        <td><span class="skeleton skeleton-region"></span></td>
        ${Array.from({ length: 7 }, () =>
          `<td><span class="skeleton skeleton-tier"></span></td>`
        ).join('')}
        <td></td>
      </tr>`).join('');
  },

  // Skeleton cards for tournament page
  tournamentCards(count = 3) {
    return Array.from({ length: count }, (_, i) => `
      <div class="skeleton-card" style="height:120px;margin-bottom:1rem;animation-delay:${i * 0.08}s;"></div>
    `).join('');
  },

  // Skeleton for user table (4 cols)
  userRows(count = 5) {
    return Array.from({ length: count }, () => `
      <tr class="skeleton-row">
        <td><span class="skeleton skeleton-name"></span></td>
        <td><span class="skeleton skeleton-name" style="width:160px;"></span></td>
        <td><span class="skeleton skeleton-rank" style="width:70px;"></span></td>
        <td><span class="skeleton skeleton-tier" style="width:60px;"></span></td>
      </tr>`).join('');
  },
};