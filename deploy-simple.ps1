# Simple Git-Based Deployment for GitHub Pages
# This is the most reliable method for Windows

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  GitHub Pages Deployment (Git Method)" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Store current branch
$originalBranch = git rev-parse --abbrev-ref HEAD
Write-Host "Current branch: $originalBranch" -ForegroundColor Green
Write-Host ""

# Step 1: Build the project
Write-Host "Building project..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed!" -ForegroundColor Red
    exit 1
}

# Step 2: Navigate to build folder
Write-Host ""
Write-Host "Navigating to build folder..." -ForegroundColor Yellow
cd build

# Step 3: Initialize git in build folder (if not already)
if (-not (Test-Path ".git")) {
    Write-Host "Initializing git in build folder..." -ForegroundColor Yellow
    git init
}

# Step 4: Add all files
Write-Host ""
Write-Host "Adding files..." -ForegroundColor Yellow
git add -A

# Step 5: Commit
Write-Host "Creating commit..." -ForegroundColor Yellow
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
git commit -m "Deploy to GitHub Pages - $timestamp"

# Step 6: Add remote if it doesn't exist
$remoteExists = git remote | Select-String -Pattern "origin"
if (-not $remoteExists) {
    Write-Host "Adding remote..." -ForegroundColor Yellow
    git remote add origin https://github.com/Faithful007/bumchang_comp_sys.git
}

# Step 7: Push to gh-pages branch
Write-Host ""
Write-Host "Pushing to gh-pages branch..." -ForegroundColor Yellow
git push origin HEAD:gh-pages --force

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  Deployment Successful!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Your site will be available at:" -ForegroundColor Cyan
    Write-Host "https://faithful007.github.io/bumchang_comp_sys" -ForegroundColor White
    Write-Host ""
    Write-Host "Configure GitHub Pages (if first time):" -ForegroundColor Yellow
    Write-Host "1. Go to: https://github.com/Faithful007/bumchang_comp_sys/settings/pages" -ForegroundColor White
    Write-Host "2. Set Source to: gh-pages branch, / (root)" -ForegroundColor White
    Write-Host "3. Click Save" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "Push failed! You may need to authenticate." -ForegroundColor Red
    Write-Host "Try running: git push origin HEAD:gh-pages --force" -ForegroundColor Yellow
}

# Step 8: Return to project root
Write-Host ""
Write-Host "Returning to project root..." -ForegroundColor Yellow
cd ..

Write-Host ""
Write-Host "Done!" -ForegroundColor Green
