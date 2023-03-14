const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false, // désactivé pour des raisons de sécurité
      contextIsolation: true, // activé pour des raisons de sécurité
      enableRemoteModule: false, // désactivé pour des raisons de sécurité
      preload: path.join(__dirname, 'preload.js'),
      worldSafeExecuteJavaScript: true, // activé pour des raisons de sécurité
      sandbox: true // activé pour des raisons de sécurité
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  mainWindow.on('closed', function () {
    app.quit();
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
