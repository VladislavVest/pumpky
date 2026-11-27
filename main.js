const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1160,
    height: 740,
    resizable: false,
    maximizable: false,
    backgroundColor: '#0b0e17',
    show: false,
    autoHideMenuBar: true,
    title: 'Pumpky - Task Tracker',
    icon: path.join(__dirname, 'Sourses', 'img', 'halloween.png'),
        webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.loadFile(path.join(__dirname, 'index.html'));

  win.once('ready-to-show', () => {
    win.show();
  });
}

ipcMain.on('quit-app', () => {
  app.quit();
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});