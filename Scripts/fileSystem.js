const fs = require("fs");

//const shell = new ActiveXObject("WScript.Shell");
//const pathToMyDocuments = shell.SpecialFolders('MyDocuments'); muligvis bare "Documents"

var usedFolder = __dirname;

var userNoteFolder = "/Notes/";
var userNotePath = usedFolder + userNoteFolder;
var currentfileName = "note1.txt";
var userNoteTXT = userNotePath + currentfileName;

// __dirname ends without a slash

function newFile() {
     console.log("New note will be created!")
     var newNote = document.getElementById("input").value
     console.log(newNote);
     
     
     //fs.access(file, fs.constants.F_OK, (err) => {
     //     console.log(`${file} ${err ? 'does not exist' : 'exists'}`);
     //   });

     var currentfileName = "message.txt";

     var userNoteTXT = userNotePath + currentfileName;
     fs.writeFile(userNoteTXT, newNote, (err) => {
          if (err) throw err;
          console.log('The "data to write" was written to file!');
        });

}


function readFile() {
     console.log(userNoteTXT);
     fs.readdir(userNotePath, (err, files) => {
          if (err) throw err;
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
               document.getElementById("notes").appendChild(divnote);
          });

          });
     });

     

     
}

function deleteFile() {
     
}

readFile()