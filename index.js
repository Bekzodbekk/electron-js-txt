const { app, BrowserWindow } = require('electron')
const path = require('path')
const isDev = require("electron-is-dev")

function createWindow () {
  const win = new BrowserWindow({
    width: 10000000,
    height: 7000000,
    movable: false,
    resizable : false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    },
    
  })
  if(isDev){

    win.loadURL('http://localhost:3000')
  }else{
    win.loadFile("src/build/index.html")
  }

}



app.whenReady().then(() => {
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
