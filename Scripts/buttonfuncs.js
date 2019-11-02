const fs = require("fs");
const {dialog} = require("electron").remote;

document.getElementById("btn-createfile").addEventListener("click", () => {
    let content = "This is the content of the file";

    dialog.showSaveDialog((filename) => {
        if (filename === undefined){
            console.log("user clicked button but didn't create a file");
            return;
        }

        fs.writeFile(filename, content, (err) => {
            if (err){
                console.log("an error occurred whilst creating the file" + err.message);
                return;
            }

            alert("file succesfully created");
        });
    });
}, false);