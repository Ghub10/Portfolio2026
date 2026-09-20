# Deploy Catch of the Day on Vercel

Repo: [github.com/Ghub10/Catch-Of-The-Day-Menu](https://github.com/Ghub10/Catch-Of-The-Day-Menu) (Create React App). Firebase keys live in `src/base.js`; no Firebase env vars are required on Vercel for an initial deploy.

## 1. Add Vercel config to the Catch-of-the-Day repo

Copy [`vercel.json`](./vercel.json) into the **root** of `Catch-Of-The-Day-Menu` (same folder as its `package.json`), commit, and push to GitHub.

## 2. Import on Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and **Import** the Git repository.
2. **Root Directory:** `./`
3. **Framework:** Create React App (or keep auto-detected).
4. Confirm (or override) project settings:

   | Setting            | Value            |
   | ------------------ | ---------------- |
   | Install Command    | `npm install`    |
   | Build Command      | `npm run build`  |
   | Output Directory   | `build`          |

5. Click **Deploy**.
6. When the deployment finishes, open the production URL (**`*.vercel.app`**) and confirm the app loads. If refreshes on sub-routes 404, the `rewrites` in `vercel.json` should fix it after redeploy.

**Node:** If the build fails with an old CRA / Node mismatch, try **Project → Settings → Node.js Version → 18.x** and redeploy.

## 3. Wire the Portfolio thumbnail

After deploy, copy your **HTTPS production URL**.

1. **Local Portfolio** (`Portfolio2026/.env.local`):

   ```env
   VITE_CATCH_OF_THE_DAY_URL=https://YOUR-PROJECT.vercel.app
   ```

   Restart `npm run dev` from [`Portfolio2026/Portfolio2026`](../../).

2. **Portfolio on Vercel:** Same variable under **Environment Variables**, then redeploy the portfolio site.

3. **Supabase** (optional): If `gallery_items` drives projects, set **`external_url`** on the Catch-of-the-Day row to the same URL (it overrides env in [`Projects.jsx`](../../src/pages/Projects.jsx)).

## 4. Checklist

- [ ] Production `*.vercel.app` loads the menu app.
- [ ] `VITE_CATCH_OF_THE_DAY_URL` set in portfolio `.env.local` and dev server restarted.
- [ ] `/projects` → Catch of the Day → opens that URL in a new tab.
