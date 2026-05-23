@echo off
chcp 65001 >nul
echo ============================================
echo   HOANG KHANG XNK ^& LOGISTICS - INSTALL
echo ============================================
echo.

echo [1/2] Cai dat Backend dependencies...
cd /d "%~dp0backend"
call npm install
if errorlevel 1 (
    echo LOI: Khong the cai dat backend!
    pause
    exit /b 1
)
echo Backend OK!
echo.

echo [2/2] Cai dat Frontend dependencies...
cd /d "%~dp0frontend"
call npm install
if errorlevel 1 (
    echo LOI: Khong the cai dat frontend!
    pause
    exit /b 1
)
echo Frontend OK!
echo.

echo ============================================
echo   CAI DAT HOAN TAT!
echo   Chay start.bat de khoi dong website
echo ============================================
pause
