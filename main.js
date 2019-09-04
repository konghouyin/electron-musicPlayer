const {app,ipcMain,dialog} = require('electron')
//const musicLoader = require('./tool/musicLoader')
const {Storage} = require('./tool/storage')
const {addWindow} = require('./tool/addWindow')

let storage = new Storage()


app.on('ready', function() {
	new addWindow({
		minWidth: 700,
		minHeight: 600
	}, './rander/index/index.html')
})

ipcMain.on('addMusic', async function() {
	console.log(await dialog.showOpenDialog({title:"请选择文件夹",properties: ['openDirectory'] }))
	new addWindow({
		minWidth: 500,
		minHeight: 400,
		width: 500,
		height: 400
	}, './rander/add/add.html')
})
