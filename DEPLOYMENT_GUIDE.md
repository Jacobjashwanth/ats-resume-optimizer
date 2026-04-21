# 🚀 Deployment Guide

Complete guide to deploy your ATS Resume Optimizer to production.

## 📋 Pre-Deployment Checklist

- [ ] All dependencies installed (`npm install`)
- [ ] App runs locally (`npm run dev`)
- [ ] Build succeeds (`npm run build`)
- [ ] No TypeScript errors
- [ ] Tested with sample resumes
- [ ] GitHub repository created

## 🌐 Deployment Options

### Option 1: Vercel (Recommended - Easiest)

**Why Vercel?**
- ✅ Fastest deployment (30 seconds)
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Free tier generous
- ✅ Zero configuration needed

**Steps:**

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/ats-resume-optimizer.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   
   **Option A: One-Click Deploy**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Click "Deploy" (no configuration needed!)
   
   **Option B: CLI Deploy**
   ```bash
   npm i -g vercel
   vercel login
   vercel
   # Follow prompts
   vercel --prod
   ```

3. **Done!** Your site is live at `https://your-project.vercel.app`

**Custom Domain (Optional):**
1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain (e.g., `atsresume.com`)
3. Update DNS records as shown
4. Done! Auto HTTPS enabled

---

### Option 2: Netlify (Great Alternative)

**Why Netlify?**
- ✅ Generous free tier
- ✅ Easy drag-and-drop deployment
- ✅ Great for static sites
- ✅ Automatic HTTPS

**Steps:**

1. **Build Your Project**
   ```bash
   npm run build
   ```

2. **Deploy**
   
   **Option A: Drag & Drop**
   - Go to [app.netlify.com/drop](https://app.netlify.com/drop)
   - Drag the `dist` folder
   - Done!
   
   **Option B: Git Integration**
   - Go to [app.netlify.com](https://app.netlify.com)
   - Click "New site from Git"
   - Connect GitHub repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy site"
   
   **Option C: CLI**
   ```bash
   npm i -g netlify-cli
   netlify login
   netlify deploy --prod --dir=dist
   ```

3. **Your site is live!** Get a URL like `https://your-site.netlify.app`

---

### Option 3: Cloudflare Pages (Best Performance)

**Why Cloudflare Pages?**
- ✅ Global CDN with 275+ locations
- ✅ Unlimited bandwidth (free!)
- ✅ Best performance
- ✅ DDoS protection

**Steps:**

1. **Push to GitHub** (same as Vercel)

2. **Deploy to Cloudflare**
   - Go to [dash.cloudflare.com](https://dash.cloudflare.com)
   - Pages → Create a project
   - Connect to GitHub
   - Select repository
   - Build settings:
     - Framework preset: `Vite`
     - Build command: `npm run build`
     - Build output: `dist`
   - Click "Save and Deploy"

3. **Live at** `https://your-project.pages.dev`

---

### Option 4: GitHub Pages (Free Forever)

**Why GitHub Pages?**
- ✅ 100% free
- ✅ No signup needed (uses GitHub)
- ✅ Perfect for open source projects

**Steps:**

1. **Update vite.config.ts**
   ```typescript
   export default defineConfig({
     base: '/ats-resume-optimizer/', // your repo name
     plugins: [react()],
   })
   ```

2. **Install gh-pages**
   ```bash
   npm install -D gh-pages
   ```

3. **Add deploy script to package.json**
   ```json
   {
     "scripts": {
       "deploy": "npm run build && gh-pages -d dist"
     }
   }
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**
   - Go to your repo → Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages`
   - Save

6. **Live at** `https://yourusername.github.io/ats-resume-optimizer`

---

## 🔧 Custom Domain Setup

### For Vercel:
1. Dashboard → Project → Settings → Domains
2. Add domain
3. Update DNS:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

### For Netlify:
1. Site settings → Domain management → Add custom domain
2. Update DNS:
   ```
   Type: A
   Name: @
   Value: 75.2.60.5
   
   Type: CNAME
   Name: www
   Value: your-site.netlify.app
   ```

### For Cloudflare Pages:
1. Already on Cloudflare! Just add a CNAME:
   ```
   Type: CNAME
   Name: @
   Value: your-project.pages.dev
   ```

---

## 📊 Analytics Setup (Optional)

### Google Analytics

1. **Get tracking ID** from [analytics.google.com](https://analytics.google.com)

2. **Add to index.html** (before `</head>`):
   ```html
   <!-- Google Analytics -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```

### Plausible (Privacy-Friendly Alternative)

1. Sign up at [plausible.io](https://plausible.io)
2. Add script to `index.html`:
   ```html
   <script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
   ```

---

## 🐛 Troubleshooting

### Build Fails

**Error: "Module not found"**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Error: "TypeScript errors"**
```bash
# Check types
npm run tsc --noEmit

# Fix auto-fixable issues
npm run lint -- --fix
```

### Blank Page After Deployment

**Check console for errors:**
1. Open deployed site
2. Press F12 (Developer Tools)
3. Check Console tab for errors

**Common fix - Update base path:**
```typescript
// vite.config.ts
export default defineConfig({
  base: '/', // for root domain
  // OR
  base: '/repo-name/', // for GitHub Pages
})
```

### 404 on Refresh

**Vercel/Netlify:** Already configured via `vercel.json` / `netlify.toml`

**GitHub Pages:** Add `404.html` that redirects to `index.html`

---

## 🎯 Performance Optimization

### Enable Compression

**Vercel/Netlify:** Automatic ✅

**Self-hosted:** Add to server config:
```nginx
# nginx
gzip on;
gzip_types text/css application/javascript application/json;
```

### Enable Caching

Add to `vite.config.ts`:
```typescript
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        'react-vendor': ['react', 'react-dom'],
        'utils': ['zustand', 'lucide-react']
      }
    }
  }
}
```

---

## 📈 Post-Deployment

### Test Your Site

- [ ] Upload different resume formats (DOCX, PDF, TXT)
- [ ] Test on mobile devices
- [ ] Test with/without job description
- [ ] Check all score categories display correctly
- [ ] Verify recommendations show up
- [ ] Test drag-and-drop upload

### Share Your Work

- [ ] Add to your portfolio
- [ ] Share on LinkedIn
- [ ] Post on Reddit (r/resumes, r/jobs)
- [ ] Share on Twitter/X
- [ ] Add to Product Hunt

### Monitor

- [ ] Set up uptime monitoring ([UptimeRobot](https://uptimerobot.com) - free)
- [ ] Check analytics weekly
- [ ] Monitor for errors (Sentry, LogRocket)

---

## 🆘 Need Help?

- **Build Issues:** Check [GitHub Issues](https://github.com/yourusername/ats-resume-optimizer/issues)
- **Deployment Issues:** Platform-specific docs (Vercel, Netlify, Cloudflare)
- **Questions:** Open a [Discussion](https://github.com/yourusername/ats-resume-optimizer/discussions)

---

## ✅ Success!

Your ATS Resume Optimizer is now live and helping job seekers! 🎉

**Next Steps:**
- Star ⭐ this repo
- Share with friends
- Contribute improvements
- Add to your resume as a project!
