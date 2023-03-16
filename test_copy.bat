cd restapi
START /B ""npm install
start /B cmd.exe /k "npm start"
cd ..
cd webapp
npm install
CMD /c "npm start"
cd ..