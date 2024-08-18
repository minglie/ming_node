@ECHO OFF
TITLE mock
SET curPath=%cd%
node "%~dp0/npr_plugins/%1/index.js"