const {ipcRenderer} = require('electron');

var app = new Vue({
  el: '#app',
  data: {
	musicList: ""
  },
  methods:{
	  addMusic(){
		  ipcRenderer.send('addMusicDialog');
	  }
  }
})

