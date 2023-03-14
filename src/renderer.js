const { Terminal } = require('xterm');
const { FitAddon } = require('xterm-addon-fit');
const { BrowserWindow } = require('electron');


// Create a new terminal object
const terminal = new Terminal();

// Create a new fit addon object
const fitAddon = new FitAddon();

// Attach the fit addon to the terminal object
terminal.loadAddon(fitAddon);

// Attach the terminal object to the DOM element
terminal.open(document.getElementById('terminal'));

// Resize the terminal to fit the screen
fitAddon.fit();

// Write some text to the terminal
terminal.write('Welcome to Terminal!\r\n');


mainWindow = new BrowserWindow({
    webPreferences: {
      webSecurity: false
    }
  });
  