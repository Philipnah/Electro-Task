const fs = require("fs");
const electron = require("electron");
const rimraf = require("rimraf");

const usedFolder = electron.remote.app.getPath("documents");

console.log(usedFolder);

const userNoteFolder = "/Notes/";
const userNotePath = usedFolder + userNoteFolder;
var currentfileName = "note1.txt";
var userNoteTXT = userNotePath + currentfileName;
const dateTXT = userNotePath + "date.txt"

let mainWindow = electron.remote.getCurrentWindow();

function newFile() {
     console.log("New note will be created!")
     var newNote = document.getElementById("input").value
     console.log(newNote);
     
     var n = Math.trunc(Math.random() * 10000);
     var currentfileName = "note" + n + ".txt";

     var userNoteTXT = userNotePath + currentfileName;
     
     fs.open(userNoteTXT, 'wx', (err) => {
          if (err) {
               if (err.code === 'EEXIST') {
               console.error('myfile already exists');
               console.error("using another name");
               }
               throw err;
          }
        
          fs.writeFile(userNoteTXT, newNote, (err) => {
               if (err) throw err;
               console.log('The "data to write" was written to file!');
               
               mainWindow.reload();
          });
     });
     

}


function readFile() {
     console.log(userNoteTXT);
     fs.readdir(userNotePath, (err, files) => {
          if (err) {
               console.log("Folder doesn't exist, creating a new one");
               fs.mkdir(userNotePath, {recursive: false}, (err) => {
                    if (err) throw err;  
               });
               
               // I'm slicing the date here so in the year 10000 this won't really work
               var newDate = Date().slice(0, 15);
               console.log(newDate);

               fs.writeFile(dateTXT, newDate, (err) => {
                    if (err) throw err;
                    
                    console.log('The date has been written to its file!');

                    mainWindow.reload();
               });
               
               readFile()

          }

          files.forEach(file => {
          console.log(file);
          var currentfileName = file;

          var userNoteTXT = userNotePath + currentfileName;

          fs.readFile(userNoteTXT, "utf8", (err, data) => {
               if (err) throw err;
               if (userNoteTXT != dateTXT) {
                    console.log(data);
                    var content = data;

                    var divnote = document.createElement("DIV");
                    
                    divnote.innerHTML = content;
                    divnote.setAttribute("id", "noteContent");
                    document.getElementById("notes").appendChild(divnote);

               } else {
                    console.log(data);
                    var content = data;
                    
                    document.getElementById("date").innerHTML = content;
                    console.log("inserted date.txt");
               }
               

               });
          

          });
     });
     console.log("readFile() has been run");
}

function deleteFolder() {
     rimraf.sync(userNotePath);

     console.log("Reloading window.");
     
     readFile()
     mainWindow.reload();
}

readFile()