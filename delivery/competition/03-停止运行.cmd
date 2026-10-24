@echo off
setlocal
powershell.exe -NoLogo -NoProfile -STA -ExecutionPolicy Bypass -File "%~dp0tools\competition-launch.ps1" -Action Stop
set "UED_RESULT=%ERRORLEVEL%"
if not "%UED_RESULT%"=="0" pause
exit /b %UED_RESULT%
