const { contextBridge, ipcRenderer} = require('electron/renderer')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  cpuTemp: () => ipcRenderer.invoke("getCPUTemp"),
  cpuUsage: () => ipcRenderer.invoke("getCPUUsage")
})

