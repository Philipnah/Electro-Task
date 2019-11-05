const electron = require("electron");
const url = require("url");
const path = require("path");



const {app, BrowserWindow, globalShortcut} = electron;

let mainWindow


app.on("ready", function(){
     mainWindow = new BrowserWindow({
          autoHideMenuBar: true,
          webPreferences: {nodeIntegration: true},
          minWidth: 400
     });

     

     //load index.html
     mainWindow.loadURL(url.format({
          pathname: path.join(__dirname, "index.html"),
          protocol: "file:",
          slashes: true
     }));

     globalShortcut.register('CommandOrControl+Q', () => {
          console.log('CommandOrControl+Q is pressed')
          
     });
     
});