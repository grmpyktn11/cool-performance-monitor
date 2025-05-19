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
    },
    autoHideMenuBar: true,
    frame: true

  })

  win.loadFile('index.html')
}


app.whenReady().then(() => {

  
  //GETTING CPUtemp
  ipcMain.handle("getCPUTemp", async () => {
    try {
      const cpuTemp = await si.cpuTemperature();
      return cpuTemp;
    }
    catch(error) {
      console.error("CPU TEMP FETCH ERROR:", error);
      return { error: "Error getting the cpu temp" };
    }
  });

  //getting cpu usage
  ipcMain.handle("getCPUUsage", async () =>{
    try{
      const cpuUsage = (await si.currentLoad()).currentLoad;
      return cpuUsage;
    }
    catch(error){
      console.error("CPU USAGE FIND ERROR");
      return { error: "error getting cpu usage"}
    }
  })

  //getting ram
  ipcMain.handle("getRam", async () =>{
    try{
      const ram = await si.mem();
      const usedRam = Math.floor(ram.used/ram.total * 100);
      return usedRam;
    }
    catch(error){
      console.error("ERROR GETTING RAM");
      return{ error: "error getting ram usage"}
    }
  })

  //getting wifi  strength
  ipcMain.handle("getWifi", async () =>{
    try{
      const wifiStrength = (await si.wifiConnections())[0].signalLevel;
      console.log(wifiStrength);
      return (wifiStrength <= -70) ? 3
      : (wifiStrength <= -60) ? 2
      : 1
     }
    catch(error){
        console.error("ERROR GETTING WIFI");
        return -1;
    } 
  })


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