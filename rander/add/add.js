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
		ipcRenderer.on('TouchMusicAnalysis', (event,msg) => {
			this.musicList = msg
		})
	}

})
