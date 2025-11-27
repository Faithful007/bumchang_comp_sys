# Manual Deployment Script for GitHub Pages
# This script avoids path length issues on Windows

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Manual GitHub Pages Deployment" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$ErrorActionPreference = "Stop"

try {
    # Get current branch
    $currentBranch = git rev-parse --abbrev-ref HEAD
    Write-Host "Current branch: $currentBranch" -ForegroundColor Green
    
    # Check if build folder exists
    if (-not (Test-Path "build")) {
        Write-Host "ERROR: Build folder not found. Run 'npm run build' first." -ForegroundColor Red
        exit 1
    }
    
    Write-Host ""
    Write-Host "Step 1: Checking for gh-pages branch..." -ForegroundColor Yellow
    
    # Check if gh-pages branch exists remotely
    $ghPagesBranchExists = git ls-remote --heads origin gh-pages
    
    if ($ghPagesBranchExists) {
        Write-Host "gh-pages branch exists, fetching..." -ForegroundColor Green
        git fetch origin gh-pages
        
        # Delete local gh-pages if it exists
        $localGhPages = git branch --list gh-pages
        if ($localGhPages) {
            git branch -D gh-pages
        }
        
        # Create new gh-pages from remote
        git checkout -b gh-pages origin/gh-pages
    } else {
        Write-Host "Creating new gh-pages branch..." -ForegroundColor Green
        # Create orphan branch (no history)
        git checkout --orphan gh-pages
        git rm -rf .
    }
    
    Write-Host ""
    Write-Host "Step 2: Copying build files..." -ForegroundColor Yellow
    
    # Copy build contents to root (excluding build folder itself)
    Get-ChildItem -Path "build" -Recurse | ForEach-Object {
        $targetPath = $_.FullName.Replace((Get-Location).Path + "\build\", "")
        if ($_.PSIsContainer) {
            if (-not (Test-Path $targetPath)) {
                New-Item -ItemType Directory -Path $targetPath -Force | Out-Null
            }
        } else {
            Copy-Item $_.FullName -Destination $targetPath -Force
        }
    }
    
    Write-Host ""
    Write-Host "Step 3: Creating .nojekyll file..." -ForegroundColor Yellow
    # Create .nojekyll to bypass Jekyll processing
    New-Item -ItemType File -Path ".nojekyll" -Force | Out-Null
    
    Write-Host ""
    Write-Host "Step 4: Committing changes..." -ForegroundColor Yellow
    git add -A
    git commit -m "Deploy to GitHub Pages - $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
    
    Write-Host ""
    Write-Host "Step 5: Pushing to GitHub..." -ForegroundColor Yellow
    git push origin gh-pages --force
    
    Write-Host ""
    Write-Host "Step 6: Returning to original branch..." -ForegroundColor Yellow
    git checkout $currentBranch
    
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  Deployment Successful!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Your app will be available at:" -ForegroundColor Cyan
    Write-Host "https://faithful007.github.io/bumchang_comp_sys" -ForegroundColor White
    Write-Host ""
    Write-Host "Note: It may take 2-5 minutes for changes to appear" -ForegroundColor Yellow
    Write-Host ""
    
} catch {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "  Deployment Failed!" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Error: $_" -ForegroundColor Red
    Write-Host ""
    
    # Try to return to original branch
    try {
        git checkout $currentBranch
    } catch {
        Write-Host "Could not return to original branch" -ForegroundColor Yellow
    }
    
    exit 1
}
