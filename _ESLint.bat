@echo off
cd /d %~dp0
call eslint *.js
pause
