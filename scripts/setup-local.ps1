$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent $PSScriptRoot
$Backend = Join-Path $Root "backend"
$Frontend = Join-Path $Root "frontend"
$VenvPython = Join-Path $Backend "venv\Scripts\python.exe"
$VenvPip = Join-Path $Backend "venv\Scripts\pip.exe"

Write-Host "==> Configurando entorno local (rama dev)" -ForegroundColor Cyan

if (-not (Test-Path $VenvPython)) {
    Write-Host "==> Creando venv de Python..." -ForegroundColor Yellow
    python -m venv (Join-Path $Backend "venv")
}

Write-Host "==> Instalando dependencias del backend..." -ForegroundColor Yellow
& $VenvPip install -r (Join-Path $Backend "requirements.txt")

if (-not (Test-Path (Join-Path $Backend ".env"))) {
    Copy-Item (Join-Path $Backend ".env.example") (Join-Path $Backend ".env")
    Write-Host "==> Creado backend/.env" -ForegroundColor Green
}

if (-not (Test-Path (Join-Path $Frontend ".env"))) {
    Copy-Item (Join-Path $Frontend ".env.example") (Join-Path $Frontend ".env")
    Write-Host "==> Creado frontend/.env" -ForegroundColor Green
}

Write-Host "==> Migraciones y datos demo..." -ForegroundColor Yellow
Push-Location $Backend
& $VenvPython manage.py migrate --noinput
& $VenvPython manage.py setup_render
Pop-Location

Write-Host "==> Instalando dependencias del frontend..." -ForegroundColor Yellow
Push-Location $Frontend
npm install
Pop-Location

Write-Host ""
Write-Host "Listo. Ejecuta:" -ForegroundColor Green
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "URLs:" -ForegroundColor Green
Write-Host "  Frontend  http://localhost:5173" -ForegroundColor White
Write-Host "  API       http://127.0.0.1:8000/api/" -ForegroundColor White
Write-Host "  Admin     http://127.0.0.1:8000/admin/  (admin / admin123)" -ForegroundColor White
