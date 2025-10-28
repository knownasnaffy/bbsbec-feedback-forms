@echo off
REM Add Bun to path for this session, in case it's not already present
set "BUN_HOME=%USERPROFILE%\.bun\bin"
set PATH=%PATH%;%BUN_HOME%

REM Start backend server
start "" bun run ./server/index.ts

REM Start frontend in webapp
cd webapp
bun run start
cd ..
pause
