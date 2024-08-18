@ECHO OFF
TITLE npr
:start
set p1=%1%
set p2=%2%
set curPath=%cd%
node "%~dp0/npr_plugins/%1/index.js" "%curPath%/" "%1" "%2" "%3" "%4" "%5" "%6" "%7" "%8" "%9"