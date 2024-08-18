@ECHO OFF
TITLE mock

SET curPath=%cd%

:start
set p1=%1%
set p2=%2% 
set port=8888
set serverfile=""
set swi=0
echo %p1%|findstr /be "[0-9]*" >nul &&  set swi=1 || set swi=2


if %swi%==1   set  port=%p1%
if %swi%==2   set  serverfile=%p1% 
if %swi%==2   set  port=%p2%
if %swi%==2   (if not "%1" == ""  curl %serverfile% > server.js)
echo port=%port%
echo serverfile=%serverfile%
node "%~dp0/ming_api_mock.js" "%curPath%/" %port% "%1" "%2" "%3" "%4" "%5" "%6" "%7" "%8" "%9"
