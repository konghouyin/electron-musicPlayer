const {BrowserWindow} = require('electron')
const path = require('path')
class addWindow extends BrowserWindow{
	constructor(config,url) {
	    let baseConfig = {
			width: 800,
			height: 600,
			autoHideMenuBar: true,
			icon:'./assets/icon.jpg',
			show: false,
			webPreferences: {
			  preload: path.join(__dirname, 'preload.js'),
			  nodeIntegration:true
			}
		}
		let finalConfig = {...baseConfig,...config}
		super(finalConfig)
		this.loadFile(url)
		this.webContents.openDevTools()
		this.once('ready-to-show', () => {
		  this.show()
		})
	}
}

module.exports={
	addWindow
}