# GitHub Pages Deployment Guide

This guide explains how to deploy the Comp Engine application to GitHub Pages.

## Prerequisites

1. GitHub account with repository access
2. Git installed and configured
3. Node.js and npm installed

## Method 1: Manual Deployment (Quick Start)

### Step 1: Ensure Repository is Set Up

Make sure your code is pushed to GitHub:

```bash
git add .
git commit -m "Prepare for GitHub Pages deployment"
git push origin main
```

### Step 2: Deploy to GitHub Pages

Run the deployment command:

```bash
npm run deploy
```

This command will:
- Build the production version of your app
- Create/update the `gh-pages` branch
- Push the built files to GitHub

### Step 3: Configure GitHub Repository Settings

1. Go to your GitHub repository: `https://github.com/Faithful007/bumchang_comp_sys`
2. Click on **Settings** tab
3. Scroll down to **Pages** section (left sidebar)
4. Under **Source**, select:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
5. Click **Save**

### Step 4: Access Your Deployed App

After a few minutes, your app will be available at:
```
https://faithful007.github.io/bumchang_comp_sys
```

## Method 2: GitHub Actions (Automatic Deployment)

For automatic deployment on every push to main branch:

### Step 1: Enable GitHub Actions

A `.github/workflows/deploy.yml` file has been created. To enable it:

1. Push the workflow file to GitHub:
```bash
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Actions deployment workflow"
git push origin main
```

2. Go to your repository on GitHub
3. Click **Settings** → **Actions** → **General**
4. Under "Workflow permissions", select:
   - ✅ Read and write permissions
   - Click **Save**

### Step 2: Automatic Deployment

Now, every time you push to the `main` branch, GitHub Actions will automatically:
- Build your app
- Deploy to GitHub Pages
- Make it available at your GitHub Pages URL

## Updating Your Deployed App

### Manual Method:
```bash
npm run deploy
```

### Automatic Method:
Just push to main branch:
```bash
git add .
git commit -m "Your update message"
git push origin main
```

## Troubleshooting

### Issue: 404 Error After Deployment

**Solution:** Make sure:
1. Repository Settings → Pages → Source is set to `gh-pages` branch
2. The `homepage` field in `package.json` matches your GitHub Pages URL
3. Wait 2-5 minutes after deployment for changes to propagate

### Issue: Blank Page After Deployment

**Solution:** Check browser console for errors. Usually caused by:
1. Incorrect `homepage` URL in `package.json`
2. Missing `HashRouter` or `BrowserRouter` configuration
3. Asset path issues

Current configuration uses `HashRouter` which should work with GitHub Pages.

### Issue: Assets Not Loading

**Solution:** Verify the `homepage` field in `package.json`:
```json
"homepage": "https://faithful007.github.io/bumchang_comp_sys"
```

### Issue: Deployment Command Fails

**Solution:** 
1. Ensure `gh-pages` package is installed: `npm install --save-dev gh-pages`
2. Check git credentials are configured
3. Ensure you have push access to the repository

## Build Commands Reference

| Command | Description |
|---------|-------------|
| `npm start` | Run development server locally |
| `npm run build` | Create production build in `build/` folder |
| `npm run deploy` | Build and deploy to GitHub Pages |
| `npm test` | Run tests |

## File Structure After Deployment

```
bumchang_comp_sys/
├── main branch (source code)
│   ├── src/
│   ├── public/
│   └── package.json
│
└── gh-pages branch (deployed build)
    ├── index.html
    ├── static/
    └── asset-manifest.json
```

## Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file to the `public/` folder with your domain:
```
yourdomain.com
```

2. Configure DNS settings with your domain provider:
```
Type: CNAME
Host: www (or @)
Value: faithful007.github.io
```

3. In GitHub Settings → Pages → Custom domain, enter your domain

## Security Notes

- The app is served over HTTPS automatically by GitHub Pages
- Environment variables in `.env` files are NOT included in the build
- Sensitive data should never be committed to the repository

## Monitoring Deployment

### Via GitHub Actions:
1. Go to your repository
2. Click **Actions** tab
3. View workflow runs and logs

### Via Command Line:
Check deployment status:
```bash
git fetch origin gh-pages
git log origin/gh-pages -1
```

## Rollback to Previous Version

If you need to rollback:

```bash
# View deployment history
git log origin/gh-pages

# Rollback to specific commit
git checkout origin/gh-pages
git reset --hard <commit-hash>
git push origin gh-pages --force
```

## Support

For issues specific to GitHub Pages, refer to:
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Create React App Deployment Docs](https://create-react-app.dev/docs/deployment/#github-pages)

## Quick Deploy Checklist

- [ ] Code pushed to main branch
- [ ] `package.json` homepage field is correct
- [ ] `gh-pages` package installed
- [ ] Run `npm run deploy`
- [ ] GitHub Settings → Pages configured to use `gh-pages` branch
- [ ] Wait 2-5 minutes for deployment
- [ ] Visit `https://faithful007.github.io/bumchang_comp_sys`

---

**Last Updated:** November 27, 2025
