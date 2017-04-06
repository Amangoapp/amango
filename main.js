const {BrowserWindow, app} = require('electron')

const path = require('path')
const url = require('url')

let mainWindow

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    titleBarStyle: 'hidden'
  })

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'frontend/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  mainWindow.once('ready-to-show', () => {
      mainWindow.show()
  })
  mainWindow.on('closed', function () {
    mainWindow = null
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
