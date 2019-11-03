const fs = require("fs");

var userDocumentsPath = "D:/Dokumenter";
var userNotePath = userDocumentsPath + "/electronnote_docs/";

var currentfileName = "note1.txt";
var userNoteTXT = userNotePath + currentfileName;

fs.readdir(userNotePath, (err, files) => {
     files.forEach(file => {
       console.log(file);
     });
   });

function newFile() {
     console.log("New note will be created!")
     var newNote = document.getElementById("input").value
     console.log(newNote);
     
     var currentfileName = "message.txt";
     var userNoteTXT = userNotePath + currentfileName;
     fs.writeFile(userNoteTXT, newNote, (err) => {
          if (err) throw err;
          console.log('The "data to write" was written to file!');
        });

}


function readFile() {
     console.log(userNoteTXT);

     fs.readFile(userNoteTXT, "utf8", (err, data) => {
          if (err) throw err;
          console.log(data);
          var content = data;

          document.getElementById("notes").innerHTML = content + "<br>";
     });

     
}


readFile()