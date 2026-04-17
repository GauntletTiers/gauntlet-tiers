# 🚀 Gauntlet Tiers — Backend Setup Guide
Complete guide to deploy your backend in ~15 minutes. Free hosting!

---

## 📋 STEP 1 — Create the Database (Supabase)

1. Go to https://supabase.com and create a free account
2. Click **"New Project"**, give it a name like `gauntlet-tiers`
3. Set a database password (save it somewhere!)
4. Wait ~2 min for it to spin up
5. Go to **SQL Editor** (left sidebar) and run this SQL to create your tables:

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Player tiers table
CREATE TABLE player_tiers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL,
  region TEXT DEFAULT 'NA',
  mode TEXT NOT NULL,
  tier TEXT NOT NULL,
  tier_rank INTEGER DEFAULT 99,
  player_id UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(username, mode)
);

-- Index for fast queries
CREATE INDEX idx_player_tiers_mode ON player_tiers(mode);
CREATE INDEX idx_player_tiers_tier_rank ON player_tiers(tier_rank);
```

6. Go to **Settings → API** (left sidebar)
   - Copy your **Project URL** → this is your `SUPABASE_URL`
   - Copy your **service_role secret key** → this is your `SUPABASE_SERVICE_KEY`

---

## 📋 STEP 2 — Deploy the Backend (Railway)

1. Go to https://railway.app and sign up with GitHub
2. Click **"New Project" → "Deploy from GitHub repo"**
3. Upload your project files to GitHub first:
   - Create a new repo on github.com
   - Upload: `server.js`, `package.json`
   - (Do NOT upload the front-end files here — those go separately)
4. Railway will auto-detect Node.js and deploy it
5. Go to your project → **Variables** tab → Add these:

```
SUPABASE_URL        = https://xxxx.supabase.co     (from Step 1)
SUPABASE_SERVICE_KEY = eyJhbGci...                  (from Step 1)
JWT_SECRET           = any-long-random-string-here
```

6. Click **Deploy** — Railway gives you a URL like:
   `https://gauntlet-tiers-backend.up.railway.app`

---

## 📋 STEP 3 — Connect Frontend to Backend

Open `js/auth.js` and `js/api.js` in VS Code.
Change this line at the top of BOTH files:

```js
// BEFORE:
const API_BASE = 'https://your-backend.com/api';

// AFTER (use your Railway URL):
const API_BASE = 'https://gauntlet-tiers-backend.up.railway.app/api';
```

---

## 📋 STEP 4 — Host the Frontend (GitHub Pages)

1. Create a new GitHub repository (e.g. `my-gauntlet-tiers`)
2. Upload all your front-end files:
   ```
   index.html
   css/
   js/
   pages/
   ```
3. Go to repo **Settings → Pages**
4. Set Source to: **Deploy from branch → main → / (root)**
5. Save — your site will be live at:
   `https://yourusername.github.io/my-gauntlet-tiers/`

---

## 📋 STEP 5 — Make Yourself an Admin

After you register on your site, run this in Supabase SQL Editor
(replace with your actual email):

```sql
UPDATE users SET is_admin = TRUE WHERE email = 'your@email.com';
```

Then logout and login again — the Admin link will appear in the navbar!

---

## 🗂️ File Structure Summary

```
gauntlet-tiers/           ← Upload these to GitHub Pages
├── index.html
├── css/style.css
├── js/auth.js
├── js/api.js
└── pages/
    ├── tierlist.html
    ├── login.html
    ├── signup.html
    ├── profile.html
    ├── admin.html
    ├── community.html
    └── support.html

backend/                  ← Upload these to a separate GitHub repo → Railway
├── server.js
└── package.json
```

---

## ✅ Features Included

| Feature | Status |
|---|---|
| Home page with hero, stats, features | ✅ |
| Tier list with 7 mode tabs (Overall, Sword, Axe, UHC, Pot, Crystal, SMP) | ✅ |
| HT1–LT5 tier system with color coding | ✅ |
| Login / Register with JWT auth | ✅ |
| Profile page showing tiers per mode | ✅ |
| Admin panel: add/remove players, change tiers | ✅ |
| Admin panel: manage users, toggle admin | ✅ |
| Community page (Discord + YouTube links) | ✅ |
| Support page with FAQ accordion | ✅ |
| Dark gaming aesthetic (Rajdhani + Exo 2 fonts) | ✅ |
| Mobile responsive navbar | ✅ |
| Supabase database | ✅ |
| Railway backend hosting | ✅ |
| GitHub Pages frontend hosting | ✅ |

---

## ❓ Common Issues

**"CORS error" in browser console**
→ Your backend is running but the frontend can't connect. Check that `API_BASE` in `auth.js` and `api.js` has the correct Railway URL.

**"relation does not exist" error**
→ The SQL tables weren't created. Go back to Supabase SQL Editor and run the CREATE TABLE commands again.

**Admin link doesn't show up**
→ Run the UPDATE SQL in Supabase to set yourself as admin, then log out and back in.

**Site shows but tier list is empty**
→ That's normal! Go to Admin panel and add players manually, or import them via Supabase SQL.