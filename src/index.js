const { app, BrowserWindow } = require('electron');
const pty = require('node-pty');
const Terminal = require('term.js');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  const term = new Terminal({
    cols: 80,
    rows: 30,
    useStyle: true,
    screenKeys: true
  });

  term.on('data', (data) => {
    term.write(data);
  });

  term.open(win.webContents);
  term.focus();

  const shellProcess = pty.spawn('/bin/bash', [], {
    name: 'xterm-color',
    cols: 80,
    rows: 30,
    cwd: process.env.HOME,
    env: process.env
  });

  shellProcess.on('data', (data) => {
    term.write(data);
  });

  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
