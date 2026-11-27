const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('pumpkyAPI', {
  quitApp: () => ipcRenderer.send('quit-app')
});