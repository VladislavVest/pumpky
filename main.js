const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const { autoUpdater } = require('electron-updater');
const path = require('path');

let isInstallingUpdate = false;

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
      backgroundThrottling: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.loadFile(path.join(__dirname, 'index.html'));

  win.once('ready-to-show', () => {
    win.show();
  });

  return win;
}

function setupAutoUpdater(mainWindow) {
  if (!app.isPackaged) {
    return;
  }

  autoUpdater.autoDownload = true;
  autoUpdater.autoInstallOnAppQuit = true;

  autoUpdater.on('error', (err) => {
    console.error('Ошибка автообновления:', err == null ? 'unknown' : err.message);
  });

  autoUpdater.on('update-downloaded', (info) => {
    dialog.showMessageBox(mainWindow, {
      type: 'info',
      title: 'Обновление Pumpky',
      message: `Скачана новая версия ${info.version}`,
      detail: 'Перезапустить приложение сейчас, чтобы применить обновление?',
      buttons: ['Перезапустить', 'Позже'],
      defaultId: 0,
      cancelId: 1
    }).then((result) => {
      if (result.response === 0) {
        isInstallingUpdate = true;
        setImmediate(() => {
          app.removeAllListeners('window-all-closed');
          autoUpdater.quitAndInstall(false, true);
        });
      }
    });
  });

  autoUpdater.checkForUpdates();
}

ipcMain.on('quit-app', () => {
  app.quit();
});

app.whenReady().then(() => {
  const mainWindow = createWindow();
  setupAutoUpdater(mainWindow);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      const w = createWindow();
      setupAutoUpdater(w);
    }
  });
});

app.on('window-all-closed', () => {
  if (isInstallingUpdate) return;
  if (process.platform !== 'darwin') app.quit();
});