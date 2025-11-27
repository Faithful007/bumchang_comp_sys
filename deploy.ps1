# Quick Deploy Script for GitHub Pages
# Run this script to deploy your application

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Comp Engine - GitHub Pages Deployment" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if git is available
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: Git is not installed or not in PATH" -ForegroundColor Red
    exit 1
}

# Check if npm is available
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: npm is not installed or not in PATH" -ForegroundColor Red
    exit 1
}

Write-Host "Step 1: Checking git status..." -ForegroundColor Yellow
$gitStatus = git status --porcelain
if ($gitStatus) {
    Write-Host "You have uncommitted changes:" -ForegroundColor Yellow
    git status --short
    Write-Host ""
    $commit = Read-Host "Do you want to commit and push these changes? (y/n)"
    
    if ($commit -eq 'y' -or $commit -eq 'Y') {
        $message = Read-Host "Enter commit message"
        if (-not $message) {
            $message = "Update before deployment"
        }
        
        Write-Host "Committing changes..." -ForegroundColor Green
        git add .
        git commit -m "$message"
        
        Write-Host "Pushing to main branch..." -ForegroundColor Green
        git push origin main
        
        if ($LASTEXITCODE -ne 0) {
            Write-Host "ERROR: Failed to push to main branch" -ForegroundColor Red
            exit 1
        }
    }
}

Write-Host ""
Write-Host "Step 2: Building and deploying to GitHub Pages..." -ForegroundColor Yellow
Write-Host "This may take a few minutes..." -ForegroundColor Gray
Write-Host ""

npm run deploy

if ($LASTEXITCODE -eq 0) {
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
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Go to: https://github.com/Faithful007/bumchang_comp_sys/settings/pages" -ForegroundColor White
    Write-Host "2. Ensure 'Source' is set to 'gh-pages' branch" -ForegroundColor White
    Write-Host "3. Wait a few minutes and visit your site" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "  Deployment Failed!" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Common issues:" -ForegroundColor Yellow
    Write-Host "1. Check if gh-pages package is installed: npm install --save-dev gh-pages" -ForegroundColor White
    Write-Host "2. Ensure you have push access to the repository" -ForegroundColor White
    Write-Host "3. Check git credentials are configured" -ForegroundColor White
    Write-Host ""
    Write-Host "For more help, see DEPLOYMENT.md" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
