const {ipcRenderer} = require('electron');

var app = new Vue({
  el: '#app',
  data: {
  },
  methods:{
	  addMusic(){
		  ipcRenderer.send('addMusic');
	  }
  }
})
