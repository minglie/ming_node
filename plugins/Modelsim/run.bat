rmdir /s /q work
del server.js
del vsim.wlf
del transcript
set MY_PARAM=%1%
modelsim -do top.do