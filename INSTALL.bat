@echo off
REM Install Bun on Windows (PowerShell required)
powershell -Command "irm bun.sh/install.ps1 | iex"

REM Add Bun to path for this session, if not already done by installer
set "BUN_HOME=%USERPROFILE%\.bun\bin"
set PATH=%PATH%;%BUN_HOME%

REM Install root dependencies
bun install

REM Install and Build in subfolder
cd webapp
bun install
bun run build
cd ..
pause
