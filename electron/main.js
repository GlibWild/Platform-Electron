const { app, BrowserWindow, Menu, ipcMain, globalShortcut } = require('electron')
const { autoUpdater } = require('electron-updater')

const fs = require('fs')
const path = require('path')

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: { preload: __dirname + '/preload.js' }
  })

  // 开发模式加载 Vite 服务
  if (process.env.NODE_ENV === 'development') {
    win.loadURL('http://localhost:5173')
    // win.webContents.openDevTools()
  } else {
    // 生产模式加载打包后的 index.html
    win.loadFile(path.join(__dirname, '../renderer/dist/index.html'))
    // win.webContents.openDevTools()
  }

  // 菜单栏
  const template = [
    {
      label: '文件',
      submenu: [{ role: 'quit', label: '退出' }]
    },
    {
      label: '帮助',
      submenu: [
        {
          label: '检查更新',
          click: () => autoUpdater.checkForUpdates()
        }
      ]
    }
  ]
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

// 自动更新事件
autoUpdater.on('update-available', () => {
  console.log('有新版本可用，正在下载...')
})
autoUpdater.on('update-downloaded', () => {
  console.log('更新下载完成，准备安装')
  autoUpdater.quitAndInstall()
})

ipcMain.handle('ping', async () => {
  return 'pong from main process'
})

app.whenReady().then(() => {
  createWindow()
  globalShortcut.register('Control+Shift+I', () => {
    const focusedWindow = BrowserWindow.getFocusedWindow()
    if (focusedWindow) {
      focusedWindow.webContents.openDevTools()
    }
  })
})
