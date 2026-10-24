@echo off
setlocal
powershell.exe -NoLogo -NoProfile -STA -ExecutionPolicy Bypass -File "%~dp0tools\competition-launch.ps1" -Action Check
set "UED_RESULT=%ERRORLEVEL%"
pause
exit /b %UED_RESULT%
