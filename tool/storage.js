const fs = require('fs')
const path = require('../config.js').storagePath

class Storage {
	constructor(arg) {
		this.message = ''
		this.obj = null
	}

	readFile() {
		fs.readFile(path, 'utf8', (err, data) => {
			if (err) {
				fs.open(path, 'a', () => {})
				//没有文件创建新文件
			} else {
				this.message = data;
				if (data)
					this.obj = Json.parse(data);
			}
		})
	}

	addItem(item) {

	}

	saveFile() {
		fs.writeFile(path, JSON.stringify(this.obj),'utf8', (err) => {
			if (err) {
				throw err
			} 
		})
	}
}

exports.Storage = Storage
