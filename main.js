// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')
//const musicLoader = require('./tool/musicLoader')
const {Storage} = require('./tool/storage')

let storage = new Storage()


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

class addWindow extends BrowserWindow{
	constructor(config,url) {
	    let baseConfig = {
			width: 800,
			height: 600,
			autoHideMenuBar: true,
			icon:'icon.jpg',
			//show: false,
			webPreferences: {
			  preload: path.join(__dirname, 'preload.js'),
			  nodeIntegration:true
			}
		}
		let finalConfig = {...baseConfig,config}
		super(finalConfig)
		this.loadFile(url)
		this.webContents.openDevTools()
		this.once('ready-to-show', () => {
		  this.show()
		})
	}
}

function createWindow () {
  // Create the browser win
  mainWindow = new addWindow({},'./rander/index/index.html')
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
