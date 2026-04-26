# Fördermatch.hh — Deployment auf Cloudflare Pages

## Option A: Über GitHub (empfohlen)

### 1. GitHub Repository erstellen
```bash
cd foerdermatch-hh
git init
git add .
git commit -m "Initial commit: Fördermatch.hh"
git branch -M main
git remote add origin https://github.com/DEIN-USERNAME/foerdermatch-hh.git
git push -u origin main
```

### 2. Cloudflare Pages verbinden
1. Gehe zu [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create**
2. Klicke auf **Pages** → **Connect to Git**
3. Wähle dein GitHub-Repository `foerdermatch-hh`
4. Build-Einstellungen:
   - **Framework preset:** `Vite`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. Klicke **Save and Deploy**

Deine Seite ist dann live unter `foerdermatch-hh.pages.dev`

### 3. Custom Domain (optional)
1. Im Cloudflare Pages Projekt → **Custom domains**
2. Füge deine Domain hinzu (z.B. `foerdermatch.de`)
3. DNS wird automatisch konfiguriert wenn die Domain bei Cloudflare liegt

---

## Option B: Direkt per CLI

### 1. Wrangler installieren
```bash
npm install -g wrangler
wrangler login
```

### 2. Bauen und deployen
```bash
npm run build
wrangler pages deploy dist --project-name=foerdermatch-hh
```

---

## Lokale Entwicklung

```bash
npm install
npm run dev
```

Öffne http://localhost:5173
