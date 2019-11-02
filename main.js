const electron = require("electron");
const url = require("url");
const path = require("path");



const {app, BrowserWindow} = electron;

let mainWindow


app.on("ready", function(){
     mainWindow = new BrowserWindow({
          autoHideMenuBar: true,
          webPreferences: {nodeIntegration: true}
     });

     

     //load index.html
     mainWindow.loadURL(url.format({
          pathname: path.join(__dirname, "index.html"),
          protocol: "file:",
          slashes: true
     }));
     
});