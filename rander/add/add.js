const {
	ipcRenderer
} = require('electron');

ipcRenderer.on('analysisMusic', function(music) {
	consoel.log(345)
})

var app = new Vue({
	el: '#app',
	data: {
		title: "ss"
	},
	mounted() {
		ipcRenderer.send('getMusicAnalysis');
		ipcRenderer.on('TouchMusicAnalysis', function(event,msg) {
			console.log(msg)
		})
	}

})
