# Quick Start: Deploy to GitHub Pages

## 🚀 Fastest Way (2 commands)

```powershell
# Option 1: Use the deploy script
.\deploy.ps1

# Option 2: Direct command
npm run deploy
```

## 📋 What You Need

- Git repository: `https://github.com/Faithful007/bumchang_comp_sys`
- GitHub account with push access
- Node.js and npm installed

## ⚡ Step-by-Step

### 1. First Time Setup (One-time only)

```powershell
# Make sure you're in the project directory
cd c:\Users\USER\sourcecodes\auto-excel\comp-engine2

# Commit your latest changes
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### 2. Deploy

```powershell
npm run deploy
```

### 3. Configure GitHub (First time only)

1. Go to: https://github.com/Faithful007/bumchang_comp_sys/settings/pages
2. Under **Source**, select:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
3. Click **Save**

### 4. Visit Your Site

After 2-5 minutes, your app will be live at:
```
https://faithful007.github.io/bumchang_comp_sys
```

## 🔄 Updating Your Site

Just run:
```powershell
npm run deploy
```

## 🤖 Automatic Deployment (Optional)

Want automatic deployment on every push?

1. Push the GitHub Actions workflow:
```powershell
git add .github/workflows/deploy.yml
git commit -m "Add auto-deploy workflow"
git push origin main
```

2. Enable workflow permissions:
   - Go to: https://github.com/Faithful007/bumchang_comp_sys/settings/actions
   - Under "Workflow permissions", select "Read and write permissions"
   - Click Save

Now every push to `main` will automatically deploy!

## ✅ Verification Checklist

- [ ] `package.json` homepage: `"https://faithful007.github.io/bumchang_comp_sys"`
- [ ] `gh-pages` package installed ✓
- [ ] Deployment scripts added ✓
- [ ] GitHub Pages configured to use `gh-pages` branch
- [ ] Site accessible at: https://faithful007.github.io/bumchang_comp_sys

## 🐛 Troubleshooting

**Problem:** 404 Error  
**Solution:** Check GitHub Settings → Pages → Source is set to `gh-pages`

**Problem:** Blank page  
**Solution:** Clear browser cache, wait 5 minutes for GitHub Pages to update

**Problem:** Deploy command fails  
**Solution:** Run `npm install --save-dev gh-pages` and try again

## 📚 More Info

See `DEPLOYMENT.md` for detailed documentation.

---

**Your site URL:** https://faithful007.github.io/bumchang_comp_sys
