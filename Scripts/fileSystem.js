const fs = require("fs");

var userDocumentsPath = "D:/Dokumenter";
var userNotePath = userDocumentsPath + "/electronnote_docs/";

var currentfileName = "file.txt";
var userNoteTXT = userNotePath + currentfileName;


function newFile() {
     console.log("New note will be created!")
}


function readFile() {
     console.log(userNoteTXT);

     fs.readFile(userNoteTXT, "utf8", (err, data) => {
          if (err) throw err;
          console.log(data);
          var content = data;

          document.getElementById("notes").innerHTML = content;
          });

     
}



readFile()
