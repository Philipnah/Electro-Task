const fs = require("fs");
const electron = require("electron");


const usedFolder = electron.remote.app.getPath("documents");

console.log(usedFolder);

var userNoteFolder = "/Notes/";
var userNotePath = usedFolder + userNoteFolder;
var currentfileName = "note1.txt";
var userNoteTXT = userNotePath + currentfileName;

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
               
               // create new date and insert into html and it should be remembered so even if you exit the app and come back it will still be there
               // perhaps by making a txt file named: date.txt and with the date as the content.
               readFile()

          }

          files.forEach(file => {
          console.log(file);
          var currentfileName = file;

          var userNoteTXT = userNotePath + currentfileName;

          fs.readFile(userNoteTXT, "utf8", (err, data) => {
               if (err) throw err;
               console.log(data);
               var content = data;

               var divnote = document.createElement("DIV");
               // perhaps find a way to give each div an id 
               divnote.innerHTML = content;
               divnote.setAttribute("id", "noteContent");
               document.getElementById("notes").appendChild(divnote);

               /*var deleteButton = document.createElement("button");
               deleteButton.innerHTML = "Delete"
               deleteButton.setAttribute("id", userNoteTXT);
               deleteButton.setAttribute("class", "btn btn-sm btn-outline-secondary");
               document.getElementById("noteContent").appendChild(deleteButton);*/
               

          });

          });
     });

     console.log("readFile() has been run");

     
}

function deleteFile() {
     
     /*fs.unlink(path, (err) => {
          if (err) {
            console.error(err)
            return
          }
        
          console.log("file removed");
        }) */
     
     // call the button "clear"
     
     console.log("File will be deleted. Reloading window.");
     mainWindow.reload();
}

readFile()