const {app,ipcMain,dialog} = require('electron')
const fs = require('fs')
const {MusicLoader} = require('./tool/musicLoader')
const {Storage} = require('./tool/storage')
const {addWindow} = require('./tool/addWindow')

let storage = new Storage()
let musicLoader = new MusicLoader()

app.on('ready', function() {
	new addWindow({
		minWidth: 700,
		minHeight: 600
	}, './rander/index/index.html')
})

ipcMain.on('addMusic', async function() {
	let directory = await dialog.showOpenDialog({title:"请选择文件夹",properties: ['openDirectory'] })
	let musicCheck = await getAllMusic(directory)
	console.log(musicCheck)
	new addWindow({
		minWidth: 500,
		minHeight: 400,
		width: 500,
		height: 400
	}, './rander/add/add.html')
})


function getAllMusic(directory){
	return new Promise((resolve,reject)=>{
		fs.readdir(directory.filePaths[0],(err,files)=>{
			if(err) throw err
			let reg = /.(mp3|m4a|acc|flac)$/i
			resolve ( files.filter(function(item){
				if(reg.test(item)){
					return item
				}
			}))
		})
	})
}
//通过node筛选路径下所有的音频文件