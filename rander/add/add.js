const {
	ipcRenderer
} = require('electron');


var app = new Vue({
	el: '#app',
	data: {
		musicList: []
	},
	mounted() {
		ipcRenderer.send('getMusicAnalysis');
		ipcRenderer.on('TouchMusicAnalysis', (event, msg) => {
			this.musicList = msg
		})
	},
	methods: {
		showImage(msg) {
			if (msg == null) {
				return ""
			} else if (msg.image == undefined) {
				return ""
			} else {
				return msg.image
			}

		},
		itemName(name) {
			return name.substring(0, name.lastIndexOf('.'))
		},
		showAlbum(msg) {
			if (msg == null) {
				return ""
			} else {
				return msg.album
			}
		},
		showArtist(msg) {
			if (msg == null) {
				return ""
			} else {
				return msg.artist
			}
		}
	}
})
