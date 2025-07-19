@echo off
cd /d %~dp0
call npx eslint . --config eslint.config.mjs
pause
