@echo off
chcp 65001 >nul
echo ============================================
echo   HOANG KHANG XNK ^& LOGISTICS
echo ============================================
echo.
echo Backend:  http://localhost:5030
echo Frontend: http://localhost:5174
echo.
echo Dang khoi dong...
echo.

start "HoangKhang Backend" cmd /k "cd /d "%~dp0backend" && node server.js"
timeout /t 2 /nobreak >nul
start "HoangKhang Frontend" cmd /k "cd /d "%~dp0frontend" && npm run dev"
timeout /t 3 /nobreak >nul
start http://localhost:5174

echo.
echo Website dang chay!
echo Backend:  http://localhost:5030
echo Frontend: http://localhost:5174
echo.
echo Dong cua so nay de dung server.
pause
