const { ipcMain } = require('electron')
const { app, BrowserWindow } = require('electron/main')
const si = require("systeminformation")
const path = require('node:path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {

  //GETTIGN CPUtemp
  ipcMain.handle("getCPUTemp", async () =>{
    try{
      const cpuTemp = await si.cpuTemperature()
      return cpuTemp
    }
    catch(error){
      console.error("CPU TEMP FETCH ERROR")
      cpuTemp = "Error getting the cpu temp"
      return cpuTemp
    }
  } )


  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})