<p align="center"><img alt="Logo" src="https://i.imgur.com/yX7A3xR.png"></p>

# SPA-Framework
SPAf is a simple and barebones framework for developing modular and structured Single Page Applications, from just a simple file structure, a config file and ~130 lines of native JavaScript code.

## File Structure
The structure in SPAf is simple, inside a `modules` directory is the `config.json` file as well as sub-directories for each module containing all its files. The idea is to separate all the code into their own modules in a simple and logical way for better overview and organization. Here is an example overview of how it could look:
```bash
.
├── css
│   └── main.css
├── index.html
├── js
│   └── SPAf.js
└── modules
    ├── config.json
    ├── Some-Other-Demo-I-Guess
    │   ├── style.css
    │   └── content.html
    └── Demo-One
        ├── main.css
        ├── main.html
        └── test.js
```

## Config
The thing you're probably going to work the most with is the config file, this is where you define and add new modules. The modules become interactive by being added to a list (li elements inside ul) targeting the `spaf-nav` class, so you can freely choose where to display the modules and style it however you want.

## Creating a new module
To create a new module, you'll need to create a new directory inside `modules` as seen above in _File Structure_. This new directory is where you'll code all the components your module will contain, be it HTML, CSS or JavaScript.

### Dynamically add external files
I understand that people have their own preferred way of structuring their code. For example, if for some reason you'd want to have separate HTML files that will be added when certain conditions are met. To make something like this easier a _link_ element of class `spaf-module` is added with the path to the currently loaded module.

Since this is all from a single page you'll need the absolute path to the file of the module, with the `href` attribute of the modules directory you can add that plus the file you wanna add or interact with (this also prevents having to define the path multiple places).

### New module entry
Adding a new module is as simple as adding a new JSON array entry, with at least a `name`, `title`, and `content` file. External JavaScript and CSS files can then be loaded into the document with their respective arrays.
```JSON
{
    "modules": [
        {
            "name": "Demo-One",
            "title": "Test",
            "content": "main.html",
            "js": [
                "test.js"
            ],
            "css": [
                "main.css"
            ]
        },
        {
            "name": "Some-Other-Demo-I-Guess",
            "title": "Test 2",
            "content": "content.html",
            "css": ["style.css"]
        }
    ]
}
```

# Screenshot (GIF)
![GIF of small demo](https://image.ibb.co/fGhiTL/2018-10-29-21-02-41.gif)
