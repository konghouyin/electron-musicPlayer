const {
	app,
	ipcMain,
	dialog
} = require('electron')
const fs = require('fs')
const {
	MusicLoader
} = require('./tool/musicLoader')
const {
	Storage
} = require('./tool/storage')
const {
	addWindow
} = require('./tool/addWindow')

let mainWindow
let storager = new Storage()
let musicLoader = new MusicLoader()

app.on('ready', function() {
	mainWindow = new addWindow({
		minWidth: 700,
		minHeight: 600
	}, './rander/index/index.html')
})

ipcMain.on('addMusic', async function(event) {
	let directory = await dialog.showOpenDialog({
		title: "请选择文件夹",
		properties: ['openDirectory']
	})
	let musicCheck = await getAllMusic(directory.filePaths[0])
	let musicAnalysis = await getAllMusicMessage(directory.filePaths[0], musicCheck)
	console.log(musicAnalysis)
	new addWindow({
		minWidth: 500,
		minHeight: 400,
		width: 500,
		height: 400
	}, './rander/add/add.html')
	ipcMain.on('getMusicAnalysis', function(event) {
		event.sender.send('TouchMusicAnalysis',musicAnalysis)
	})
})




function getAllMusic(directory) {
	return new Promise((resolve, reject) => {
		fs.readdir(directory, (err, files) => {
			if (err) throw err
			let reg = /.(mp3|m4a|aac|flac)$/i
			resolve(files.filter(function(item) {
				if (reg.test(item)) {
					return item
				}
			}))
		})
	})
}
//通过node筛选路径下所有的音频文件


function getAllMusicMessage(directory, musicList) {
	return new Promise(async (resolve, reject) => {
		let back = [];
		for (let i = 0; i < musicList.length; i++) {
			back.push({
				msg: await musicLoader.check(directory + '\\' + musicList[i]),
				name: musicList[i],
				path: directory + '\\' + musicList[i]
			})
		}
		resolve(back);
	})

}
//通过id3js解析音乐的基本信息
