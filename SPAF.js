//  Configuration of the SPA.
var config = undefined;

//  Loading the modules external files.
function loadExternalFile(filename, filetype) {
    let fileref = undefined;

    //  Check what type of file it is,
    //  then create and add it to the DOM.
    if (filetype == "js" ) {
        fileref = document.createElement("script");
        fileref.setAttribute("type","text/javascript");
        fileref.setAttribute("src", filename);
        fileref.setAttribute("class", "spaf-external");
        document.querySelector("head").appendChild(fileref);
    } else if (filetype == "css") {
        fileref = document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", filename);
        fileref.setAttribute("class", "spaf-external");
        document.querySelector("head").appendChild(fileref);
    } else if (filetype == "html") {
        //  Send request to the HTML file to get the contents.
        let xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open("GET", filename, true);
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
                //  Set the SPAf Content to the HTML of the module.
                document.querySelector(".spaf-content").innerHTML = xobj.responseText;
            }
        };
        xobj.send(null);
    }
}

function setupSPAF(selectedIndex) {
    document.querySelector(".spaf-nav").innerHTML = "";

    //  Create UL element for listing all modules.
    let ul = document.createElement("ul");

    //  Iterate over all modules and add them to the UL.
    for (let index in config.modules) {
        if (config.modules.hasOwnProperty(index)) {
            module = config.modules[index];

            //  Create LI element and set the text and onClick function.
            let li = document.createElement("li");
            li.innerText = module.title;
            li.onclick = () => {
                spafSwitch(index);
            };

            if (selectedIndex && selectedIndex == index) {
                li.setAttribute("selected", "")
            } else if(selectedIndex && selectedIndex != index) {
                li.removeAttribute("selected");
            }

            //  Add LI to UL.
            ul.appendChild(li);
        }
    }

    //  Lastly, add the UL element to the SPAf Navigation
    document.querySelector(".spaf-nav").appendChild(ul);
}

function spafSwitch(index) {
    if (config.modules.hasOwnProperty(index)) {
        let module = config.modules[index];

        //  Remove all currently loaded external files.
        let externals = document.querySelectorAll(".spaf-external");
        for (let i = 0; i < externals.length; i++) {
            let external = externals[i];
            external.parentNode.removeChild(external);
        }

        let link = document.querySelector("link[type='spaf-module']");
        if (link)
            link.parentNode.removeChild(link);

        link = document.createElement("link");
        link.type = "spaf-module";
        link.href = "modules/"+ module.name +"/";
        document.querySelector("head").appendChild(link);

        //  Load the HTML content from the module.
        loadExternalFile("modules/"+ module.name +"/"+ module.content, "html");

        //  Iterate over all JavaScript files and add them to HEAD.
        if (module.js) {
            for (let i in module.js) {
                file = "modules/"+ module.name +"/"+ module.js[i];
                loadExternalFile(file, "js");
            }
        }

        //  Iterate over all CSS files and add them to HEAD.
        if (module.css) {
            for (let i in module.css) {
                file = "modules/"+ module.name +"/"+ module.css[i];
                loadExternalFile(file, "css");
            }
        }
    } else {
        //  Output log if the index does not exist.
        console.log("spafSwitch - Invalid module index '"+ index +"'");
    }
    setupSPAF(index);
}


//  Event for on DOM load.
document.addEventListener("DOMContentLoaded", function(e) {
    //  Send request to get configuration data.
    let xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open("GET", "modules/config.json", true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            //  Parse the configuration data to JSON and update 'config'.
            config = JSON.parse(xobj.responseText);

            //  Run SPAf setup.
            setupSPAF();
        }
    };
    xobj.send(null);
});