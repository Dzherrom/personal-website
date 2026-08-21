$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent $PSScriptRoot
$Backend = Join-Path $Root "backend"
$Frontend = Join-Path $Root "frontend"

if (-not (Test-Path (Join-Path $Backend ".env"))) {
    Write-Host "Falta backend/.env. Ejecuta primero: npm run setup" -ForegroundColor Red
    exit 1
}

if (-not (Test-Path (Join-Path $Frontend ".env"))) {
    Write-Host "Falta frontend/.env. Ejecuta primero: npm run setup" -ForegroundColor Red
    exit 1
}

Write-Host "Iniciando backend (8000) y frontend (5173)..." -ForegroundColor Cyan
Write-Host "Cierra las ventanas de terminal para detener los servicios." -ForegroundColor DarkGray

Start-Process powershell -ArgumentList @(
    "-NoExit",
    "-Command",
    "Set-Location '$Backend'; .\venv\Scripts\Activate.ps1; python manage.py runserver 127.0.0.1:8000"
)

Start-Sleep -Seconds 2

Start-Process powershell -ArgumentList @(
    "-NoExit",
    "-Command",
    "Set-Location '$Frontend'; npm run dev"
)

Write-Host ""
Write-Host "  Frontend  http://localhost:5173" -ForegroundColor Green
Write-Host "  API       http://127.0.0.1:8000/api/" -ForegroundColor Green
