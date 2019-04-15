'use strict'

import { app, BrowserWindow, Menu, globalShortcut } from 'electron'

console.log('-----------------1', process.platform, require('../package.json').version)
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  if (process.platform === 'darwin') {
    const template = [
      {
        label: 'Application',
        submenu: [
          { label: 'Quit', accelerator: 'Command+Q', click: function() { app.quit() } }
        ]
      },
      {
        label: 'Edit',
        submenu: [
          { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
          { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
        ]
      }
    ]
    Menu.setApplicationMenu(Menu.buildFromTemplate(template))
  }
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 640,
    useContentSize: true,
    width: 1280
  })
  console.log(winURL)
  mainWindow.loadURL(`${winURL}`)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
  // mainWindow.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
  //   event.preventDefault()
  //   // 将窗口名解析为窗口位置信息
  //   let position = mainWindow.getPosition()
  //   let size = mainWindow.getSize() || []
  //   let config = {
  //     modal: false,
  //     width: size[0] || 1280,
  //     height: size[1] || 640,
  //   }
  //   let offset = 30
  //   config.x = position[0] + offset
  //   config.y = position[1] + offset
  //   Object.assign(options, config)
  //   console.log('arguments', arguments)
  //   event.newGuest = new BrowserWindow(options)
  //   console.log(111, `${url.replace('/child', '#/child')}`)
  //   event.newGuest.loadURL(`${url.replace('/child', '#/child')}`)
  // })
  globalShortcut.register('CommandOrControl+Shift+U', () => {
    mainWindow.openDevTools()
  })

  // mainWindow.openDevTools()
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
